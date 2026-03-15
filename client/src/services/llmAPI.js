import axios from 'axios'

// In dev, Vite proxies /api -> localhost:5000 and strips /api, so /api/ask -> /ask
// In prod, Vercel serves serverless at /api/ask, /api/ask-openai, /api/ask-sarcastic

/** Resume RAG — answers only about Aman's resume */
export async function askResume(question) {
  const { data } = await axios.post('/api/ask', { question })
  return data.answer
}

/** General OpenAI — answers any question */
export async function askOpenAI(question) {
  const { data } = await axios.post('/api/ask-openai', { question })
  return data.answer
}

/** Hugging Face — sarcastic answers (gpt2 with sarcastic prompt) */
export async function askSarcastic(question) {
  const { data } = await axios.post('/api/ask-sarcastic', { question })
  return data.answer
}
