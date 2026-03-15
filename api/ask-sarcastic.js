import OpenAI from "openai"

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
    return res.status(400).json({ error: "Missing or invalid question" })
  }

  try {

    const response = await client.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content: "Answer in a short sarcastic witty way."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.9,
      max_tokens: 80
    })

    const answer = response.choices[0].message.content

    return res.status(200).json({ answer })

  } catch (err) {

    console.error("Sarcastic AI error:", err)

    return res.status(500).json({
      error: "Failed to generate sarcastic response",
      message: err.message
    })
  }
}