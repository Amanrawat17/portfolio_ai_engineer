import { motion } from 'framer-motion'
import { FileText, ExternalLink } from 'lucide-react'

const research = {
  title: 'Nature Scientific Reports (Impact Factor: 4.4)',
  role: 'Lead Researcher & Published Author',
  collaboration: 'GGSIPU × Nature Portfolio',
  points: [
    'Co-authored primary research in a top-tier international peer-reviewed journal.',
    'Engineered and validated 103 classification models on 23,791 molecules (ChEMBL).',
    'Voting & Stacking ensembles: XGBoost, KNN, Random Forest, ANN.',
    'RDKit descriptors + 6 fingerprint types (Morgan, MACCS, Atom-pair, etc.).',
    'SHAP (XAI) for global/local interpretability and top-20 molecular drivers.',
  ],
  link: '#',
}

export default function Research() {
  return (
    <motion.div
      className="glass rounded-2xl p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-indigo-500/20">
          <FileText className="w-8 h-8 text-indigo-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-xl text-white mb-1">{research.title}</h3>
          <p className="text-indigo-400 text-sm mb-2">{research.role}</p>
          <p className="text-slate-400 text-sm mb-4">{research.collaboration}</p>
          <ul className="space-y-2 text-slate-300 text-sm">
            {research.points.map((point, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-indigo-400 shrink-0">·</span>
                {point}
              </li>
            ))}
          </ul>
          {research.link !== '#' && (
            <a
              href={research.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-indigo-400 hover:underline text-sm"
            >
              <ExternalLink size={16} />
              Read paper
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
