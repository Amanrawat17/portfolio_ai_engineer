import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function RotatingKnot() {
  const mesh = useRef()
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2
      mesh.current.rotation.y += delta * 0.3
    }
  })
  return (
    <mesh ref={mesh} rotation={[0.2, 0.4, 0]}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial color="#8b5cf6" metalness={0.4} roughness={0.6} />
    </mesh>
  )
}

export default function MLModel3D() {
  return (
    <div className="w-full h-full bg-slate-900/30">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="#6366f1" />
        <RotatingKnot />
      </Canvas>
    </div>
  )
}
