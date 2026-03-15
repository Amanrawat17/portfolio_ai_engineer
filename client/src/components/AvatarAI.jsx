import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import ErrorBoundary from './ErrorBoundary'

function AvatarModel() {
  const { scene } = useGLTF('/avatar.glb')
  return <primitive object={scene} scale={2} />
}

function AvatarFallback() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

export default function AvatarAI() {
  return (
    <motion.div
      className="max-w-2xl mx-auto rounded-2xl overflow-hidden glass"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="h-[500px] bg-slate-900/50">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <ErrorBoundary
            fallback={
              <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#6366f1" wireframe />
              </mesh>
            }
          >
            <Suspense fallback={<AvatarFallback />}>
              <AvatarModel />
            </Suspense>
          </ErrorBoundary>
          <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.8} />
          <Environment preset="city" />
        </Canvas>
      </div>
      <div className="p-6 border-t border-white/10">
        <p className="text-slate-300 text-sm">
          <strong className="text-indigo-400">AI Avatar.</strong> Add your own <code className="bg-white/10 px-1 rounded">avatar.glb</code> from{' '}
          <a href="https://readyplayer.me" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
            ReadyPlayerMe
          </a>{' '}
          to this 3D assistant. It rotates automatically—drag to orbit.
        </p>
      </div>
    </motion.div>
  )
}
