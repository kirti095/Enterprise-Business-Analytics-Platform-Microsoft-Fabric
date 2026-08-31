/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { STAR_SCHEMA_TABLES } from "../data";
import { StarSchemaTable, SchemaField } from "../types";
import { 
  GitFork, 
  Database, 
  Key, 
  Layers, 
  TrendingUp, 
  Info, 
  ArrowRightLeft, 
  BookOpen, 
  Plus, 
  HelpCircle 
} from "lucide-react";

export function DataModeler() {
  const [selectedTable, setSelectedTable] = useState<StarSchemaTable>(STAR_SCHEMA_TABLES[2]); // Central Fact Table
  const [hoveredField, setHoveredField] = useState<SchemaField | null>(null);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 font-sans" id="data-modeler-portal">
      {/* Visual Canvas Panel */}
      <div className="xl:col-span-3 bg-white p-6 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-4 min-h-[600px] relative overflow-x-auto">
        <div>
          <h3 className="font-bold text-slate-800 text-base">Power BI Dimensional Relationship Modeler</h3>
          <p className="text-slate-400 text-xs">Visualizing Star Schema relationships inside Fabric and Composite Models</p>
        </div>

        {/* Interactive canvas schema drawing */}
        <div className="relative border border-slate-100 rounded-xl bg-slate-50/10 h-[500px] min-w-[700px] shadow-inner overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 bg-slate-50 opacity-40 pointer-events-none" style={{ backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }} />

          {/* Connective Relationship SVGs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
              </marker>
              <marker id="dimStar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <circle cx="5" cy="5" r="3" fill="#0284c7" />
              </marker>
            </defs>

            {/* Path: Date -> Sales */}
            <path
              d="M 230,120 L 350,120 L 350,230 L 400,230"
              fill="none"
              stroke={hoveredField?.name === "Date_Key" ? "#d97706" : "#cbd5e1"}
              strokeWidth={hoveredField?.name === "Date_Key" ? 3 : 2}
              markerStart="url(#dimStar)"
              markerEnd="url(#arrow)"
              className="transition-all duration-300"
            />
            {/* Connection text */}
            <text x="250" y="110" fill="#94a3b8" fontSize="10" fontWeight="bold">1</text>
            <text x="380" y="220" fill="#d97706" fontSize="10" fontWeight="bold">*</text>

            {/* Path: Customer -> Sales */}
            <path
              d="M 230,420 L 350,420 L 350,290 L 400,290"
              fill="none"
              stroke={hoveredField?.name === "Customer_Key" ? "#d97706" : "#cbd5e1"}
              strokeWidth={hoveredField?.name === "Customer_Key" ? 3 : 2}
              markerStart="url(#dimStar)"
              markerEnd="url(#arrow)"
              className="transition-all duration-300"
            />
            <text x="250" y="410" fill="#94a3b8" fontSize="10" fontWeight="bold">1</text>
            <text x="380" y="280" fill="#d97706" fontSize="10" fontWeight="bold">*</text>

            {/* Path: Product -> Sales */}
            <path
              d="M 700,260 L 570,260"
              fill="none"
              stroke={hoveredField?.name === "Product_Key" ? "#d97706" : "#cbd5e1"}
              strokeWidth={hoveredField?.name === "Product_Key" ? 3 : 2}
              markerStart="url(#dimStar)"
              markerEnd="url(#arrow)"
              className="transition-all duration-300"
            />
            <text x="680" y="250" fill="#94a3b8" fontSize="10" fontWeight="bold">1</text>
            <text x="590" y="250" fill="#d97706" fontSize="10" fontWeight="bold">*</text>
          </svg>

          {/* Render Star Schema Table Nodes */}
          {STAR_SCHEMA_TABLES.map(table => {
            const isFact = table.type === "Fact";
            const isSelected = selectedTable.id === table.id;

            return (
              <div
                key={table.id}
                onClick={() => setSelectedTable(table)}
                style={{
                  left: `${table.position.x}px`,
                  top: `${table.position.y}px`,
                }}
                className={`absolute w-56 rounded-xl border-2 transition-all cursor-pointer select-none bg-white z-10 hover:shadow-md ${
                  isSelected 
                    ? "border-amber-500 ring-2 ring-amber-100" 
                    : isFact 
                      ? "border-rose-200/80 hover:border-rose-400" 
                      : "border-slate-200/80 hover:border-blue-400"
                }`}
              >
                {/* Visual Header Block */}
                <div className={`p-2.5 rounded-t-lg text-xs font-bold font-sans text-white flex justify-between items-center ${
                  isFact ? "bg-rose-600" : "bg-sky-700"
                }`}>
                  <span className="truncate">{table.name}</span>
                  <Database className="w-3.5 h-3.5 shrink-0 opacity-80" />
                </div>

                {/* Field Indexes inside physical box */}
                <div className="flex flex-col p-2 text-[11px] font-medium leading-relaxed uppercase">
                  {table.fields.slice(0, 5).map(field => {
                    const isKey = field.isPrimaryKey || field.isForeignKey;
                    const isHovered = hoveredField?.name === field.name;

                    return (
                      <div
                        key={field.name}
                        onMouseEnter={() => setHoveredField(field)}
                        onMouseLeave={() => setHoveredField(null)}
                        className={`flex justify-between items-center px-1.5 py-1 rounded-md transition-colors ${
                          isHovered 
                            ? "bg-amber-50 text-amber-900" 
                            : "hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {isKey && (
                            <Key className={`w-3 h-3 ${
                              field.isPrimaryKey ? "text-amber-500" : "text-amber-400"
                            }`} />
                          )}
                          <span className="font-mono text-[10px] select-all truncate">{field.name}</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold font-mono">{field.type}</span>
                      </div>
                    );
                  })}
                  {table.fields.length > 5 && (
                    <div className="p-1 text-center text-slate-400 tracking-tight text-[9px] font-bold bg-slate-50 rounded-sm mt-1">
                      + {table.fields.length - 5} more attributes
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Database details and schema inspector card */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-4 animate-fadeIn">
        <div>
          <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-extrabold text-white tracking-widest ${
            selectedTable.type === "Fact" ? "bg-rose-600" : "bg-sky-700"
          }`}>
            {selectedTable.type} Node
          </span>
          <h3 className="font-bold text-slate-800 text-sm mt-2 font-sans">{selectedTable.name} Schema</h3>
          <p className="text-slate-400 text-xs">Explaining relationships and dimensional rules.</p>
        </div>

        {/* Scrollable Column definitions */}
        <div className="flex-1 overflow-y-auto max-h-[350px] pr-1 flex flex-col gap-3">
          {selectedTable.fields.map(field => (
            <div key={field.name} className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl flex flex-col gap-1 transition-colors hover:bg-slate-50/80">
              <div className="flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-1.5 font-mono text-slate-800 font-bold">
                  {field.isPrimaryKey && <Key className="w-3.5 h-3.5 text-amber-500" />}
                  {field.isForeignKey && <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{field.name}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-bold">{field.type}</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{field.description}</p>
              {field.isForeignKey && (
                <div className="text-[9px] font-bold text-amber-600 flex items-center gap-1 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-md mt-1 w-fit">
                  <span>Connects to:</span>
                  <span className="font-mono">{field.foreignKeyTarget}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-100 p-4 rounded-xl flex flex-col gap-2 border border-slate-200/50 text-xs leading-relaxed">
          <h4 className="font-bold text-slate-700 flex items-center gap-1.5 text-[11px] uppercase">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Composite Star Schema Advantage</span>
          </h4>
          <p className="text-slate-600 text-[10px]">
            Organizing operational layers inside SQL Database Warehouses using dimensional standard models reduces redundant join loops in large analytical pipelines, achieving 7-9x faster refresh speeds in Power BI aggregates.
          </p>
        </div>
      </div>
    </div>
  );
}
