import { useState, useEffect } from 'react'
import { getRepos } from '../services/githubAPI'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Loader2 } from 'lucide-react'

export default function GithubProjects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getRepos()
      .then(setRepos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-6 max-w-2xl mx-auto text-center text-slate-400">
        Could not load GitHub repos: {error}
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {repos.slice(0, 12).map((repo, i) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: Math.min(i * 0.05, 0.4) }}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <Github size={18} className="text-slate-400 shrink-0 mt-0.5" />
            <ExternalLink size={14} className="text-slate-500 shrink-0" />
          </div>
          <h3 className="font-display font-bold text-white truncate">{repo.name}</h3>
          <p className="text-slate-400 text-sm mt-1 line-clamp-2 flex-1">
            {repo.description || 'No description'}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span>{repo.language || '—'}</span>
            <span>·</span>
            <span>{repo.stargazers_count} stars</span>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
