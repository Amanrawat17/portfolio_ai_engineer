import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const resumeContext = `
Aman Rawat is an AI Engineer specializing in GenAI, Computer Vision, and ML systems.

Contact: +91-9319157325, amanrawat1777@gmail.com. GitHub: amanrawat1777.

Education:
- Bachelor of Technology in Artificial Intelligence and Machine Learning, Guru Gobind Singh Indraprastha University (2021-25), CGPA 8.6.
- Class 10: 93%, Class 12: 90.1%.

Projects:
1) StyleText-GPT: Gen AI RAG & LLM Orchestration – RAG with LangChain/HuggingFace, ChromaDB, 90%+ factual accuracy, MLOps on Render.
2) Document Synthesis & Summarization Engine – BERT, K-Means, 60% text reduction, 90%+ retention, MCP Server for LLMs.
3) Helious Tech – Computer Vision Engineer (Jan–present): FSM weighbridge, multi-camera sync, NVIDIA Jetson, TensorRT, DeepStream, JSPL Raigarh, Godavari Hira Steel, Welspun, 100% accuracy.
4) GGSIPU × Nature Portfolio – Researcher: Nature Scientific Reports (IF 4.4), 103 models on 23,791 ChEMBL molecules, XGBoost/KNN/RF/ANN, SHAP (XAI).

Skills: GenAI/NLP (LLMs, LangChain, RAG, ChromaDB, BERT, HuggingFace), ML (PyTorch, TensorFlow, XGBoost, K-Means), CV (YOLOv8, ResNet, OpenCV, Jetson, TensorRT, DeepStream, CUDA), Software (Python, C++, Flask, FastAPI, Git).
`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const question = req.body?.question
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid question' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(200).json({
      answer: 'OPENAI_API_KEY is not set. Add it in Vercel Environment Variables to enable resume Q&A.',
    })
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that answers questions about Aman Rawat based only on the following resume context. Be concise and accurate.\n\n' +
            resumeContext,
        },
        { role: 'user', content: question.trim() },
      ],
    })
    const answer = response.choices[0].message.content
    res.status(200).json({ answer })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: 'Failed to get answer',
      message: err.message || 'Unknown error',
    })
  }
}
