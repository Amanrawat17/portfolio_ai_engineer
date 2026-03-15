import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const MODEL = "gpt-4o-mini"

/* General assistant */

export async function askOpenAI(question) {
  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: "You are a helpful concise AI assistant."
      },
      {
        role: "user",
        content: question
      }
    ]
  })

  return response.choices?.[0]?.message?.content || "No response"
}

/* Sarcastic assistant */

export async function askSarcastic(question) {
  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: "Answer sarcastically in a witty short sentence."
      },
      {
        role: "user",
        content: question
      }
    ]
  })

  return response.choices?.[0]?.message?.content || "No response"
}

/* Resume assistant */

export async function askLLM(question) {

  const context = `
Aman Rawat is an AI Engineer specializing in Computer Vision, GenAI and ML systems.

Skills:
Python, PyTorch, TensorFlow, YOLOv8, OpenCV, LangChain.

Projects:
StyleText-GPT
Document Summarization Engine
Computer Vision deployment on NVIDIA Jetson
Nature Scientific Reports research
`

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: `Answer questions using this resume context:\n${context}`
      },
      {
        role: "user",
        content: question
      }
    ]
  })

  return response.choices?.[0]?.message?.content || "No response"
}