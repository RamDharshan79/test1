const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config({ path: path.join(__dirname, "api.env") });

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// -------------------------------------------
// POST /api/summarize
// -------------------------------------------
app.post("/api/summarize", async (req, res) => {
  try {
    const { text, length } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required." });
    }

    // Decide how big the summary should be
    const lengthMap = {
      short: "3–4 sentences",
      medium: "5–6 sentences",
      long: "8–10 sentences",
    };

    const summaryLength = lengthMap[length] || "5–6 sentences";

    const prompt = `Summarize the following text in ${summaryLength}.\nAlso return 5–7 important keywords.\nRespond in JSON with keys: \\"summary\\" and \\"keywords\\".\n\nText:\n${text}`;

    // Call OpenAI via SDK
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const content = completion?.choices?.[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ error: "OpenAI API error", details: completion });
    }

    let result;
    try {
      result = JSON.parse(content);
    } catch (e) {
      return res.status(500).json({ error: "Model did not return valid JSON.", raw: content });
    }

    return res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------
// Start server
// -------------------------------------------
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
