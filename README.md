# Aman Rawat — AI Engineer Portfolio

High-end interactive portfolio showcasing **GenAI**, **Computer Vision**, and **ML systems** with:

- 🤖 **3D AI Avatar** (ReadyPlayerMe `.glb`) — talking assistant
- 🧠 **LLM Q&A** — Resume RAG, general OpenAI, and Hugging Face sarcastic mode
- 🧩 **3D ML visualizations** — rotating neural net / torus knot
- 🎥 **Live CV demo** — camera feed (TensorFlow.js-ready)
- ⚙️ **Jetson pipeline** — edge vision flow
- 📦 **GitHub project loader** — auto-fetch from `amanrawat1777`
- 🚀 **Vercel** — deploy frontend + serverless `/api/ask`, `/api/ask-openai`, `/api/ask-sarcastic`

---

## Quick start

### 1. Install

```bash
npm run install:all
```

### 2. Environment

**Backend (local server or Vercel):**

- `OPENAI_API_KEY` — for **Resume** and **General AI** modes.
- `HUGGINGFACE_TOKEN` or `HF_TOKEN` — for **Sarcastic** mode (Hugging Face model). Get a free token at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens).

Create `server/.env` for local:

```env
OPENAI_API_KEY=sk-...
HUGGINGFACE_TOKEN=hf_...
```

### 3. Run locally

```bash
# Terminal 1 — backend (port 5000)
cd server && npm run dev

# Terminal 2 — frontend (port 5173)
cd client && npm run dev
```

Or from repo root:

```bash
npm run dev
```

Frontend proxies `/api/*` to `http://localhost:5000`, so the “Ask my AI” section works against the local server.

### 4. Optional: 3D avatar

Place `avatar.glb` in `client/public/`. Get a free avatar from [ReadyPlayerMe](https://readyplayer.me). If the file is missing, a wireframe sphere is shown.

---

## Deploy on Vercel

1. Push the repo to GitHub.
2. In [Vercel](https://vercel.com), import the project.
3. **Environment variables:** set `OPENAI_API_KEY` and optionally `HUGGINGFACE_TOKEN` (or `HF_TOKEN`) for the Sarcastic AI.
4. **Build:** Vercel uses `vercel.json`:
   - Build: `npm run build` (builds client)
   - Output: `client/dist`
   - Serverless: `api/ask.js`, `api/ask-openai.js`, `api/ask-sarcastic.js` for the three chat modes.
5. Deploy. The site will serve the SPA and `/api/ask` from the same origin.

---

## Project layout

```
ai-portfolio/
├── client/                 # Vite + React
│   ├── public/
│   │   ├── avatar.glb      # optional 3D avatar
│   │   └── resume.pdf      # optional
│   └── src/
│       ├── components/     # Navbar, Hero, AvatarAI, ChatLLM, etc.
│       ├── three/         # NeuralNetwork, MLModel3D
│       └── services/      # githubAPI, llmAPI
├── server/                 # Express (local dev)
│   ├── server.js
│   └── rag.js
├── api/
│   ├── ask.js             # Resume RAG
│   ├── ask-openai.js      # General OpenAI Q&A
│   └── ask-sarcastic.js   # Hugging Face sarcastic (gpt2)
└── vercel.json
```

---

## Resume data

The LLM context is derived from Aman’s resume (education, projects, Helious Tech, GGSIPU × Nature research, skills). Update the context in:

- `server/rag.js` (local Express)
- `api/ask.js` (Vercel serverless)

to keep “Ask my AI” in sync with your latest resume.
