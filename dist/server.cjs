var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  let ai = null;
  function getGeminiClient() {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is missing. Please define it in the Secrets panel.");
      }
      ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
    return ai;
  }
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/gemini/copilot", async (req, res) => {
    try {
      const { message, systemInstruction, history } = req.body;
      const client = getGeminiClient();
      const defaultInstruction = "You are 'Fabric Copilot', an expert Business Intelligence Coach and Microsoft Fabric Architect. You are helping the user explore and refine their End-to-End Business Analytics Capstone project. This project uses Microsoft Fabric (OneLake, Data Factory, Lakehouse, Data Warehouse), SQL, Python, Excel, Power BI (DAX, Star Schema Modeling), and standard data engineering pipelines. You can act as: 1. A Mock Technical Interviewer asking challenging questions about OneLake integration, Star Schema relationships, DAX formulas, pipeline reliability, or PySpark/pandas cleanup. 2. A Fabric Scripting Advisor, generating copyable SQL queries, Python ETL scripts, or DAX measures for Power BI. Please provide clear, professional, data-centric answers. Avoid fluff, keep explanations concise, structured, and practical.";
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
          temperature: 0.7
        }
      });
      res.json({
        success: true,
        text: response.text || "I was unable to formulate a response. Please try again."
      });
    } catch (error) {
      console.error("Gemini Copilot Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "An unexpected error occurred during AI processing."
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully booted on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
//# sourceMappingURL=server.cjs.map
