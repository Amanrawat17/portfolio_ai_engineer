import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-indigo-400 font-mono text-sm uppercase tracking-widest mb-4">
          AI Engineer · GenAI · Computer Vision · ML Systems
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">Aman Rawat</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-10">
          Building production AI: RAG & LLM orchestration, edge vision on NVIDIA Jetson,
          and published research in Nature Scientific Reports.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="avatar" smooth>
            <motion.button
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Meet my AI
            </motion.button>
          </Link>
          <Link to="ask-ai" smooth>
            <motion.button
              className="px-6 py-3 rounded-xl glass hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ask about my resume
            </motion.button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Link to="avatar" smooth>
          <ChevronDown className="w-8 h-8 text-slate-500 hover:text-white cursor-pointer animate-bounce" />
        </Link>
      </motion.div>
    </section>
  )
}
