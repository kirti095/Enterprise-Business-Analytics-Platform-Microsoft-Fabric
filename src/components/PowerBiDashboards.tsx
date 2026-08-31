/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { BUSINESS_DATA } from "../data";
import { InteractiveDataRecord } from "../types";
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
  Filter, RotateCcw, TrendingUp, DollarSign, 
  Percent, Users, Activity, ShoppingBag, 
  ShieldAlert, BookOpen, ChevronDown 
} from "lucide-react";

export function PowerBiDashboards() {
  const [activeTab, setActiveTab] = useState<"executive" | "sales" | "customer" | "product" | "financial">("executive");
  
  // Filtering States
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSegment, setSelectedSegment] = useState<string>("All");
  const [minRevenue, setMinRevenue] = useState<number>(0);

  // Available Filter Options
  const regions = ["All", "North", "South", "East", "West"];
  const categories = ["All", "Software", "Hardware", "Cloud Services", "Support"];
  const segments = ["All", "High-Value", "Loyal", "Frequent", "At-Risk"];

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedRegion("All");
    setSelectedCategory("All");
    setSelectedSegment("All");
    setMinRevenue(0);
  };

  // Filter Data
  const filteredData = useMemo(() => {
    return BUSINESS_DATA.filter(item => {
      const matchRegion = selectedRegion === "All" || item.region === selectedRegion;
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchSegment = selectedSegment === "All" || item.segment === selectedSegment;
      const matchRevenue = item.revenue >= minRevenue;
      return matchRegion && matchCategory && matchSegment && matchRevenue;
    });
  }, [selectedRegion, selectedCategory, selectedSegment, minRevenue]);

  // Aggregate Performance Metrics
  const summaryKPIs = useMemo(() => {
    if (filteredData.length === 0) {
      return { totalRevenue: 0, totalCost: 0, totalProfit: 0, avgMargin: 0, avgSatisfaction: 0, avgChurnRisk: 0, totalUnits: 0 };
    }
    const totalRev = filteredData.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalCost = filteredData.reduce((acc, curr) => acc + curr.cost, 0);
    const totalProfit = filteredData.reduce((acc, curr) => acc + curr.profit, 0);
    const totalUnits = filteredData.reduce((acc, curr) => acc + curr.units, 0);
    const satisfactionSum = filteredData.reduce((acc, curr) => acc + curr.rating, 0);
    const churnSum = filteredData.reduce((acc, curr) => acc + curr.churnRisk, 0);

    return {
      totalRevenue: totalRev,
      totalCost,
      totalProfit,
      avgMargin: totalRev > 0 ? (totalProfit / totalRev) * 100 : 0,
      avgSatisfaction: satisfactionSum / filteredData.length,
      avgChurnRisk: (churnSum / filteredData.length) * 100,
      totalUnits
    };
  }, [filteredData]);

  // Transform Data for Charts based on the selected fields
  const monthlyRevenueData = useMemo(() => {
    // Sort transactions by date and group chronologically
    const months: Record<string, { revenue: number; profit: number; cost: number; count: number }> = {};
    filteredData.forEach(item => {
      const monthStr = item.date.substring(0, 7); // YYYY-MM
      if (!months[monthStr]) {
        months[monthStr] = { revenue: 0, profit: 0, cost: 0, count: 0 };
      }
      months[monthStr].revenue += item.revenue;
      months[monthStr].profit += item.profit;
      months[monthStr].cost += item.cost;
      months[monthStr].count += 1;
    });

    return Object.keys(months).sort().map(key => ({
      name: key,
      Revenue: months[key].revenue,
      Profit: months[key].profit,
      Cost: months[key].cost,
      Count: months[key].count
    }));
  }, [filteredData]);

  const categoryShareData = useMemo(() => {
    const cats: Record<string, { revenue: number; profit: number }> = {};
    filteredData.forEach(item => {
      if (!cats[item.category]) {
        cats[item.category] = { revenue: 0, profit: 0 };
      }
      cats[item.category].revenue += item.revenue;
      cats[item.category].profit += item.profit;
    });

    return Object.keys(cats).map(key => ({
      name: key,
      Revenue: cats[key].revenue,
      Profit: cats[key].profit
    }));
  }, [filteredData]);

  const segmentData = useMemo(() => {
    const segs: Record<string, { revenue: number; churn: number; count: number }> = {};
    filteredData.forEach(item => {
      if (!segs[item.segment]) {
        segs[item.segment] = { revenue: 0, churn: 0, count: 0 };
      }
      segs[item.segment].revenue += item.revenue;
      segs[item.segment].churn += item.churnRisk;
      segs[item.segment].count += 1;
    });

    return Object.keys(segs).map(key => ({
      name: key,
      Revenue: segs[key].revenue,
      ChurnRate: segs[key].count > 0 ? (segs[key].churn / segs[key].count) * 100 : 0
    }));
  }, [filteredData]);

  const COLORS = ["#0284c7", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="flex flex-col gap-6" id="power-bi-dashboards">
      {/* Power BI Styled Control bar */}
      <div className="flex flex-col xl:flex-row gap-4 bg-white p-5 rounded-xl border border-slate-100 shadow-xs justify-between items-start xl:items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-amber-500">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm tracking-tight">Active Filters</h3>
            <p className="text-slate-400 text-xs">Simulating real-time Power BI slicers & filters</p>
          </div>
        </div>

        {/* Filters Slicers */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Region Filter */}
          <div className="flex flex-col min-w-[110px]">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">Region</label>
            <div className="relative">
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer pr-8"
              >
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-3 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col min-w-[120px]">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">Category</label>
            <div className="relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer pr-8"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-3 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Segment Filter */}
          <div className="flex flex-col min-w-[120px]">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">Classification</label>
            <div className="relative">
              <select 
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer pr-8"
              >
                {segments.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-3 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Minimum Revenue Slider */}
          <div className="col-span-2 sm:col-span-1 flex flex-col min-w-[150px]">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Min. Sales</label>
              <span className="text-[10px] font-bold text-amber-600">${minRevenue.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="40000" 
              step="2500"
              value={minRevenue}
              onChange={(e) => setMinRevenue(Number(e.target.value))}
              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Reset button */}
          <button 
            onClick={handleResetFilters}
            className="col-span-2 sm:col-span-1 self-end sm:mb-0 p-2.5 bg-slate-50 hover:bg-slate-100 hover:text-amber-600 rounded-lg text-slate-500 transition-colors border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5"
            title="Reset slicers"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* KPIs Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI: Revenue */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-500">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Sales</p>
            <h4 className="text-xl font-bold font-mono text-slate-800">${summaryKPIs.totalRevenue.toLocaleString()}</h4>
            <p className="text-[10px] text-emerald-500 flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>Target met</span>
            </p>
          </div>
        </div>

        {/* KPI: Profit */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Net Profit</p>
            <h4 className="text-xl font-bold font-mono text-slate-800">${summaryKPIs.totalProfit.toLocaleString()}</h4>
            <span className="text-[10px] text-slate-400">Yielding margin index</span>
          </div>
        </div>

        {/* KPI: Margin */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Profit Margin</p>
            <h4 className="text-xl font-bold font-mono text-slate-800">{summaryKPIs.avgMargin.toFixed(1)}%</h4>
            <span className="text-[10px] text-slate-400">Aggregated gold standard</span>
          </div>
        </div>

        {/* KPI: Retention or CSAT */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-500">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Avg Satisfaction</p>
            <h4 className="text-xl font-bold font-mono text-slate-800">{summaryKPIs.avgSatisfaction.toFixed(2)} / 5</h4>
            <span className="text-[10px] text-slate-400">From customer CRM gold layer</span>
          </div>
        </div>
      </div>

      {/* Power BI Dashboard Sheet Tabs */}
      <div className="bg-slate-100/70 p-1 rounded-lg flex border border-slate-100 max-w-fit" id="report-sheet-tabs">
        <button
          onClick={() => setActiveTab("executive")}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
            activeTab === "executive" 
              ? "bg-white text-slate-800 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Executive Overview
        </button>
        <button
          onClick={() => setActiveTab("sales")}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
            activeTab === "sales" 
              ? "bg-white text-slate-800 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Sales Performance
        </button>
        <button
          onClick={() => setActiveTab("customer")}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
            activeTab === "customer" 
              ? "bg-white text-slate-800 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Customer Analytics
        </button>
        <button
          onClick={() => setActiveTab("product")}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
            activeTab === "product" 
              ? "bg-white text-slate-800 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Product Analytics
        </button>
        <button
          onClick={() => setActiveTab("financial")}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
            activeTab === "financial" 
              ? "bg-white text-slate-800 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Financial Dashboard
        </button>
      </div>

      {/* Main Dashboard Canvas */}
      {filteredData.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-100 shadow-xs flex flex-col items-center justify-center gap-4">
          <div className="p-3 bg-red-50 text-red-500 rounded-full">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">No transactions match current filters</h4>
            <p className="text-slate-400 text-xs mt-1">Please lower your minimum revenue filter or reset category filters.</p>
          </div>
          <button 
            onClick={handleResetFilters}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="transition-all duration-300">
          {/* TAB: EXECUTIVE */}
          {activeTab === "executive" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
              {/* Chronological Area Chart */}
              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Revenue & Margin Run Rate (Monthly)</h4>
                    <p className="text-xs text-slate-400">Aggregated chronological volume trends inside Microsoft Fabric Lakehouse</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-bold rounded-md">
                    Delta Gold Sync
                  </span>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d97706" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ background: "#1e293b", color: "#f8fafc", borderRadius: "10px", fontSize: "11px", border: "none" }}
                        formatter={(val) => [`$${Number(val).toLocaleString()}`]}
                      />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                      <Area type="monotone" dataKey="Revenue" stroke="#d97706" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" name="Sales Revenue" />
                      <Area type="monotone" dataKey="Profit" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProf)" name="Net Profit" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Contribution Bar Chart */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col">
                <div className="mb-6">
                  <h4 className="font-bold text-slate-800 text-sm">Product Category Revenue Contribution</h4>
                  <p className="text-xs text-slate-400">Total gross receipts per categorical segment</p>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryShareData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} width={80} />
                      <Tooltip 
                        contentStyle={{ background: "#1e293b", color: "#f8fafc", borderRadius: "8px", fontSize: "11px", border: "none" }}
                        formatter={(val) => [`$${Number(val).toLocaleString()}`]}
                      />
                      <Bar dataKey="Revenue" fill="#0284c7" radius={[0, 4, 4, 0]}>
                        {categoryShareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick insights banner */}
              <div className="lg:col-span-3 bg-gradient-to-r from-amber-500 to-amber-600 p-5 rounded-xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-xs">
                <div>
                  <h5 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-amber-200" />
                    <span>Executive Analytics Recommendation</span>
                  </h5>
                  <p className="text-amber-55 text-xs max-w-2xl mt-1 opacity-90">
                    High volume SaaS transactions drive **79.9%** Profit Margins, whereas support services generate lower yields. Recommend provisioning higher product support resources towards 'At-Risk' key accounts to improve aggregate retention rates.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-white/20 px-2 py-1 rounded font-bold uppercase tracking-wider">Predictive model active</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SALES */}
          {activeTab === "sales" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col">
                <div className="mb-6">
                  <h4 className="font-bold text-slate-800 text-sm">Monthly Growth & Invoiced Deal Volumes</h4>
                  <p className="text-xs text-slate-400">Tracking aggregate billing velocity trends</p>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ background: "#1e293b", color: "#f8fafc", borderRadius: "10px", fontSize: "11px", border: "none" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Line type="monotone" dataKey="Revenue" stroke="#d97706" strokeWidth={3} activeDot={{ r: 8 }} name="Sales ($)" />
                      <Line type="monotone" dataKey="Cost" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" name="Delivery Cost ($)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Data Table of Filtered Records */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col">
                <div className="mb-4">
                  <h4 className="font-bold text-slate-800 text-sm">Transactions Drilldown</h4>
                  <p className="text-xs text-slate-400">Showing {filteredData.length} active rows inside Silver Fact table</p>
                </div>
                <div className="overflow-y-auto max-h-72 border border-slate-50 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 font-semibold uppercase text-[9px] border-b border-slate-100">
                        <th className="p-3">Client</th>
                        <th className="p-3">Product</th>
                        <th className="p-2 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                      {filteredData.slice(0, 10).map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/50">
                          <td className="p-3 truncate max-w-[120px]" title={row.customerName}>
                            {row.customerName}
                          </td>
                          <td className="p-3 truncate max-w-[150px]" title={row.product}>
                            {row.product}
                          </td>
                          <td className="p-3 text-right font-mono text-slate-800 font-bold">
                            ${row.revenue.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      {filteredData.length > 10 && (
                        <tr>
                          <td colSpan={3} className="p-2 text-center text-slate-400 text-[11px] bg-slate-50 font-semibold">
                            + {filteredData.length - 10} more rows
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Showing top transactions</span>
                  <span className="font-mono font-bold">AVG deal: ${(summaryKPIs.totalRevenue / filteredData.length || 0).toFixed(0)}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CUSTOMER */}
          {activeTab === "customer" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
              {/* Customer Segments Churn Rate */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col">
                <div className="mb-6">
                  <h4 className="font-bold text-slate-800 text-sm">Churn Probability by Segment (%)</h4>
                  <p className="text-xs text-slate-400">Risk profiles computed recursively in Gold delta indexes</p>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={segmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
                      <Tooltip 
                        contentStyle={{ background: "#1e293b", color: "#f8fafc", borderRadius: "10px", fontSize: "11px", border: "none" }}
                        formatter={(val) => [`${Number(val).toFixed(1)}%`]}
                      />
                      <Bar dataKey="ChurnRate" fill="#ef4444" radius={[4, 4, 0, 0]}>
                        {segmentData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.ChurnRate > 50 ? "#ef4444" : entry.ChurnRate > 20 ? "#f59e0b" : "#10b981"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Churn Risk Profile Scatter */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col lg:col-span-2">
                <div className="mb-4">
                  <h4 className="font-bold text-slate-800 text-sm">Satisfaction Ratings vs Churn Score Matrix</h4>
                  <p className="text-xs text-slate-400">Evaluating active contracts to flags risk anomalies</p>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis type="number" dataKey="rating" name="Rating" unit="/5" domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#94a3b8" fontSize={11} />
                      <YAxis type="number" dataKey="churnRisk" name="Churn Risk" unit="%" stroke="#94a3b8" fontSize={11} />
                      <Tooltip 
                        cursor={{ strokeDasharray: "3 3" }} 
                        contentStyle={{ background: "#1e293b", color: "#f8fafc", borderRadius: "10px", fontSize: "11px", border: "none" }}
                        formatter={(val, name) => [name === "Churn Risk" ? `${(Number(val) * 100).toFixed(0)}%` : val, name]}
                      />
                      <Scatter name="Accounts" data={filteredData} fill="#8884d8">
                        {filteredData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.churnRisk > 0.6 ? "#ef4444" : entry.churnRisk > 0.25 ? "#f59e0b" : "#10b981"} 
                          />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRODUCT */}
          {activeTab === "product" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
              {/* Product Revenue Chart */}
              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col">
                <div className="mb-6">
                  <h4 className="font-bold text-slate-800 text-sm font-sans">Revenue and Net Yield by Product Categories</h4>
                  <p className="text-xs text-slate-400">OneLake product-level inventory ledger insights</p>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryShareData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ background: "#1e293b", color: "#f8fafc", borderRadius: "10px", fontSize: "11px", border: "none" }}
                        formatter={(val) => [`$${Number(val).toLocaleString()}`]}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Bar dataKey="Revenue" fill="#0284c7" radius={[4, 4, 0, 0]} name="Invoiced Revenue" />
                      <Bar dataKey="Profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Margin Yield" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Performing products list */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col">
                <div className="mb-4">
                  <h4 className="font-bold text-slate-800 text-sm">Product SKU Performance Dashboard</h4>
                  <p className="text-xs text-slate-400">Inventory sales yield ranks</p>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-72 pr-1">
                  {categoryShareData.length > 0 ? (
                    categoryShareData.map((item, index) => {
                      const totalRevMax = Math.max(...categoryShareData.map(o => o.Revenue)) || 1;
                      const pct = (item.Revenue / totalRevMax) * 100;
                      return (
                        <div key={item.name} className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-700">{item.name}</span>
                            <span className="font-bold text-slate-800 font-mono">${item.Revenue.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500" 
                              style={{ 
                                width: `${pct}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-slate-400 text-xs">No product parameters loaded.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: FINANCIAL */}
          {activeTab === "financial" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
              {/* Invoiced vs Gross profits margin analysis */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col">
                <div className="mb-6">
                  <h4 className="font-bold text-slate-800 text-sm font-sans">Quarterly Financial Cost vs Margin Index</h4>
                  <p className="text-xs text-slate-400 font-sans">Evaluating revenue versus pipeline operational costs</p>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ background: "#1e293b", color: "#f8fafc", borderRadius: "10px", fontSize: "11px", border: "none" }}
                        formatter={(val) => [`$${Number(val).toLocaleString()}`]}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Bar dataKey="Revenue" fill="#0284c7" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                      <Bar dataKey="Cost" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Operational Cost ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Financial Key Margin ledger list */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col">
                <div className="mb-4">
                  <h4 className="font-bold text-slate-800 text-sm">Corporate Profitability Ledger</h4>
                  <p className="text-xs text-slate-400">Chronological list of yield indices</p>
                </div>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-semibold uppercase text-[9px] border-b border-slate-100">
                      <th className="p-3">Period</th>
                      <th className="p-3 text-right">Invoiced Sales</th>
                      <th className="p-3 text-right">Raw Margin</th>
                      <th className="p-3 text-right">% Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                    {monthlyRevenueData.map((row) => {
                      const marginPct = row.Revenue > 0 ? (row.Profit / row.Revenue) * 100 : 0;
                      return (
                        <tr key={row.name} className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-700">{row.name}</td>
                          <td className="p-3 text-right font-mono text-slate-800 font-semibold">${row.Revenue.toLocaleString()}</td>
                          <td className="p-3 text-right font-mono text-emerald-600 font-bold">${row.Profit.toLocaleString()}</td>
                          <td className="p-3 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              marginPct > 75 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}>
                              {marginPct.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
