import { motion } from 'framer-motion'
import { Camera, Film, Cpu, Zap, CheckCircle } from 'lucide-react'

const steps = [
  { id: 'camera', label: 'Camera', desc: 'Multi-camera ingest', icon: Camera },
  { id: 'frame', label: 'Frame Capture', desc: 'Temporal sync', icon: Film },
  { id: 'yolo', label: 'YOLO Detection', desc: 'Real-time inference', icon: Cpu },
  { id: 'tensorrt', label: 'TensorRT', desc: 'Edge acceleration', icon: Zap },
  { id: 'edge', label: 'Edge Decision', desc: 'Weighbridge FSM', icon: CheckCircle },
]

export default function JetsonPipeline() {
  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            className="glass rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/[0.08] hover:border-indigo-500/40 border border-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-center mb-3">
              <step.icon className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="font-display font-bold text-white mb-1">{step.label}</h3>
            <p className="text-slate-400 text-xs">{step.desc}</p>
          </motion.div>
        ))}
      </div>
      <p className="text-slate-500 text-sm text-center mt-6">
        Industrial deployment: JSPL Raigarh, Godavari Hira Steel, Welspun · 100% transaction accuracy
      </p>
    </motion.div>
  )
}
