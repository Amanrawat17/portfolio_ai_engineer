import "dotenv/config"
import express from "express"
import cors from "cors"

import { askLLM, askOpenAI, askSarcastic } from "./rag.js"

const app = express()

app.use(cors())
app.use(express.json())

/* Health check route */

app.get("/", (req, res) => {
  res.send("AI Portfolio Server Running")
})

/* Main AI endpoint */

app.post("/api/ask", async (req, res) => {

  try {

    const { question, mode } = req.body

    if (!question) {
      return res.status(400).json({ error: "Question is required" })
    }

    let answer

    if (mode === "resume") {
      answer = await askLLM(question)
    }
    else if (mode === "sarcastic") {
      answer = await askSarcastic(question)
    }
    else {
      answer = await askOpenAI(question)
    }

    res.json({ answer })

  } catch (err) {

    console.error("AI ERROR:", err)

    res.status(500).json({
      error: "AI request failed",
      message: err.message
    })
  }

})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
app.post("/api/ask-sarcastic", async (req, res) => {
  try {
    const { question } = req.body
    const answer = await askSarcastic(question)
    res.json({ answer })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "AI sarcastic request failed" })
  }
})