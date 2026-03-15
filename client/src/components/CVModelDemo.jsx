import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Video, VideoOff } from 'lucide-react'

export default function CVModelDemo() {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)

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

  return (
    <motion.div
      className="glass rounded-2xl p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="aspect-video rounded-xl overflow-hidden bg-slate-900/80 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover rounded-xl"
        />
        {!stream && !error && (
          <p className="text-slate-500 text-sm">Click &quot;Start camera&quot; to begin</p>
        )}
        {error && <p className="text-red-400 text-sm px-4 text-center">{error}</p>}
      </div>
      <div className="flex gap-3 mt-4">
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
      </div>
      <p className="text-slate-500 text-xs mt-3">
        Live CV demo. Wire TensorFlow.js object detection or YOLO here for real-time inference.
      </p>
    </motion.div>
  )
}
