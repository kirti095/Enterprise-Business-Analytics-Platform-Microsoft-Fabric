/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from "react";
import { CopilotMessage } from "../types";
import { 
  Bot, 
  User, 
  Send, 
  Loader2, 
  Sparkles, 
  Briefcase, 
  Code2, 
  Zap, 
  MessageSquare, 
  PlusCircle, 
  Bookmark, 
  FileCheck 
} from "lucide-react";

export function InterviewCopilot() {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "init-1",
      role: "assistant",
      content: "Hello! I am your **Fabric Analytics Advisor**. Together, we can prepare for interview Q&As, review mock system-design architecture questions, or write production-ready Fabric code scripts. \n\nWhat are you focusing on today?\n- **Interview Prep Drill** (Mock recruiter drills on OneLake, Star schemas, DAX measures, or Spark workloads).\n- **Engineering Scripting Copilot** (Write SQL joins, Python ETL, or Power BI aggregations).",
      timestamp: new Date().toTimeString().split(' ')[0]
    }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copilotMode, setCopilotMode] = useState<"interview" | "scripting">("interview");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Suggested Prompts
  const interviewPrompts = [
    "Test me on OneLake data partitioning.",
    "Ask me a difficult question on DirectLake versus Import modes.",
    "Conduct a mock interview case study for a BI Analyst role."
  ];

  const scriptingPrompts = [
    "Write a DAX measure for Month-over-Month growth rates.",
    "Create a PySpark routine to drop duplicate Bronze logs.",
    "Draft a SQL warehouse schema for Dimension and Fact sync."
  ];

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle Suggestion Send
  const handleSendPrompt = (prompt: string) => {
    setUserInput("");
    sendMessageToBackend(prompt);
  };

  // Main input send
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    const prompt = userInput;
    setUserInput("");
    sendMessageToBackend(prompt);
  };

  // Connect to server-side endpoint
  const sendMessageToBackend = async (promptText: string) => {
    // Add user message to history
    const userMsgId = `usr-${Date.now()}`;
    const userMsg: CopilotMessage = {
      id: userMsgId,
      role: "user",
      content: promptText,
      timestamp: new Date().toTimeString().split(' ')[0]
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Setup system scope instructions dynamically
      const systemInstruction = 
        copilotMode === "interview" 
          ? "You are 'Fabric Recruiter Advisor'. Conduct a highly challenging mock job interview for a Business Intelligence or Data Analytics position. " +
            "Your student is showcasing an end-to-end Microsoft Fabric capstone project using OneLake, Spark, SQL Data Warehouse, and Power BI. " +
            "Ask exactly ONE specific, technical question about their project logic (e.g. key links, DAX metrics, DirectLake parameters, parquet structures, or k-means predictive segmentation). " +
            "After they answer, evaluate their engineering reasoning out of 10, explain any technical gaps gently, and present the next scenario question. Be professional, structured, and recruiter-like."
          : "You are 'Fabric developer copilot'. Your task is to output clean, highly optimized SQL queries, DAX formulas, " +
            "or PySpark/pandas scripting definitions for Microsoft Fabric environments based on the user's requirements. " +
            "Structure your output using professional markdown syntax. Highlight optimization practices (e.g. Delta files compaction, surrogate index matching). Be direct and code-centric.";

      // History mapper
      const chatHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/gemini/copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: promptText,
          systemInstruction,
          history: chatHistory
        })
      });

      const data = await res.json();

      if (data.success && data.text) {
        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.text,
          timestamp: new Date().toTimeString().split(' ')[0]
        }]);
      } else {
        throw new Error(data.error || "Unable to load response.");
      }
    } catch (err: any) {
      console.error("Gemini Endpoint Call Failed:", err);
      setMessages(prev => [...prev, {
        id: `bot-err-${Date.now()}`,
        role: "assistant",
        content: `⚠️ **AI Service Offline**: No API connection achieved. Check if the **GEMINI_API_KEY** is configured correctly in the **Settings > Secrets** panel in AI Studio. \n\n*Server Log Reason: ${err.message || "Unknown proxy network timeout"}*`,
        timestamp: new Date().toTimeString().split(' ')[0]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "init-1",
        role: "assistant",
        content: `Reset complete! I've calibrated my engine for **${copilotMode === "interview" ? "Mock Recruitment Drills" : "Fabric Scripting Helper"}** mode. Go ahead, ask me anything!`,
        timestamp: new Date().toTimeString().split(' ')[0]
      }
    ]);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 font-sans h-[620px]" id="copilot-workspace">
      {/* Configuration Column */}
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Advisor Configurations</h3>
          <p className="text-slate-400 text-xs mt-0.5">Toggle modes to fit your workflow needs</p>
        </div>

        {/* Workspace switches */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setCopilotMode("interview");
              handleResetChat();
            }}
            className={`flex items-center gap-3 p-3 rounded-lg text-xs font-bold font-sans transition-all text-left border ${
              copilotMode === "interview"
                ? "bg-amber-50/50 border-amber-300 text-amber-900 shadow-3xs"
                : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 text-slate-600"
            }`}
          >
            <Briefcase className={`w-4 h-4 ${copilotMode === "interview" ? "text-amber-500" : "text-slate-400"}`} />
            <div>
              <span className="block font-bold">Interview Preparer</span>
              <span className="text-[10px] text-slate-400 font-medium">Drills on Fabric systems design</span>
            </div>
          </button>

          <button
            onClick={() => {
              setCopilotMode("scripting");
              handleResetChat();
            }}
            className={`flex items-center gap-3 p-3 rounded-lg text-xs font-bold font-sans transition-all text-left border ${
              copilotMode === "scripting"
                ? "bg-amber-50/50 border-amber-300 text-amber-900 shadow-3xs"
                : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 text-slate-600"
            }`}
          >
            <Code2 className={`w-4 h-4 ${copilotMode === "scripting" ? "text-amber-500" : "text-slate-400"}`} />
            <div>
              <span className="block font-bold">Engineering Scripting</span>
              <span className="text-[10px] text-slate-400 font-medium">SQL, PySpark, and DAX generation</span>
            </div>
          </button>
        </div>

        {/* Suggested Prompt Cards */}
        <div className="flex flex-col gap-2 z-10">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mt-2">Suggested Prompt Guides</span>
          {(copilotMode === "interview" ? interviewPrompts : scriptingPrompts).map((suggest, index) => (
            <button
              key={index}
              onClick={() => handleSendPrompt(suggest)}
              disabled={isLoading}
              className="text-left p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium border border-slate-150 rounded-lg text-[10px] leading-relaxed transition-colors flex items-start gap-1.5 cursor-pointer disabled:pointer-events-none"
            >
              <Zap className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
              <span>{suggest}</span>
            </button>
          ))}
        </div>

        {/* Reset Chat button */}
        <button
          onClick={handleResetChat}
          className="mt-auto px-4 py-2.5 bg-slate-150 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors border border-slate-200 shadow-2xs"
        >
          Reset Session Conversation
        </button>
      </div>

      {/* Main Stream Chat panel */}
      <div className="xl:col-span-3 bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between h-full">
        {/* Chat Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 border border-slate-100 bg-amber-50/30 rounded-lg text-amber-500">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Fabric AI Workspace Companion</h4>
              <p className="text-slate-400 text-[10px]">Powered by Google Gemini 3.5 Flash Model · UTC Real-Time</p>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-extrabold rounded-full flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 fill-emerald-600" /> API Secured
          </span>
        </div>

        {/* Conversation Stream Scroll Container */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 mb-4 select-text">
          {messages.map((m) => {
            const isBot = m.role === "assistant";

            return (
              <div 
                key={m.id} 
                className={`flex gap-3 max-w-[85%] ${
                  isBot ? "self-start" : "self-end flex-row-reverse"
                }`}
              >
                {/* Visual Avatar */}
                <div className={`p-2 rounded-full shrink-0 h-fit ${
                  isBot ? "bg-amber-50 border border-amber-100 text-amber-600" : "bg-emerald-50 border border-emerald-100 text-emerald-600"
                }`}>
                  {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                {/* Content block bubble */}
                <div className={`p-3.5 rounded-2xl text-[12px] leading-relaxed flex flex-col gap-1 shadow-2xs border ${
                  isBot 
                    ? "bg-slate-50/20 border-slate-200/50 text-slate-750" 
                    : "bg-amber-500 border-amber-500 text-white font-medium"
                }`}>
                  {/* Clean line matching of markdown */}
                  <div className="flex flex-col gap-2">
                    {m.content.split("\n").map((para, p_id) => {
                      if (!para.trim()) return null;

                      // Bullet rendering
                      if (para.startsWith("- **") || para.startsWith("* **")) {
                        return (
                          <div key={p_id} className="flex gap-1.5 pl-2 items-start mt-1">
                            <span className="text-amber-500 mt-1 shrink-0">•</span>
                            <p>{para.substring(2)}</p>
                          </div>
                        );
                      }

                      // Sub-highlight rendering
                      if (para.startsWith("###")) {
                        return <h5 key={p_id} className="font-bold text-slate-800 text-[13px] mt-1.5">{para.replace("###", "").trim()}</h5>;
                      }

                      return <p key={p_id}>{para}</p>;
                    })}
                  </div>
                  <span className={`text-[9px] mt-1 leading-none text-right ${
                    isBot ? "text-slate-400" : "text-amber-100"
                  }`}>{m.timestamp}</span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 self-start items-center">
              <div className="p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold bg-slate-50 border border-slate-100 p-2.5 px-3.5 rounded-2xl shadow-3xs">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Compiler formulating advice...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Formulation form */}
        <form onSubmit={handleFormSubmit} className="flex gap-2.5 items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isLoading}
            placeholder={
              copilotMode === "interview" 
                ? "Answer interviewer question here..." 
                : "Ask scripting copilot to write SQL, DAX measure, or Pand..."
            }
            className="flex-1 text-xs bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl p-3 focus:outline-hidden focus:ring-1 focus:ring-amber-500 placeholder-slate-400 text-slate-750 font-medium"
          />
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className="p-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-30 disabled:pointer-events-none text-white rounded-xl shadow-xs transition-all flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4 fill-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
