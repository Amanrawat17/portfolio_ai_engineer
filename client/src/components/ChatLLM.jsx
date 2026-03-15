import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { askResume, askOpenAI, askSarcastic } from '../services/llmAPI'
import { Send, Loader2, FileText, MessageCircle, Smile } from 'lucide-react'
import { motion } from 'framer-motion'

const MODES = [
  { id: 'resume', label: 'Resume', icon: FileText, fn: askResume, hint: 'Ask about Aman\'s projects, research, skills...' },
  { id: 'openai', label: 'General AI', icon: MessageCircle, fn: askOpenAI, hint: 'Ask anything. Uses free model (no API key); optional OpenAI or HUGGINGFACE_TOKEN for better answers.' },
  { id: 'sarcastic', label: 'Sarcastic', icon: Smile, fn: askSarcastic, hint: 'Free Hugging Face model gives witty, sarcastic answers. Optional HUGGINGFACE_TOKEN if needed.' },
]

export default function ChatLLM() {
  const [msg, setMsg] = useState('')
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('resume')

  const current = MODES.find((m) => m.id === mode) || MODES[0]

  const send = async () => {
    const q = msg.trim()
    if (!q || loading) return
    setMsg('')
    setChat((c) => [...c, { role: 'user', content: q }])
    setLoading(true)
    try {
      const answer = await current.fn(q)
      setChat((c) => [...c, { role: 'assistant', content: answer }])
    } catch (e) {
      setChat((c) => [
        ...c,
        {
          role: 'assistant',
          content: 'Could not reach the AI. Make sure the backend is running (e.g. `cd server && npm run dev`). General AI uses a free model and does not require an API key; add HUGGINGFACE_TOKEN (free at huggingface.co/settings/tokens) if the free tier asks for it.',
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
      <h3 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
        <span className="gradient-text">Ask my AI</span>
      </h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
            }`}
          >
            <m.icon size={16} />
            {m.label}
          </button>
        ))}
      </div>
      <p className="text-slate-400 text-sm mb-4">{current.hint}</p>
      <div className="h-60 overflow-y-auto space-y-4 mb-4 p-3 rounded-xl bg-black/20">
        {chat.length === 0 && (
          <p className="text-slate-500 text-sm">Type a question above and press Ask.</p>
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
          placeholder={
            mode === 'resume'
              ? 'e.g. What AI projects has Aman built?'
              : mode === 'sarcastic'
                ? 'Ask anything for a sarcastic reply...'
                : 'Ask any question...'
          }
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
