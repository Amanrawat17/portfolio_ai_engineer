import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { askResume } from '../services/llmAPI'
import { Send, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ChatLLM() {
  const [msg, setMsg] = useState('')
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)

  const send = async () => {
    const q = msg.trim()
    if (!q || loading) return
    setMsg('')
    setChat((c) => [...c, { role: 'user', content: q }])
    setLoading(true)
    try {
      const answer = await askResume(q)
      setChat((c) => [...c, { role: 'assistant', content: answer }])
    } catch (e) {
      setChat((c) => [
        ...c,
        {
          role: 'assistant',
          content: 'Sorry, the AI service is unavailable. Make sure the backend is running and OPENAI_API_KEY is set.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="glass rounded-2xl p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
        <span className="gradient-text">Ask my AI</span>
      </h3>
      <p className="text-slate-400 text-sm mb-4">
        e.g. &quot;What AI projects has Aman built?&quot; · &quot;What research has Aman published?&quot; · &quot;What ML frameworks does Aman know?&quot;
      </p>
      <div className="h-60 overflow-y-auto space-y-4 mb-4 p-3 rounded-xl bg-black/20">
        {chat.length === 0 && (
          <p className="text-slate-500 text-sm">Ask a question about Aman&apos;s resume above.</p>
        )}
        {chat.map((c, i) => (
          <div
            key={i}
            className={c.role === 'user' ? 'text-right' : 'text-left'}
          >
            {c.role === 'user' ? (
              <span className="inline-block px-3 py-2 rounded-lg bg-indigo-600/30 text-indigo-200 text-sm">
                {c.content}
              </span>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                <ReactMarkdown>{c.content}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Ask about projects, research, skills..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none text-white placeholder-slate-500"
        />
        <button
          onClick={send}
          disabled={loading}
          className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium transition-colors flex items-center gap-2"
        >
          <Send size={18} />
          Ask
        </button>
      </div>
    </motion.div>
  )
}
