import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Node({ position, color }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05
    }
  })
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function Edge({ start, end, color }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  )
}

function NeuralNet() {
  const layers = [4, 6, 5, 4]
  const nodes = []
  const edges = []
  const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#6366f1']

  layers.forEach((count, layerIndex) => {
    const y = (layerIndex - (layers.length - 1) / 2) * 0.8
    for (let i = 0; i < count; i++) {
      const x = (i - (count - 1) / 2) * 0.25
      nodes.push({ position: [x, y, 0], color: colors[layerIndex % colors.length] })
    }
  })

  let nodeIndex = 0
  layers.forEach((count, layerIndex) => {
    const nextCount = layers[layerIndex + 1]
    if (!nextCount) return
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < nextCount; j++) {
        const i1 = nodeIndex + i
        const i2 = nodeIndex + count + j
        const n1 = nodes[i1]
        const n2 = nodes[i2]
        if (n1 && n2) edges.push({ start: n1.position, end: n2.position, color: '#6366f1' })
      }
    }
    nodeIndex += count
  })

  return (
    <group rotation={[0, 0, 0]}>
      {edges.map((e, i) => (
        <Edge key={'e' + i} start={e.start} end={e.end} color={e.color} />
      ))}
      {nodes.map((n, i) => (
        <Node key={'n' + i} position={n.position} color={n.color} />
      ))}
    </group>
  )
}

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <NeuralNet />
      </Canvas>
    </div>
  )
}
