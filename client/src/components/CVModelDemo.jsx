import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Video, VideoOff, Target, Radar } from 'lucide-react'

// Simple 2D constant-velocity Kalman filter for a face center
const dt = 1 // 1 frame step
const F = [
  [1, 0, dt, 0],
  [0, 1, 0, dt],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
]
const H = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
]
const Q = [
  [0.01, 0, 0, 0],
  [0, 0.01, 0, 0],
  [0, 0, 0.1, 0],
  [0, 0, 0, 0.1],
]
const R = [
  [0.05, 0],
  [0, 0.05],
]

// Template of relative keypoints (eyes, nose, mouth, chin) around the face center
// Values are normalized offsets in [0,1] of the video frame
const FACE_KEYPOINTS = [
  { id: 'left-eye', dx: -0.06, dy: -0.05 },
  { id: 'right-eye', dx: 0.06, dy: -0.05 },
  { id: 'nose', dx: 0, dy: 0 },
  { id: 'mouth-left', dx: -0.04, dy: 0.06 },
  { id: 'mouth-right', dx: 0.04, dy: 0.06 },
  { id: 'chin', dx: 0, dy: 0.1 },
]

function matMul(a, b) {
  const rows = a.length
  const cols = b[0].length
  const inner = b.length
  const out = Array.from({ length: rows }, () => Array(cols).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < inner; k++) {
        out[i][j] += a[i][k] * b[k][j]
      }
    }
  }
  return out
}

function matAdd(a, b) {
  return a.map((row, i) => row.map((v, j) => v + b[i][j]))
}

function matSub(a, b) {
  return a.map((row, i) => row.map((v, j) => v - b[i][j]))
}

function matTranspose(a) {
  return a[0].map((_, j) => a.map((row) => row[j]))
}

function matInv2(m) {
  const [[a, b], [c, d]] = m
  const det = a * d - b * c || 1e-6
  const invDet = 1 / det
  return [
    [d * invDet, -b * invDet],
    [-c * invDet, a * invDet],
  ]
}

export default function CVModelDemo() {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)

  const [state, setState] = useState(null) // face center [x, y, vx, vy] in normalized [0,1]
  const [P, setP] = useState(null) // 4x4 covariance
  const [measurement, setMeasurement] = useState(null) // {x, y}
  const [prediction, setPrediction] = useState(null) // {x, y}

  const startCamera = () => {
    setError(null)
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480 } })
      .then((s) => {
        if (videoRef.current) {
          videoRef.current.srcObject = s
          setStream(s)
        }
      })
      .catch((e) => setError('Camera access denied or unavailable: ' + e.message))
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop())
      setStream(null)
      if (videoRef.current) videoRef.current.srcObject = null
    }
  }

  useEffect(() => {
    return () => stopCamera()
  }, [stream])

  const captureFrame = () => {
    // Simulate a detection slightly off-center
    const mx = 0.5 + (Math.random() - 0.5) * 0.1
    const my = 0.5 + (Math.random() - 0.5) * 0.1
    const z = [[mx], [my]]

    if (!state) {
      // First detection: initialize state and covariance
      setState([mx, my, 0, 0])
      setP([
        [0.1, 0, 0, 0],
        [0, 0.1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ])
      setMeasurement({ x: mx, y: my })
      setPrediction(null)
      return
    }

    // Kalman update step
    const x = [[state[0]], [state[1]], [state[2]], [state[3]]]
    const Pmat = P
    const Ht = matTranspose(H)
    const y = matSub(z, matMul(H, x))
    const S = matAdd(matMul(matMul(H, Pmat), Ht), R)
    const SInv = matInv2(S)
    const K = matMul(matMul(Pmat, Ht), SInv) // 4x2

    const xNew = matAdd(x, matMul(K, y))
    const I = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]
    const KH = matMul(K, H)
    const PNew = matMul(matSub(I, KH), Pmat)

    setState([xNew[0][0], xNew[1][0], xNew[2][0], xNew[3][0]])
    setP(PNew)
    setMeasurement({ x: mx, y: my })
    setPrediction(null)
  }

  const predictNext = () => {
    if (!state || !P) return
    const x = [[state[0]], [state[1]], [state[2]], [state[3]]]
    const Pmat = P

    const xPred = matMul(F, x)
    const Ft = matTranspose(F)
    const PPred = matAdd(matMul(matMul(F, Pmat), Ft), Q)

    setState([xPred[0][0], xPred[1][0], xPred[2][0], xPred[3][0]])
    setP(PPred)
    setPrediction({ x: xPred[0][0], y: xPred[1][0] })
  }

  // Uncertainty radius from covariance (position part)
  const uncertaintyRadius = (() => {
    if (!P) return 0
    const px = Math.max(P[0][0], 0)
    const py = Math.max(P[1][1], 0)
    return Math.min(20 + (px + py) * 80, 60)
  })()

  return (
    <motion.div
      className="glass rounded-2xl p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="aspect-video rounded-xl overflow-hidden bg-slate-900/80 relative flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover rounded-xl"
        />
        {!stream && !error && (
          <p className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
            Click &quot;Start camera&quot; to begin
          </p>
        )}
        {error && (
          <p className="absolute inset-0 flex items-center justify-center text-red-400 text-sm px-4 text-center">
            {error}
          </p>
        )}

        {/* Measurement face keypoints (current frame) */}
        {measurement &&
          FACE_KEYPOINTS.map((kp) => (
            <div
              key={`m-${kp.id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(measurement.x + kp.dx) * 100}%`,
                top: `${(measurement.y + kp.dy) * 100}%`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
          ))}

        {/* Predicted face keypoints and covariance radius for face center */}
        {prediction && (
          <>
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${prediction.x * 100}%`,
                top: `${prediction.y * 100}%`,
              }}
            >
              <div
                className="rounded-full border border-yellow-400/60 bg-yellow-300/10"
                style={{ width: uncertaintyRadius, height: uncertaintyRadius }}
              />
            </div>
            {FACE_KEYPOINTS.map((kp) => (
              <div
                key={`p-${kp.id}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(prediction.x + kp.dx) * 100}%`,
                  top: `${(prediction.y + kp.dy) * 100}%`,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
              </div>
            ))}
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={stream ? stopCamera : startCamera}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
            stream
              ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {stream ? <VideoOff size={18} /> : <Video size={18} />}
          {stream ? 'Stop camera' : 'Start camera'}
        </button>

        <button
          onClick={captureFrame}
          disabled={!stream}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Target size={18} />
          Capture detection
        </button>

        <button
          onClick={predictNext}
          disabled={!state}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-400/40 hover:bg-yellow-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Radar size={18} />
          Predict next position
        </button>
      </div>

      <p className="text-slate-500 text-xs mt-3">
        Industrial CV demo: live camera + Kalman filter on a{' '}
        <span className="text-emerald-300">face center</span> driving all{' '}
        <span className="text-yellow-300">face keypoints</span> (eyes, nose, mouth, chin) with a covariance-based
        uncertainty radius. In production this extends to real face landmarks and multi-object tracking
        pipelines (ByteTrack-style MOT with ID preservation).
      </p>
    </motion.div>
  )
}
