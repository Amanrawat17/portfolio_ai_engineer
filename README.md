# Aman Rawat — AI Engineer Portfolio

High-end interactive portfolio showcasing **GenAI**, **Computer Vision**, and **ML systems** with:

- 🤖 **3D AI Avatar** (ReadyPlayerMe `.glb`) — talking assistant
- 🧠 **LLM Q&A** — RAG over your resume (OpenAI)
- 🧩 **3D ML visualizations** — rotating neural net / torus knot
- 🎥 **Live CV demo** — camera feed (TensorFlow.js-ready)
- ⚙️ **Jetson pipeline** — edge vision flow
- 📦 **GitHub project loader** — auto-fetch from `amanrawat1777`
- 🚀 **Vercel** — deploy frontend + serverless `/api/ask`

---

## Quick start

### 1. Install

```bash
npm run install:all
```

### 2. Environment

**Backend (local server or Vercel):**

- `OPENAI_API_KEY` — required for “Ask my AI” resume Q&A.

Create `server/.env` for local:

```env
OPENAI_API_KEY=sk-...
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
3. **Environment variables:** set `OPENAI_API_KEY` in the project settings.
4. **Build:** Vercel uses `vercel.json`:
   - Build: `cd client && npm ci && npm run build`
   - Output: `client/dist`
   - Serverless: `api/ask.js` handles `POST /api/ask` for resume Q&A.
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
│   └── ask.js             # Vercel serverless RAG
└── vercel.json
```

---

## Resume data

The LLM context is derived from Aman’s resume (education, projects, Helious Tech, GGSIPU × Nature research, skills). Update the context in:

- `server/rag.js` (local Express)
- `api/ask.js` (Vercel serverless)

to keep “Ask my AI” in sync with your latest resume.
