/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { INITIAL_PIPELINE_NODES, ONELAKE_CATALOG } from "../data";
import { PipelineNode, PipelineLog, DeltaTable } from "../types";
import { 
  Play, 
  Terminal, 
  Loader2, 
  CheckCircle2, 
  Database, 
  Layers, 
  TableProperties, 
  Search, 
  FolderPlus, 
  Columns, 
  ChevronRight, 
  Info 
} from "lucide-react";

export function ETLPipelineBuilder() {
  const [nodes, setNodes] = useState<PipelineNode[]>(INITIAL_PIPELINE_NODES);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<PipelineLog[]>([
    { timestamp: "19:44:00", level: "INFO", message: "Microsoft Fabric Data Factory connected to OneLake workspace." },
    { timestamp: "19:44:02", level: "INFO", message: "ETL pipelines registered. System idle, ready for trigger execution." }
  ]);
  const [activeCatalogLayer, setActiveCatalogLayer] = useState<"Bronze" | "Silver" | "Gold">("Silver");
  const [selectedCatalogTable, setSelectedCatalogTable] = useState<DeltaTable | null>(ONELAKE_CATALOG[2]);
  const [searchTableQuery, setSearchTableQuery] = useState<string>("");

  // Filter Catalog
  const filteredCatalog = ONELAKE_CATALOG.filter(table => {
    const matchesLayer = table.layer === activeCatalogLayer;
    const matchesSearch = table.name.toLowerCase().includes(searchTableQuery.toLowerCase());
    return matchesLayer && matchesSearch;
  });

  // Add Log Helper
  const addLog = (level: "INFO" | "SUCCESS" | "WARNING" | "ERROR", message: string) => {
    const time = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [...prev, { timestamp: time, level, message }]);
  };

  // Run Pipeline Simulation Trigger
  const triggerPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    addLog("INFO", "Triggering Microsoft Fabric Pipeline runtime instance: #F-92842...");

    // Deep copy nodes to restart
    const workingNodes = nodes.map(n => ({ ...n, status: "idle" as const }));
    setNodes(workingNodes);

    try {
      // Step 1: Raw Ingestion
      addLog("INFO", "Initializing step 1/4: Ingestion from external sources...");
      setNodes(prev => prev.map((n, i) => i === 0 ? { ...n, status: "running" } : n));
      await delay(1800);
      setNodes(prev => prev.map((n, i) => i === 0 ? { ...n, status: "success" } : n));
      addLog("SUCCESS", "Raw JSON invoices and CRM tables successfully saved to Bronze folder standard landing zones.");

      // Step 2: Data Cleaning
      addLog("INFO", "Initializing step 2/4: Executing cleaning schemas and PySpark jobs...");
      setNodes(prev => prev.map((n, i) => i === 1 ? { ...n, status: "running" } : n));
      await delay(1800);
      setNodes(prev => prev.map((n, i) => i === 1 ? { ...n, status: "success" } : n));
      addLog("SUCCESS", "Standardized customer billing dates, dropped duplicate rows, and cast revenue metrics on Bronze datasets successfully.");

      // Step 3: Transformation
      addLog("INFO", "Initializing step 3/4: Converting cleaned tables to Silver Delta format with partitioning...");
      setNodes(prev => prev.map((n, i) => i === 2 ? { ...n, status: "running" } : n));
      await delay(2000);
      setNodes(prev => prev.map((n, i) => i === 2 ? { ...n, status: "success" } : n));
      addLog("SUCCESS", "Silver partition files modeled. Delta schema logs synchronized successfully on OneLake engine.");

      // Step 4: Gold SQL Endpoint Pub
      addLog("INFO", "Initializing step 4/4: Constructing dimensional star indices and gold aggregates...");
      setNodes(prev => prev.map((n, i) => i === 3 ? { ...n, status: "running" } : n));
      await delay(1500);
      setNodes(prev => prev.map((n, i) => i === 3 ? { ...n, status: "success" } : n));
      addLog("SUCCESS", "Microsoft Fabric SQL Analytics endpoint successfully provisioned. Power BI reports refreshed.");

    } catch (err) {
      addLog("ERROR", "Pipeline failed during PySpark execution: OutOfMemoryError.");
    } finally {
      setIsRunning(false);
      addLog("SUCCESS", "End-to-end fabric execution completed perfectly in 7.1s.");
    }
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 font-sans" id="etl-pipeline-builder">
      {/* Visual Pipeline Canvas */}
      <div className="xl:col-span-2 flex flex-col gap-6 bg-white p-6 rounded-xl border border-slate-100 shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800 text-base">OneLake Data Pipeline Diagram</h3>
            <p className="text-slate-400 text-xs">Simulating OneLake medallion architecture flows and orchestration</p>
          </div>
          <button
            onClick={triggerPipeline}
            disabled={isRunning}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 text-xs font-bold transition-all shadow-sm ${
              isRunning 
                ? "bg-amber-140 text-amber-600 border border-amber-200 cursor-not-allowed" 
                : "bg-amber-500 hover:bg-amber-600 text-white hover:shadow-xs active:scale-98"
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Running ETL...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Execute Fabric Pipeline</span>
              </>
            )}
          </button>
        </div>

        {/* Node Layout block */}
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 py-8 bg-slate-50/50 rounded-xl px-4 border border-dashed border-slate-200/60 relative overflow-hidden">
          {nodes.map((node, index) => (
            <div key={node.id} className="relative flex flex-col gap-2 items-center text-center">
              {/* Background gradient block */}
              <div className="absolute inset-0 bg-white/20 blur-md pointer-events-none" />

              {/* Node wrapper card */}
              <div className={`p-4 rounded-xl border w-full max-w-[170px] bg-white transition-all duration-300 relative z-10 ${
                node.status === "running" ? "ring-2 ring-amber-500 border-amber-300 scale-102 shadow-sm" :
                node.status === "success" ? "border-emerald-200 bg-emerald-50/10 shadow-xs" : "border-slate-200/80 hover:border-slate-300"
              }`}>
                {/* Node Top Header Icon Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-extrabold ${
                    node.type === "source" ? "bg-amber-100 text-amber-700" :
                    node.type === "cleaning" ? "bg-blue-100 text-blue-700" :
                    node.type === "transformation" ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {node.type}
                  </span>

                  {node.status === "running" && <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />}
                  {node.status === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {node.status === "idle" && <div className="w-3 h-3 rounded-full bg-slate-200" />}
                </div>

                <h4 className="font-bold text-slate-800 text-xs tracking-tight line-clamp-1">{node.label}</h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{node.description}</p>
              </div>

              {/* Horizontal linking line for non-end elements */}
              {index < nodes.length - 1 && (
                <div className="hidden sm:block absolute top-[40px] -right-[15%] w-[30%] h-[2px] bg-slate-200 z-0">
                  <ChevronRight className="absolute -top-[5px] right-1 w-3 h-3 text-slate-400 font-bold" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Real-time Pipeline Shell Console outputs */}
        <div className="flex flex-col grow bg-slate-900 rounded-xl p-5 border border-slate-800 font-mono text-xs text-slate-100 relative max-h-60 overflow-y-auto">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <span className="flex items-center gap-2 font-bold text-emerald-400 tracking-wide text-[10px] uppercase">
              <Terminal className="w-3.5 h-3.5" />
              <span>Fabric Data Factory Console</span>
            </span>
            <span className="text-[10px] text-slate-500">Instance ID: F-92842</span>
          </div>

          <div className="flex flex-col gap-2">
            {logs.map((log, idx) => (
              <div key={idx} className="flex gap-2.5 items-start leading-relaxed text-[11px]">
                <span className="text-slate-500 font-semibold select-none">[{log.timestamp}]</span>
                <span className={`font-bold uppercase tracking-wider text-[10px] ${
                  log.level === "SUCCESS" ? "text-emerald-400" :
                  log.level === "ERROR" ? "text-rose-400" :
                  log.level === "WARNING" ? "text-amber-400" : "text-blue-400"
                }`}>
                  [{log.level}]
                </span>
                <span className="text-slate-200 flex-1">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medallion OneLake Tables Catalog Browser */}
      <div className="flex flex-col bg-white p-6 rounded-xl border border-slate-100 shadow-xs gap-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">OneLake Lakehouse Tables</h3>
          <p className="text-slate-400 text-xs">Explore files and schemas in Bronze, Silver, & Gold medallion states</p>
        </div>

        {/* Medallion Segment Controls */}
        <div className="grid grid-cols-3 bg-slate-100/70 p-1 rounded-lg border border-slate-150 text-xs">
          {(["Bronze", "Silver", "Gold"] as const).map(layer => (
            <button
              key={layer}
              onClick={() => {
                setActiveCatalogLayer(layer);
                const firstTable = ONELAKE_CATALOG.find(t => t.layer === layer) || null;
                setSelectedCatalogTable(firstTable);
              }}
              className={`py-2 px-1 text-center font-bold tracking-tight rounded-md transition-all flex items-center justify-center gap-1.5 ${
                activeCatalogLayer === layer 
                  ? "bg-white text-slate-800 shadow-xs border border-slate-150" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{layer} Layer</span>
            </button>
          ))}
        </div>

        {/* Search Slicer inside Lakehouse */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search delta tables..."
            value={searchTableQuery}
            onChange={(e) => setSearchTableQuery(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-amber-500 pl-8 text-slate-700 placeholder-slate-400"
          />
          <Search className="absolute left-2.5 top-3 w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Table Item Lists */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-56 pr-1">
          {filteredCatalog.length > 0 ? (
            filteredCatalog.map(table => (
              <button
                key={table.name}
                onClick={() => setSelectedCatalogTable(table)}
                className={`flex justify-between items-center p-3 rounded-lg text-left text-xs font-semibold leading-relaxed transition-colors border ${
                  selectedCatalogTable?.name === table.name 
                    ? "bg-amber-50/30 border-amber-200 text-amber-900" 
                    : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 text-slate-600"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TableProperties className={`w-4 h-4 ${
                    selectedCatalogTable?.name === table.name ? "text-amber-500" : "text-slate-400"
                  }`} />
                  <span className="font-mono text-[11px] truncate max-w-[130px]">{table.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">{(table.sizeKb/1024).toFixed(1)} MB</span>
                  <span className="text-[9px] text-slate-400 font-mono font-medium">{table.rowCount.toLocaleString()} rows</span>
                </div>
              </button>
            ))
          ) : (
            <span className="text-slate-400 text-xs italic text-center py-6">No matching OneLake catalog tables.</span>
          )}
        </div>

        {/* Detailed schema and partitioning metadata explorer */}
        {selectedCatalogTable && (
          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex flex-col gap-3 font-sans animate-fadeIn">
            <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2 mb-1">
              <span className="font-bold text-slate-700 flex items-center gap-1 text-[11px] uppercase">
                <Columns className="w-3.5 h-3.5 text-slate-500" />
                <span>Delta Column Schema</span>
              </span>
              <span className="text-slate-400 font-mono text-[10px]">{selectedCatalogTable.layer} table structure</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {selectedCatalogTable.columns.map(col => (
                <span key={col} className="bg-white px-2 py-1 border border-slate-200 text-[10px] font-mono rounded-md text-slate-600 font-semibold shadow-2xs">
                  {col}
                </span>
              ))}
            </div>

            <div className="flex items-start gap-2 bg-amber-50/50 border border-amber-100 p-2.5 rounded-lg text-slate-600 text-[10px] leading-relaxed">
              <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p>
                In Microsoft Fabric, tables are managed in Spark Delta format, enabling direct Parquet file indexing with ACID guarantees and native OneLake shortcuts support.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
