import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Initialize Gemini Client with User-Agent header as required
  let ai: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is missing. Please define it in the Secrets panel.");
      }
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Gemini Copilot / Interview Bot Endpoint
  app.post("/api/gemini/copilot", async (req, res) => {
    try {
      const { message, systemInstruction, history } = req.body;
      const client = getGeminiClient();

      // System instruction explaining the Fabric Analytics Capstone role
      const defaultInstruction = 
        "You are 'Fabric Copilot', an expert Business Intelligence Coach and Microsoft Fabric Architect. " +
        "You are helping the user explore and refine their End-to-End Business Analytics Capstone project. " +
        "This project uses Microsoft Fabric (OneLake, Data Factory, Lakehouse, Data Warehouse), SQL, Python, Excel, Power BI (DAX, Star Schema Modeling), and standard data engineering pipelines. " +
        "You can act as: " +
        "1. A Mock Technical Interviewer asking challenging questions about OneLake integration, Star Schema relationships, DAX formulas, pipeline reliability, or PySpark/pandas cleanup. " +
        "2. A Fabric Scripting Advisor, generating copyable SQL queries, Python ETL scripts, or DAX measures for Power BI. " +
        "Please provide clear, professional, data-centric answers. Avoid fluff, keep explanations concise, structured, and practical.";

      // Support simple request or chat history format
      const formattedContents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          formattedContents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
          });
        }
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction || defaultInstruction,
          temperature: 0.7,
        },
      });

      res.json({ 
        success: true, 
        text: response.text || "I was unable to formulate a response. Please try again." 
      });
    } catch (error: any) {
      console.error("Gemini Copilot Error:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "An unexpected error occurred during AI processing." 
      });
    }
  });

  // Serving Frontend Client via Vite (Dev) or Static Assets (Prod)
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully booted!`);
    console.log(`👉 Access the app locally in your browser at:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`   http://127.0.0.1:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
