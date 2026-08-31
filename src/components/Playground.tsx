/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { SQL_QUERIES, INITIAL_NOTEBOOK_CELLS } from "../data";
import { SqlQuery, NotebookCell } from "../types";
import { 
  BarChart, Bar, 
  AreaChart, Area, 
  LineChart, Line, 
  ScatterChart, Scatter, 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, 
  Cell 
} from "recharts";
import { 
  Play, 
  Terminal, 
  Database, 
  Layers, 
  TableProperties, 
  BookOpen, 
  FileCode, 
  Activity, 
  CheckCircle2, 
  ChevronRight, 
  Loader2 
} from "lucide-react";

export function Playground() {
  const [activeWorkspace, setActiveWorkspace] = useState<"sql" | "jupyter">("sql");
  
  // SQL Workspace States
  const [queries, setQueries] = useState<SqlQuery[]>(SQL_QUERIES);
  const [selectedQuery, setSelectedQuery] = useState<SqlQuery>(SQL_QUERIES[0]);
  const [customSqlCode, setCustomSqlCode] = useState<string>(SQL_QUERIES[0].code);
  const [isExecutingSql, setIsExecutingSql] = useState<boolean>(false);
  const [sqlResults, setSqlResults] = useState<{ headers: string[]; rows: any[][] } | null>({
    headers: SQL_QUERIES[0].expectedHeaders,
    rows: SQL_QUERIES[0].expectedRows
  });

  // Jupyter Workspace States
  const [notebookCells, setNotebookCells] = useState<NotebookCell[]>(INITIAL_NOTEBOOK_CELLS);
  const [runningCellId, setRunningCellId] = useState<string | null>(null);

  // Trigger SQL Query Execution
  const executeSqlQuery = async () => {
    setIsExecutingSql(true);
    await new Promise(res => setTimeout(res, 800)); // Simulate networking latency

    // Check if the code is slightly edited or different, fallback safely
    const matchingQuery = queries.find(q => q.id === selectedQuery.id);
    if (matchingQuery) {
      setSqlResults({
        headers: matchingQuery.expectedHeaders,
        rows: matchingQuery.expectedRows
      });
    } else {
      // Return simple query response simulation
      setSqlResults({
        headers: ["Column_A", "Value_Y"],
        rows: [["Custom Evaluator", 100], ["Engine OK", 220]]
      });
    }
    setIsExecutingSql(false);
  };

  // Trigger Jupyter cell run
  const runJupyterCell = async (cellId: string) => {
    setRunningCellId(cellId);
    
    // Tapping loader
    setNotebookCells(prev => prev.map(c => c.id === cellId ? { ...c, status: "running" } : c));
    await new Promise(res => setTimeout(res, 1200));

    setNotebookCells(prev => prev.map(c => c.id === cellId ? { ...c, status: "success" } : c));
    setRunningCellId(null);
  };

  return (
    <div className="flex flex-col gap-6 font-sans" id="analytics-playground-workspace">
      {/* Workspace Selector Switch */}
      <div className="flex bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-amber-500" />
          <div>
            <h3 className="font-bold text-slate-800 text-sm tracking-tight">Interactive Analytics Classrooms</h3>
            <p className="text-slate-400 text-xs">Run SQL Warehouse endpoints or play with Python machine learning forecasting scripts</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveWorkspace("sql");
              setCustomSqlCode(SQL_QUERIES[0].code);
              setSelectedQuery(SQL_QUERIES[0]);
              setSqlResults({ headers: SQL_QUERIES[0].expectedHeaders, rows: SQL_QUERIES[0].expectedRows });
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all border flex items-center gap-1.5 ${
              activeWorkspace === "sql"
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Interactive SQL Warehouse</span>
          </button>

          <button
            onClick={() => setActiveWorkspace("jupyter")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all border flex items-center gap-1.5 ${
              activeWorkspace === "jupyter"
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Jupyter Machine Learning PyNotebook</span>
          </button>
        </div>
      </div>

      {/* WORKSPACE CONTENT: SQL EDITOR */}
      {activeWorkspace === "sql" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fadeIn">
          {/* SQL Editor Side Panel config */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Select SQL Templates</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">Choose preloaded analytical query suites constructed for Microsoft Fabric endpoint warehouses</p>
            </div>

            {/* Preconfigured Query Quick Slices */}
            <div className="flex flex-col gap-2">
              {queries.map(q => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuery(q);
                    setCustomSqlCode(q.code);
                    setSqlResults({ headers: q.expectedHeaders, rows: q.expectedRows });
                  }}
                  className={`p-3 text-left rounded-lg text-xs font-semibold leading-relaxed transition-all border flex flex-col gap-0.5 ${
                    selectedQuery.id === q.id
                      ? "bg-amber-50/50 border-amber-300 text-amber-900"
                      : "bg-slate-50/40 hover:bg-slate-50 border-slate-100 text-slate-650"
                  }`}
                >
                  <span className="font-bold flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-slate-400" />
                    {q.name}
                  </span>
                  <span className="text-[10px] text-slate-400 text-inherit mt-1 font-medium">{q.description}</span>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 p-4 border border-slate-200/50 rounded-xl flex flex-col gap-1 text-[11px] text-slate-550 leading-relaxed mt-auto">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> DirectLake Sync Active
              </span>
              <span>
                Microsoft Fabric utilizes **DirectLake connection mechanisms**, linking physical Delta Tables on OneLake directory directly to Power BI calculations without secondary caching routines.
              </span>
            </div>
          </div>

          {/* Code Mirror Playground */}
          <div className="xl:col-span-2 flex flex-col gap-6 bg-white p-5 rounded-xl border border-slate-100 shadow-xs">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">SQL Query Sandbox</h4>
                <p className="text-slate-400 text-xs">Simulate queries on the synthesized 'Gold_Fact_Sales' warehouse index</p>
              </div>

              <button
                onClick={executeSqlQuery}
                disabled={isExecutingSql}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-2 transition-all active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isExecutingSql ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Querying Fabric Database...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-white" />
                    <span>Run Query</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Field block */}
            <div className="flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-800 font-mono text-xs">
              <div className="bg-slate-950 p-2 text-[10px] font-bold text-slate-500 flex justify-between items-center px-4">
                <span>SQL COMPILER ACTIVE | DB: FABRIC_WAREHOUSE</span>
                <span>CTRL + ENTER</span>
              </div>
              <textarea
                value={customSqlCode}
                onChange={(e) => setCustomSqlCode(e.target.value)}
                className="h-32 text-indigo-300 font-semibold bg-slate-900 p-4 border-none text-xs focus:outline-hidden leading-relaxed resize-none font-mono"
              />
            </div>

            {/* Data Grid Results */}
            {sqlResults && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-slate-150 pb-2">
                  <span className="font-bold text-slate-700 text-xs flex items-center gap-1.5 uppercase">
                    <TableProperties className="w-4 h-4 text-slate-500" />
                    <span>Results Registry</span>
                  </span>
                  <span className="text-slate-400 text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono font-bold">
                    {sqlResults.rows.length} rows returned successfully
                  </span>
                </div>

                {/* Split table and simple rendering line charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {/* Results table */}
                  <div className="overflow-x-auto max-h-48 border border-slate-100 rounded-lg">
                    <table className="w-full text-left font-serif text-[11px] border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 uppercase text-[9px] font-sans font-semibold border-b border-slate-100">
                          {sqlResults.headers.map(h => (
                            <th key={h} className="p-3">{h.replace("_", " ")}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-750 font-sans font-medium text-slate-650">
                        {sqlResults.rows.map((row, r_idx) => (
                          <tr key={r_idx} className="hover:bg-slate-50">
                            {row.map((cell, c_idx) => (
                              <td key={c_idx} className="p-3 font-mono font-semibold text-slate-800">
                                {typeof cell === "number" ? (cell > 1000 ? `$${cell.toLocaleString()}` : cell) : cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* High Fidelity mini chart rendering metrics */}
                  {selectedQuery.chartConfig && (
                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 flex flex-col justify-between">
                      <div className="mb-2">
                        <span className="text-[10px] uppercase font-semibold text-slate-400">Yield Analytics Visualizer</span>
                      </div>
                      <div className="h-36 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          {selectedQuery.chartConfig.type === "bar" ? (
                            <BarChart 
                              data={sqlResults.rows.map(r_row => {
                                const obj: Record<string, any> = {};
                                sqlResults.headers.forEach((hdr, idx) => {
                                  obj[hdr] = r_row[idx];
                                });
                                return obj;
                              })}
                              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                            >
                              <XAxis dataKey={selectedQuery.chartConfig.xKey} stroke="#94a3b8" fontSize={9} />
                              <YAxis stroke="#94a3b8" fontSize={9} />
                              <Tooltip contentStyle={{ fontSize: "10px" }} />
                              {selectedQuery.chartConfig.yKeys.map((k, ind) => (
                                <Bar key={k} dataKey={k} fill={ind === 0 ? "#d97706" : "#0284c7"} radius={[2, 2, 0, 0]} />
                              ))}
                            </BarChart>
                          ) : (
                            <AreaChart 
                              data={sqlResults.rows.map(r_row => {
                                const obj: Record<string, any> = {};
                                sqlResults.headers.forEach((hdr, idx) => {
                                  obj[hdr] = r_row[idx];
                                });
                                return obj;
                              })}
                              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                            >
                              <XAxis dataKey={selectedQuery.chartConfig.xKey} stroke="#94a3b8" fontSize={9} />
                              <YAxis stroke="#94a3b8" fontSize={9} />
                              <Tooltip contentStyle={{ fontSize: "10px" }} />
                              {selectedQuery.chartConfig.yKeys.map((k, ind) => (
                                <Area key={k} type="monotone" dataKey={k} stroke={ind === 0 ? "#d97706" : "#059669"} fill={ind === 0 ? "#fef3c7" : "#d1fae5"} strokeWidth={2} />
                              ))}
                            </AreaChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WORKSPACE CONTENT: JUPYTER NOTEBOOKS */}
      {activeWorkspace === "jupyter" && (
        <div className="flex flex-col gap-6 animate-fadeIn" id="jupyter-notebook-canvas">
          {notebookCells.map(cell => (
            <div 
              key={cell.id} 
              className={`rounded-xl border shadow-2xs overflow-hidden transition-all bg-white ${
                cell.status === "running" ? "border-amber-400 ring-2 ring-amber-50" : "border-slate-200/80"
              }`}
            >
              {/* Cell Header Strip */}
              <div className="bg-slate-50 border-b border-slate-100 p-3 px-4 flex justify-between items-center text-xs text-slate-500">
                <span className="font-semibold flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    cell.status === "success" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
                  }`} />
                  {cell.type === "markdown" ? "Jupyter Markdown Node" : "PySpark Code Node [3]"}
                </span>

                {cell.type === "code" && (
                  <button
                    onClick={() => runJupyterCell(cell.id)}
                    disabled={runningCellId !== null}
                    className="flex items-center gap-1 px-3 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-amber-500 rounded text-[10px] tracking-wide uppercase font-bold text-slate-300 transition-all cursor-pointer"
                  >
                    {cell.status === "running" ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-amber-500" />
                        <span>Running PySpark...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-2.5 h-2.5 fill-slate-350" />
                        <span>Run Python Cell</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Cell Work block content */}
              <div className="p-5 font-mono text-xs">
                {cell.type === "markdown" ? (
                  <div className="font-sans text-slate-700 leading-relaxed max-w-4xl tracking-tight text-sm flex flex-col gap-2">
                    {/* Simplified parsing of headings */}
                    {cell.content.split("\n").map((line, l_id) => {
                      if (line.startsWith("##")) {
                        return <h4 key={l_id} className="font-bold text-slate-850 mt-2 text-base">{line.replace("##", "").trim()}</h4>;
                      }
                      return <p key={l_id} className="text-slate-500 text-xs">{line}</p>;
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 font-mono">
                    {/* Code Syntax area */}
                    <pre className="bg-slate-900 font-semibold p-4 rounded-xl text-emerald-400 overflow-x-auto leading-relaxed border border-indigo-950 text-[11px]">
                      <code>{cell.content}</code>
                    </pre>

                    {/* Console & Chart outputs */}
                    {cell.status === "success" && cell.output && (
                      <div className="border border-slate-200/50 bg-slate-50/20 p-5 rounded-xl flex flex-col md:flex-row gap-5 font-sans leading-relaxed animate-fadeIn">
                        {/* Static metrics console */}
                        {cell.output.text && (
                          <div className="font-mono text-[10px] font-bold leading-relaxed whitespace-pre bg-slate-950 text-slate-200 p-4 border border-slate-800 rounded-lg grow">
                            {cell.output.text}
                          </div>
                        )}

                        {/* Chart renderings */}
                        {cell.output.chartData && cell.output.chartConfig && (
                          <div className="bg-white border border-slate-100 p-4 rounded-xl flex flex-col gap-2 shadow-xs shrink-0 w-full md:w-96">
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase flex items-center gap-1">
                              <Activity className="w-3.5 h-3.5" /> Generated Regression Plot
                            </span>
                            
                            <div className="h-36 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                {cell.output.chartConfig.type === "line" ? (
                                  <LineChart data={cell.output.chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                    <XAxis dataKey={cell.output.chartConfig.xKey} stroke="#94a3b8" fontSize={9} />
                                    <YAxis stroke="#94a3b8" fontSize={9} />
                                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                                    <Legend wrapperStyle={{ fontSize: "9px" }} />
                                    <Line type="monotone" dataKey="Actual" stroke="#94a3b8" strokeWidth={1} strokeDasharray="3 3" />
                                    <Line type="monotone" dataKey="Forecast" stroke="#d97706" strokeWidth={3} activeDot={{ r: 8 }} />
                                  </LineChart>
                                ) : (
                                  <ScatterChart margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                                    <XAxis type="number" dataKey="x" name="Rating" domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#94a3b8" fontSize={9} />
                                    <YAxis type="number" dataKey="y" name="Risk %" stroke="#94a3b8" fontSize={9} />
                                    <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ fontSize: "10px" }} />
                                    <Scatter name="Data" data={cell.output.chartData} fill="#8884d8">
                                      {cell.output.chartData.map((entry, index) => (
                                        <Cell 
                                          key={`cell-${index}`} 
                                          fill={entry.cluster === 0 ? "#10b981" : entry.cluster === 1 ? "#ef4444" : "#f59e0b"} 
                                        />
                                      ))}
                                    </Scatter>
                                  </ScatterChart>
                                )}
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
