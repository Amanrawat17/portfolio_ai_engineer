import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const context = `
Aman Rawat is an AI Engineer specializing in GenAI, Computer Vision, and ML systems.

Contact: +91-9319157325, amanrawat1777@gmail.com. GitHub: amanrawat1777.

Education:
- Bachelor of Technology in Artificial Intelligence and Machine Learning, Guru Gobind Singh Indraprastha University (2021-25), CGPA 8.6.
- Class 10: 93%, Class 12: 90.1%.

Projects:
1) StyleText-GPT: Gen AI RAG & LLM Orchestration
- RAG pipeline with LangChain and HuggingFace Transformers; 90%+ factual accuracy.
- ChromaDB for vector indexing and semantic retrieval; Contextual Embeddings and Few-Shot Prompting; 30% fluency improvement.
- Automated evaluation to mitigate LLM hallucinations; Semantic Chunking and cross-encoder re-ranking.
- MLOps: prompt engineering, tokenization, deployment on Render for real-time NLP.

2) Document Synthesis & Summarization Engine (Gen AI, BERT, K-Means)
- BERT embeddings and RAG-inspired retrieval for large-scale document processing.
- K-Means on contextual embeddings; 60% text length reduction with 90%+ information retention.
- Custom MCP (Model Context Protocol) Server in Python for LLM/agent integration.

3) Helious Tech Solution – Computer Vision Engineer (Jan – present, Onsite Gurgaon)
- FSM for vehicle weighbridge lifecycle: vehicle ID, alignment validation, weighment; 100% transaction accuracy.
- Multi-camera temporal sync: front and back cameras, shared memory, condition variables.
- NVIDIA Jetson: TensorRT engines, DeepStream plugins, sub-millisecond latency; ANPR, person detection, vehicle positioning; CUDA/cuDNN.
- Production deployment: JSPL Raigarh, Godavari Hira Steel, Welspun; 100% accuracy, all-weather, fail-safe state logic, remote monitoring.

4) GGSIPU × Nature Portfolio – Researcher (Onsite New Delhi)
- Co-authored paper in Nature Scientific Reports (Impact Factor 4.4).
- 103 classification models on 23,791 molecules (ChEMBL).
- Voting and Stacking ensembles: XGBoost, KNN, Random Forest, ANN.
- RDKit descriptors and six fingerprint types (Morgan, MACCS, Atom-pair, etc.).
- SHAP (XAI) for interpretability; top 20 molecular features for anti-tubercular predictions.

Technical skills:
- GenAI & NLP: LLMs, LangChain, RAG, ChromaDB, FAISS, BERT, Transformers, HuggingFace.
- ML: PyTorch, TensorFlow, Scikit-learn, XGBoost, Random Forest, K-Means.
- Computer Vision: YOLOv8, ResNet, OpenCV, NVIDIA Jetson, TensorRT, DeepStream, CUDA/cuDNN.
- Software: Python (Expert), C++, Flask, FastAPI, SQL/NoSQL, Git/GitHub, BitBucket, Jira.
`

export async function askLLM(question) {
  if (!process.env.OPENAI_API_KEY) {
    return 'OPENAI_API_KEY is not set. Add it in the server environment (e.g. Vercel env vars or .env) to enable resume Q&A.'
  }
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that answers questions about Aman Rawat based only on the following resume context. Be concise and accurate.' + '\n\n' + context },
      { role: 'user', content: question },
    ],
  })
  return response.choices[0].message.content
}
