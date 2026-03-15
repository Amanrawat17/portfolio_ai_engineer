import "dotenv/config"
import OpenAI from "openai"

/* OpenRouter Client */

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
})

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const question = req.body?.question

  if (!question || typeof question !== "string") {
    return res.status(400).json({
      error: "Missing or invalid question"
    })
  }

  try {

    const response = await client.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful concise assistant. Answer clearly."
        },
        {
          role: "user",
          content: question.trim()
        }
      ],
      temperature: 0.7,
      max_tokens: 120
    })

    const answer =
      response.choices?.[0]?.message?.content ||
      "No response generated."

    return res.status(200).json({ answer })

  } catch (err) {

    console.error("AI Error:", err)

    return res.status(500).json({
      error: "Failed to get answer",
      message: err.message || "Unknown error"
    })
  }
}