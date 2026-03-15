import express from 'express'
import cors from 'cors'
import { askLLM } from './rag.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body || {}
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid question' })
    }
    const answer = await askLLM(question.trim())
    res.json({ answer })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: 'Failed to get answer',
      message: err.message || 'Unknown error',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
