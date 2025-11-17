📝 AI Notes Summarizer

A simple, clean, and surprisingly powerful notes summarizer built with plain HTML, CSS, and JavaScript.

It can work completely offline using an extractive summarization algorithm, and you can optionally plug in an LLM backend (OpenAI, etc.) for much smarter summaries.

I built this as a lightweight project that works anywhere — no frameworks required.

⭐ What this project does

Paste any long text (notes, articles, study material, essays)

Choose summary length (Short / Medium / Long)

Get a clean, readable summary instantly

Extract top keywords from the text

Copy summary to clipboard in one click

Optional:
Turn on LLM mode to use GPT for higher-quality summaries.

🏗️ How it works

Extractive mode (default)

Runs in your browser — no internet needed.

Splits text into sentences

Scores words by frequency

Picks the most important sentences

Returns a compact summary + keywords

Super fast and works on any device.

LLM mode (optional)

If you enable the backend:

The browser sends your text to /api/summarize

server.js calls GPT (or any model you choose)

The server returns a natural-language summary

You can switch between both modes from the UI.


🚀 Getting Started

1. Clone or download the project
2. git clone <repo-url>

cd ai-summarizer


3. Run the offline version
4. Just open:

index.html

That’s it — the extractive summarizer works instantly.

⚙️ Optional: Enable LLM Mode

If you want GPT-based summaries, follow these steps:

Install dependencies

npm init -y

npm install express dotenv

Create a .env file

OPENAI_API_KEY=your_openai_key_here

Create server.js

Use the server code provided in this project.

Start the server

node server.js

Your backend will run at:

http://localhost:3000

Now set Method → LLM in the app UI, and you're ready.

🧪 Testing the API

You can test your backend manually:

curl -X POST http://localhost:3000/api/summarize \

-H "Content-Type: application/json" \

-d '{ "text": "Photosynthesis is...", "length": "short" }'

If you see a JSON summary → your server works.

🛠️ Tech Stack

Vanilla HTML, CSS, JavaScript

Node.js + Express (optional)

OpenAI API (optional)

Cursor + Kiro for development workflow

💡 Ideas for future improvements

Save summaries to localStorage

Export to PDF or Markdown

Split long text into sections automatically

Make flashcards from summaries

Add dark/light theme switch

Add history of past summaries

📄 License

MIT — feel free to modify and use it however you want.

