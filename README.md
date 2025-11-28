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
  
```

🤖 AI Chatbot – How It Works

The chatbot is designed to answer questions about Fazil only (skills, projects, experience, contact, etc.). It uses a RAG-style (Retrieval-Augmented Generation) pipeline:

1. Knowledge Base

In backend/data/, several structured files describe Fazil:

about_me.json

experience.json

education.json

projects.json

skills.json

certifications.json

bio.md

(Optionally later) general.json

Each file contains short, focused pieces about:

Skills & tech stack (Python, Django, React, ML, etc.)

Work experience & internships

Education (MCA, etc.)

Projects (ML, web, data science)

Certifications & training

These are converted to “chunks” via chunker.py.
Each chunk has:

an id

a source (e.g. "experience", "projects", "skills")

the actual text content

2. Embedding / Retrieval (TF-IDF)

Instead of a heavy transformer model, the backend uses a lightweight TF–IDF retriever:

embedder.py defines a global TfidfVectorizer.

On startup, initialize_knowledge_base() in retrieval.py:

loads all chunks (load_all_chunks())

fits the TF–IDF vectorizer on their text

stores a TF–IDF matrix for all chunks in memory.

When the user asks a question:

The query is converted to a TF–IDF vector.

Cosine similarity is computed between the query vector and all chunk vectors.

The top-k chunks (e.g. 3–4) are selected as the context.

This is simple, fast, and memory-light, perfect for free tiers.

3. Prompt Construction

In app/api.py, the /api/chat endpoint:

Cleans the input message.

Handles some special cases without calling the LLM:

Small talk: “thanks”, “thank you”, “hi”, “hello” → local canned replies

Sensitive info: “bank”, “password”, “otp”, etc. → securely blocked

Pricing / development inquiries: “how much”, “cost”, “build a website” → replies with Fazil’s contact info instead of giving general explanations.

For real Fazil-related questions:

Retrieves relevant chunks via build_context_for_query()

Builds a system instruction + context:
You are an assistant that answers questions only about Muhammad Fazil V K.
If you don’t know the answer or the information is not available, simply say you don't know.

Context:
[Source: skills] ...
[Source: projects] ...
...

User question:
<user_message>

Answer clearly in under 3 short sentences. Do not mention 'context'.


4. Calling Gemini (LLM)

llm_client.py:

Initializes google.genai.Client using GEMINI_API_KEY from environment.

Uses a model like gemini-2.5-flash (fast, cost-effective).

Calls client.models.generate_content(...) with the prompt.

Returns response.text back to the API.

5. Response Handling

The /api/chat endpoint wraps the final answer into:

{ "answer": "..." }


and sends it to the frontend.

It also includes a simple in-memory cache (optional):

Same normalized question → returns cached answer

Avoids repeated LLM calls for identical questions within a server lifetime

6. Guardrails & Restrictions

The chatbot is deliberately limited:

Only answers about Fazil’s profile, skills, projects, etc.

For unrelated queries, it says it doesn’t know.

For bank details, passwords, OTP, etc., it hard-blocks with a safety message.

For pricing / “build something for me” questions, it redirects to Fazil’s contact channels instead of acting like a general consultant.

This keeps the model focused and token usage low.

🧠 Frontend Chatbot Component (React + Vite)

The chatbot UI lives in something like src/components/Chatbot.jsx and is rendered on top of the portfolio.

Key Behavior

Floating toggle icon in the top-right of the screen

Uses an imported image Chatbot_icon.png as the button

Slight “juggling” / bobbing animation (small up/down + left/right movement)

Clicking the icon opens/closes the chat window.

Initial message from bot:

“Hi 👋, I'm your portfolio assistant. Ask me anything about Fazil, skills, or projects!”

Local State

The component uses useState for:

isOpen – whether the chat window is visible

messages – list of {id, sender, text} objects

input – current text in the input box

It posts messages like:

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const res = await fetch(`${API_BASE_URL}/api/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: trimmed }),
});


and then appends the AI response to the message list.

Styling & Animations

All styling is in Chatbot.css:

.chatbot-toggle – circular floating image-button with hover glow and animated wobble

.chatbot-window – card-style chat window, fixed on the right

.chatbot-header – title & subtitle bar

.chatbot-messages – scrollable message area

.chatbot-message & .chatbot-bubble – left/right bubbles for bot vs user

.chatbot-input-area – fixed input row with rounded text box & send button

CSS includes:

Radial background gradient inside the chat window

Rounded corners, shadows, subtle borders

Mobile tweaks via media queries (max-width: 640px): chat window resizes and repositions

📈 Page Views – Vercel Analytics + Redis Counter

The portfolio also includes a page view counter built on:

Vercel Analytics

Provides traffic metrics at the platform level (page views, visitors, referrers, etc.)

Used mainly for overall monitoring and dashboarding.

Redis-based Counter

A small backend integration (either on the frontend API routes or separate backend endpoint) increments a counter in Redis on each page load or relevant event.

The counter is displayed somewhere in the UI as “Total Views” or similar.

High-Level Flow (Redis)

On page load (or at a specific component mount), frontend calls an endpoint like /api/views (this could be a Vercel serverless function or a backend route).

That endpoint:

Connects to Redis using Redis URL + token from environment variables

Increments a key, e.g. portfolio:page_views

Returns the updated count

Example logic (pseudocode):

# On backend or serverless:

views = redis.incr("portfolio:page_views")
return { "views": views }


The frontend then displays this count in a badge, footer, or stats section.

Environment Variables (example)

For Redis:

REDIS_URL – connection URL

REDIS_TOKEN / REDIS_PASSWORD – auth token if used

For Analytics:

Vercel Analytics is configured in the project settings and integrated via Vercel’s analytics script. It doesn’t require code-level management in this repo, aside from enabling it and optionally using their SDK.

⚙️ Running Locally
1. Clone the repository
git clone https://github.com/fazilyousuf/fazilyousuf.github.io.git
cd fazilyousuf.github.io

2. Backend (FastAPI)

From backend/:

cd backend

# (Optional) create virtual env
python -m venv venv
venv\Scripts\activate  # Windows
# or: source venv/bin/activate (Linux/Mac)

pip install -r requirements.txt


Create a .env in backend/:

GEMINI_API_KEY=your_gemini_api_key_here


Run FastAPI:

uvicorn main:app --reload


Backend will start at: http://localhost:8000

Test:

curl http://localhost:8000/api/health
# {"status": "ok"}

3. Frontend (React + Vite)

From the project root:

npm install


(Optional, but clean) create .env.local in root:

VITE_API_URL=http://localhost:8000


Run dev server:

npm run dev


Vite will start at http://localhost:5173 (by default).
Open the URL, and the chatbot will now talk to the local backend.
