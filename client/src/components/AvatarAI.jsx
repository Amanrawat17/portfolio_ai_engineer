import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, OrbitControls, Environment } from "@react-three/drei"
import { motion } from "framer-motion"

function AvatarModel({ speaking }) {
  const { scene } = useGLTF("https://modelviewer.dev/shared-assets/models/Astronaut.glb")
  const ref = useRef()

  useFrame((state) => {
    ref.current.rotation.y += 0.003
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1

    if (speaking) {
      ref.current.scale.set(1.8, 1.85, 1.8)   // small bounce while speaking
    } else {
      ref.current.scale.set(1.8, 1.8, 1.8)
    }
  })

  return <primitive ref={ref} object={scene} position={[0,-1.5,0]} />
}

export default function AvatarAI() {

  const [speaking, setSpeaking] = useState(false)

  const greeting =
    "Hi, I am the AI assistant of Aman Rawat. How can I help you today?"

  useEffect(() => {

    const speak = () => {
      const utter = new SpeechSynthesisUtterance(greeting)

      utter.rate = 1
      utter.pitch = 1.1
      utter.lang = "en-US"

      utter.onstart = () => setSpeaking(true)
      utter.onend = () => setSpeaking(false)

      speechSynthesis.speak(utter)
    }

    setTimeout(speak, 1200)

  }, [])

  return (
    <motion.div
      className="max-w-2xl mx-auto rounded-2xl overflow-hidden glass"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <div className="h-[500px] bg-slate-900/50">

        <Canvas camera={{ position: [0,0,4], fov:45 }}>

          <ambientLight intensity={0.7}/>
          <directionalLight position={[5,5,5]} intensity={1.2}/>

          <Suspense fallback={null}>
            <AvatarModel speaking={speaking}/>
          </Suspense>

          <OrbitControls autoRotate autoRotateSpeed={0.7}/>
          <Environment preset="city"/>

        </Canvas>

      </div>

      <div className="p-6 text-slate-300 text-sm border-t border-white/10">
        <strong className="text-indigo-400">AI Assistant:</strong> {greeting}
      </div>

    </motion.div>
  )
}