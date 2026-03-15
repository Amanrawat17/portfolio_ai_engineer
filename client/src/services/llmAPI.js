import axios from 'axios'

// In dev, Vite proxies /api -> localhost:5000 and strips /api, so /api/ask -> /ask
// In prod, Vercel serves serverless function at /api/ask
export async function askResume(question) {
  const { data } = await axios.post('/api/ask', { question })
  return data.answer
}
