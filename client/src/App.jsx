import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AvatarAI from './components/AvatarAI'
import ChatLLM from './components/ChatLLM'
import Projects from './components/Projects'
import GithubProjects from './components/GithubProjects'
import CVModelDemo from './components/CVModelDemo'
import JetsonPipeline from './components/JetsonPipeline'
import Research from './components/Research'
import MLModel3D from './three/MLModel3D'
import NeuralNetwork from './three/NeuralNetwork'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <section id="avatar" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <NeuralNetwork />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Meet my AI assistant
            </motion.h2>
            <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">
              A 3D avatar that introduces me and my work in GenAI, Computer Vision, and ML systems.
            </p>
            <AvatarAI />
          </div>
        </section>

        <section id="ask-ai" className="py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ask my AI about my resume
            </motion.h2>
            <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">
              Ask anything: projects, research, skills, experience. Powered by RAG over my resume.
            </p>
            <ChatLLM />
          </div>
        </section>

        <section id="ml-viz" className="py-24 relative">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              3D ML model visualization
            </motion.h2>
            <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">
              Interactive neural network–inspired visualization.
            </p>
            <div className="max-w-2xl mx-auto h-[400px] rounded-2xl overflow-hidden glass">
              <MLModel3D />
            </div>
          </div>
        </section>

        <section id="cv-demo" className="py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Live Computer Vision demo
            </motion.h2>
            <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">
              Start your camera for a real-time vision pipeline (object detection can be wired with TensorFlow.js).
            </p>
            <CVModelDemo />
          </div>
        </section>

        <section id="jetson" className="py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Jetson edge pipeline
            </motion.h2>
            <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">
              Real-time vision pipeline: multi-camera sync, YOLO, TensorRT, edge decisions.
            </p>
            <JetsonPipeline />
          </div>
        </section>

        <section id="projects" className="py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured projects
            </motion.h2>
            <Projects />
          </div>
        </section>

        <section id="github" className="py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              GitHub projects
            </motion.h2>
            <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">
              Auto-loaded from my GitHub. Sorted by last updated.
            </p>
            <GithubProjects />
          </div>
        </section>

        <section id="research" className="py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Research
            </motion.h2>
            <Research />
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          Aman Rawat · AI Engineer · GenAI, Computer Vision & ML Systems
        </div>
      </footer>
    </div>
  )
}

export default App
