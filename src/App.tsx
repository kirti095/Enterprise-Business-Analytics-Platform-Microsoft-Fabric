/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { PowerBiDashboards } from "./components/PowerBiDashboards";
import { ETLPipelineBuilder } from "./components/ETLPipelineBuilder";
import { DataModeler } from "./components/DataModeler";
import { Playground } from "./components/Playground";
import { InterviewCopilot } from "./components/InterviewCopilot";
import { 
  Briefcase, 
  Database, 
  Layers, 
  Terminal, 
  BookOpen, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  FileText, 
  Activity, 
  Compass, 
  Cpu, 
  ChevronRight, 
  Mail, 
  CheckCircle,
  HelpCircle,
  Info
} from "lucide-react";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<"overview" | "dashboard" | "pipeline" | "modeler" | "playground" | "copilot">("overview");

  // Project deliverables definition list (Home Overview page)
  const technicalSkills = [
    "Microsoft Fabric", "Power BI & DAX", "ETL (Data Factory)", 
    "SQL Data Warehousing", "Python & Pandas", "Star Schema Modeling",
    "Predictive Modeling", "OneLake Medallion Architecture", "Analytical Dashboards"
  ];

  const toolsAndFrameworks = [
    { name: "OneLake", purpose: "SaaS Delta Parquet corporate directories", icon: Database },
    { name: "Data Factory", purpose: "ETL pipelines and triggers orchestration", icon: Layers },
    { name: "SQL Endpoint", purpose: "ACID warehouse index processing & performance", icon: Terminal },
    { name: "Power BI", purpose: "DirectLake high-refresh-rate executive dash sheets", icon: TrendingUp },
    { name: "PySpark", purpose: "Clean duplicates, scale k-means forecasting ML models", icon: Cpu }
  ];

  const coreObjectives = [
    "Assemble and ingest messy external source feeds (Excel, CSV, SQL grids).",
    "Formulate multi-stage Spark notebook cleaning routines inside Lakehouse files.",
    "Draft star schema data models (Facts mapped to Dimensions) minimizing redundancy parameters.",
    "Refine executive dashboards simulating high-fidelity analytical slicers and reports.",
    "Assess risk index clusters using custom Scikit-Learn linear regressions."
  ];

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-800 flex flex-col font-sans" id="fabric-root-portal">
      {/* Top Banner Ribbon */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-3xs px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-xs">
            <Layers className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">
              Microsoft Fabric End-to-End BI Workspace
            </h1>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span>Capstone Project Simulation Sandbox</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-600">Online</span>
            </p>
          </div>
        </div>

        {/* User context information details */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Account Operator</span>
            <span className="text-slate-700 flex items-center gap-1">
              <Mail className="w-3 h-3 text-amber-500" /> kirtisolanki140@gmail.com
            </span>
          </div>

          <div className="px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl leading-none text-slate-650 font-bold font-mono">
            DirectLake Sync
          </div>
        </div>
      </header>

      {/* Main Container Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* Workspace Sidebar Navigator */}
        <nav className="w-full lg:w-64 shrink-0 flex flex-col gap-1.5 bg-white p-4.5 rounded-2xl border border-slate-100 shadow-3xs h-fit" id="workspace-navigator">
          <div className="mb-3 px-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-450">Navigator Modules</span>
          </div>

          {/* Nav Tab Buttons */}
          <button
            onClick={() => setActiveScreen("overview")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all text-left border ${
              activeScreen === "overview"
                ? "bg-amber-500 border-amber-500 text-white shadow-xs"
                : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Project Portfolio Hub</span>
          </button>

          <button
            onClick={() => setActiveScreen("dashboard")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all text-left border ${
              activeScreen === "dashboard"
                ? "bg-amber-500 border-amber-500 text-white shadow-xs"
                : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Power BI Dashboards</span>
          </button>

          <button
            onClick={() => setActiveScreen("pipeline")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all text-left border ${
              activeScreen === "pipeline"
                ? "bg-amber-500 border-amber-500 text-white shadow-xs"
                : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Data Ingestion & ETL</span>
          </button>

          <button
            onClick={() => setActiveScreen("modeler")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all text-left border ${
              activeScreen === "modeler"
                ? "bg-amber-500 border-amber-500 text-white shadow-xs"
                : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Star Schema Modeler</span>
          </button>

          <button
            onClick={() => setActiveScreen("playground")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all text-left border ${
              activeScreen === "playground"
                ? "bg-amber-500 border-amber-500 text-white shadow-xs"
                : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>SQL & PySpark Lab</span>
          </button>

          <div className="h-px bg-slate-100 my-4" />

          <button
            onClick={() => setActiveScreen("copilot")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all text-left border ${
              activeScreen === "copilot"
                ? "bg-amber-500 border-amber-500 text-white shadow-xs"
                : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <BotIcon />
            <span>Interview Prep & AI AI</span>
          </button>

          <div className="bg-slate-50 p-4 border border-slate-150 rounded-xl flex flex-col gap-1.5 mt-8 text-[11px] font-sans leading-relaxed text-slate-500">
            <span className="font-bold text-slate-700">Storage Footprint</span>
            <div className="w-full bg-slate-250 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[24%]" />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 font-bold">
              <span>61.2 MB used</span>
              <span>256 MB max</span>
            </div>
          </div>
        </nav>

        {/* Dynamic Screen Viewframe */}
        <main className="flex-1 flex flex-col min-w-0">
          {activeScreen === "overview" && (
            <div className="flex flex-col gap-6 animate-fadeIn" id="portfolio-overview-screen">
              {/* Introduction Bento Banner */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                <div className="flex-1 flex flex-col gap-1.5">
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-md text-[10px] uppercase font-bold tracking-wider w-fit">
                    Core Capstone Project Hub
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    End-to-End Business Analytics Platform Using Microsoft Fabric
                  </h2>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-3xl">
                    Welcome to the master simulation portal. This workspace interactive indexes actual business BI workflows including schema structures, real-time Power BI slicers, Spark jobs, and Google Gemini recruiters simulation routines.
                  </p>
                </div>
                
                {/* Visual scorecard indicator */}
                <div className="bg-slate-50 p-4 border border-slate-150 rounded-xl shrink-0 w-full md:w-auto tracking-tight">
                  <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Demonstrated Scope</p>
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Medallion Architecture
                  </p>
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Star Relationship
                  </p>
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Machine Learning
                  </p>
                </div>
              </div>

              {/* Technologies we use grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tech definitions boxes */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Fabric Components Leveraged</h3>
                    <p className="text-slate-400 text-xs">Primary structural utilities for ETL delivery</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {toolsAndFrameworks.map(tool => {
                      const Icon = tool.icon;
                      return (
                        <div key={tool.name} className="flex gap-3 items-start leading-relaxed border-b border-slate-50 pb-2 last:border-none">
                          <div className="p-2 border border-slate-100 bg-slate-50 rounded-lg text-slate-600 shrink-0">
                            <Icon className="w-4 h-4 text-amber-500" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-800">{tool.name}</span>
                            <span className="text-[11px] text-slate-450 font-sans">{tool.purpose}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Scope objectives layout */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs flex flex-col gap-4 justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm font-sans">Strategic Project Objectives</h3>
                    <p className="text-slate-400 text-xs">Transforming raw metrics into high-level action indexes</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {coreObjectives.map((obj, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs font-medium text-slate-600 leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50 text-[11px] hover:bg-amber-50 leading-relaxed text-slate-550 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      *Recommended resume formulation*: Utilized Microsoft Fabric Lakehouses and Spark pipelines to deliver real-time data cleansing, saving $24k in storage index and optimization overhead models.
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills checklist strip tags */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Skills & Methodologies Demonstrated</h3>
                  <p className="text-slate-400 text-xs">Technical concepts executed across the capstone workspace</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {technicalSkills.map(skill => (
                    <span key={skill} className="bg-slate-50 hover:bg-slate-100/80 px-3 py-1.5 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-750 font-sans shadow-3xs transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeScreen === "dashboard" && <PowerBiDashboards />}
          {activeScreen === "pipeline" && <ETLPipelineBuilder />}
          {activeScreen === "modeler" && <DataModeler />}
          {activeScreen === "playground" && <Playground />}
          {activeScreen === "copilot" && <InterviewCopilot />}
        </main>
      </div>

      {/* Corporate Styled Footer */}
      <footer className="bg-white border-t border-slate-100 p-5 mt-auto text-center text-xs text-slate-400 font-semibold uppercase tracking-wider" id="footer-stamp">
        <span>Microsoft Fabric BI Capstone Portal · DirectLake Sync Active · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

// Bot Icon helper to prevent issues with imports
function BotIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 transition-transform hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
