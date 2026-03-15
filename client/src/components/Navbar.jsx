import { useState } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const sections = [
  { id: 'avatar', label: 'AI Avatar' },
  { id: 'ask-ai', label: 'Ask AI' },
  { id: 'ml-viz', label: '3D ML' },
  { id: 'cv-demo', label: 'CV Demo' },
  { id: 'jetson', label: 'Jetson' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'research', label: 'Research' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="avatar" smooth className="font-display font-bold text-lg gradient-text cursor-pointer">
          Aman Rawat
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <Link
              key={s.id}
              to={s.id}
              smooth
              className="text-slate-400 hover:text-white text-sm transition-colors cursor-pointer"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {sections.map((s) => (
                <Link
                  key={s.id}
                  to={s.id}
                  smooth
                  className="py-2 text-slate-400 hover:text-white cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
