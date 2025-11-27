# Fazil Portfolio – React + AI Chatbot + FastAPI Backend

This is the source code for **Muhammad Fazil V K**’s personal portfolio website.

It includes:

- A **React + Vite** frontend hosted on **Vercel**
- A **FastAPI** backend hosted separately (e.g. **Render**) for an **AI-powered “Ask Me” chatbot**
- A **page view counter** using **Vercel Analytics** plus a **Redis** store
- A custom floating chatbot UI with polished CSS, icons, and animations

---

## 🔧 Tech Stack

### Frontend

- **React** (with Vite)
- **JavaScript / JSX**
- **CSS** with custom styling (no UI library, hand-crafted layout)
- **Bootstrap Icons** (where used)
- **React Feather Icons** for some UI icons
- Deployed on **Vercel**

### Backend

- **Python 3**
- **FastAPI** (ASGI framework)
- **Uvicorn** for serving
- **scikit-learn** (TF–IDF based retrieval)
- **NumPy**
- **google-genai** – calls **Google Gemini** for LLM responses
- Deployed on **Render** (or any Python-friendly host)

### Analytics & Storage

- **Vercel Analytics** for traffic insights
- **Redis** (hosted) to store & retrieve total page view count

---

## 🏗 Project Structure

At a high level:

```bash
Fazil_portfolio/
  backend/            # FastAPI backend for AI chatbot
    app/
      api.py          # API routes (including /api/chat)
      llm_client.py   # Gemini client wrapper
      retrieval.py    # TF-IDF retrieval logic
      embedder.py     # TF-IDF vectorizer
      chunker.py      # Loads knowledge base chunks
      ...
    data/             # About/experience/projects/skills KB files
    main.py           # FastAPI app entrypoint
    requirements.txt  # Backend dependencies
    .env              # (ignored) contains GEMINI_API_KEY (local only)

  public/             # Static assets (favicon, sitemap, robots.txt)
  src/
    components/
      Chatbot.jsx     # Floating AI chatbot widget
      ...
    styles/
      Chatbot.css     # Chatbot styling, animations, layout
      ...
    main.jsx          # React/Vite entrypoint
  package.json
  vite.config.js
  .gitignore
  README.md


