import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'StyleText-GPT: Gen AI RAG & LLM Orchestration',
    desc: 'RAG with LangChain & HuggingFace, ChromaDB vector indexing, 90%+ factual accuracy, MLOps on Render.',
    tags: ['RAG', 'LangChain', 'ChromaDB', 'MLOps'],
  },
  {
    title: 'Document Synthesis & Summarization Engine',
    desc: 'BERT embeddings + K-Means clustering, 60% text reduction with 90%+ retention; MCP Server for LLM integration.',
    tags: ['BERT', 'K-Means', 'MCP', 'GenAI'],
  },
  {
    title: 'Multi-Camera Weighbridge Vision System',
    desc: 'FSM-driven lifecycle, multi-camera sync, TensorRT/DeepStream on Jetson, 100% transaction accuracy.',
    tags: ['Jetson', 'TensorRT', 'DeepStream', 'CV'],
  },
]

export default function Projects() {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {projects.map((p, i) => (
        <motion.div
          key={p.title}
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <h3 className="font-display font-bold text-lg mb-2 text-white">{p.title}</h3>
          <p className="text-slate-400 text-sm mb-4">{p.desc}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
