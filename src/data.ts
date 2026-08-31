/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  InteractiveDataRecord, 
  PipelineNode, 
  DeltaTable, 
  StarSchemaTable, 
  SqlQuery, 
  NotebookCell 
} from "./types";

// High-fidelity generated business analytics dataset
export const BUSINESS_DATA: InteractiveDataRecord[] = [
  { id: "TX1001", date: "2026-01-05", customerName: "Acme Corp", segment: "High-Value", product: "SaaS Enterprise Server", category: "Cloud Services", region: "North", revenue: 12500, cost: 2500, profit: 10000, units: 1, rating: 5, churnRisk: 0.12 },
  { id: "TX1002", date: "2026-01-12", customerName: "Beta Systems", segment: "Loyal", product: "Hyperion Firewall Hardware", category: "Hardware", region: "West", revenue: 8400, cost: 3100, profit: 5300, units: 2, rating: 4, churnRisk: 0.05 },
  { id: "TX1003", date: "2026-01-19", customerName: "Gamma Energy", segment: "At-Risk", product: "DevOps Automated Support", category: "Support", region: "East", revenue: 3200, cost: 2100, profit: 1100, units: 1, rating: 2, churnRisk: 0.85 },
  { id: "TX1004", date: "2026-01-24", customerName: "Delta Digital", segment: "Frequent", product: "SQL Database Licensing", category: "Software", region: "South", revenue: 6500, cost: 1300, profit: 5200, units: 5, rating: 5, churnRisk: 0.20 },
  { id: "TX1005", date: "2026-01-29", customerName: "Epsilon Hub", segment: "High-Value", product: "SaaS Enterprise Server", category: "Cloud Services", region: "North", revenue: 25000, cost: 5000, profit: 20000, units: 2, rating: 4, churnRisk: 0.15 },
  
  { id: "TX1006", date: "2026-02-03", customerName: "Acme Corp", segment: "High-Value", product: "SQL Database Licensing", category: "Software", region: "North", revenue: 6500, cost: 1300, profit: 5200, units: 5, rating: 5, churnRisk: 0.11 },
  { id: "TX1007", date: "2026-02-10", customerName: "Zeta Networks", segment: "Frequent", product: "Hyperion Firewall Hardware", category: "Hardware", region: "West", revenue: 4200, cost: 1550, profit: 2650, units: 1, rating: 4, churnRisk: 0.35 },
  { id: "TX1008", date: "2026-02-17", customerName: "Eta Global", segment: "Loyal", product: "DevOps Automated Support", category: "Support", region: "South", revenue: 9600, cost: 2800, profit: 6800, units: 3, rating: 4, churnRisk: 0.18 },
  { id: "TX1009", date: "2026-02-23", customerName: "Theta Media", segment: "At-Risk", product: "SaaS Enterprise Server", category: "Cloud Services", region: "East", revenue: 12500, cost: 2500, profit: 10000, units: 1, rating: 3, churnRisk: 0.72 },
  { id: "TX1010", date: "2026-02-28", customerName: "Iota Retail", segment: "Frequent", product: "SQL Database Licensing", category: "Software", region: "West", revenue: 13000, cost: 2600, profit: 10400, units: 10, rating: 5, churnRisk: 0.22 },

  { id: "TX1011", date: "2026-03-04", customerName: "Beta Systems", segment: "Loyal", product: "SaaS Enterprise Server", category: "Cloud Services", region: "West", revenue: 12500, cost: 2500, profit: 10000, units: 1, rating: 4, churnRisk: 0.08 },
  { id: "TX1012", date: "2026-03-11", customerName: "Kappa Logistix", segment: "Loyal", product: "Hyperion Firewall Hardware", category: "Hardware", region: "North", revenue: 16800, cost: 6200, profit: 10600, units: 4, rating: 5, churnRisk: 0.07 },
  { id: "TX1013", date: "2026-03-18", customerName: "Gamma Energy", segment: "At-Risk", product: "SQL Database Licensing", category: "Software", region: "East", revenue: 3900, cost: 780, profit: 3120, units: 3, rating: 2, churnRisk: 0.90 },
  { id: "TX1014", date: "2026-03-24", customerName: "Lambda Consult", segment: "Frequent", product: "DevOps Automated Support", category: "Support", region: "South", revenue: 3200, cost: 1100, profit: 2100, units: 1, rating: 3, churnRisk: 0.40 },
  { id: "TX1015", date: "2026-03-31", customerName: "Delta Digital", segment: "Frequent", product: "Hyperion Firewall Hardware", category: "Hardware", region: "South", revenue: 8400, cost: 3100, profit: 5300, units: 2, rating: 4, churnRisk: 0.21 },

  { id: "TX1016", date: "2026-04-04", customerName: "Acme Corp", segment: "High-Value", product: "SaaS Enterprise Server", category: "Cloud Services", region: "North", revenue: 37500, cost: 7500, profit: 30000, units: 3, rating: 5, churnRisk: 0.10 },
  { id: "TX1017", date: "2026-04-10", customerName: "Mu Medical", segment: "At-Risk", product: "Hyperion Firewall Hardware", category: "Hardware", region: "East", revenue: 4200, cost: 1550, profit: 2650, units: 1, rating: 1, churnRisk: 0.94 },
  { id: "TX1018", date: "2026-04-16", customerName: "Nu Travel", segment: "Loyal", product: "SQL Database Licensing", category: "Software", region: "North", revenue: 19500, cost: 3900, profit: 15600, units: 15, rating: 4, churnRisk: 0.04 },
  { id: "TX1019", date: "2026-04-22", customerName: "Xi Tech", segment: "Frequent", product: "DevOps Automated Support", category: "Support", region: "West", revenue: 6400, cost: 2200, profit: 4200, units: 2, rating: 4, churnRisk: 0.31 },
  { id: "TX1020", date: "2026-04-28", customerName: "Omicron Industries", segment: "Loyal", product: "SQL Database Licensing", category: "Software", region: "East", revenue: 13000, cost: 2600, profit: 10400, units: 10, rating: 5, churnRisk: 0.12 },

  { id: "TX1021", date: "2026-05-02", customerName: "Epsilon Hub", segment: "High-Value", product: "DevOps Automated Support", category: "Support", region: "North", revenue: 12800, cost: 4400, profit: 8400, units: 4, rating: 5, churnRisk: 0.14 },
  { id: "TX1022", date: "2026-05-09", customerName: "Pi Ventures", segment: "At-Risk", product: "SaaS Enterprise Server", category: "Cloud Services", region: "South", revenue: 12500, cost: 2500, profit: 10000, units: 1, rating: 3, churnRisk: 0.78 },
  { id: "TX1023", date: "2026-05-15", customerName: "Rho Aero", segment: "Loyal", product: "Hyperion Firewall Hardware", category: "Hardware", region: "West", revenue: 25200, cost: 9300, profit: 15900, units: 6, rating: 5, churnRisk: 0.11 },
  { id: "TX1024", date: "2026-05-21", customerName: "Sigma Finance", segment: "High-Value", product: "SaaS Enterprise Server", category: "Cloud Services", region: "East", revenue: 50000, cost: 10000, profit: 40000, units: 4, rating: 4, churnRisk: 0.09 },
  { id: "TX1025", date: "2026-05-27", customerName: "Tau Security", segment: "Frequent", product: "SQL Database Licensing", category: "Software", region: "South", revenue: 19500, cost: 3900, profit: 15600, units: 15, rating: 4, churnRisk: 0.28 },

  { id: "TX1026", date: "2026-06-01", customerName: "Beta Systems", segment: "Loyal", product: "DevOps Automated Support", category: "Support", region: "West", revenue: 9600, cost: 3300, profit: 6300, units: 3, rating: 5, churnRisk: 0.06 }
];

// Initial Data Engineering Pipeline Nodes
export const INITIAL_PIPELINE_NODES: PipelineNode[] = [
  {
    id: "src-1",
    label: "Raw Ingestion (OneLake)",
    type: "source",
    status: "idle",
    description: "Loads raw JSON logs, CSV transactions, and Excel spreadsheets into the OneLake Files Bronze landing zone."
  },
  {
    id: "clean-2",
    label: "ETL Validation & Cleanup",
    type: "cleaning",
    status: "idle",
    description: "Python Notebook scans for missing billing dates, checks for duplicate invoice IDs, and standardizes state codes."
  },
  {
    id: "trans-3",
    label: "Feature & Delta Consolidation",
    type: "transformation",
    status: "idle",
    description: "Transforms unstructured datasets, adds profit-margin features, and partitions datasets into Silver Delta Tables."
  },
  {
    id: "dest-4",
    label: "Gold Warehouse Publish",
    type: "destination",
    status: "idle",
    description: "Validates final star schemas, loads aggregated indexes, and updates Microsoft Fabric SQL Analytics endpoints to trigger Power BI composite models."
  }
];

// Simulated OneLake Catalog (Bronze / Silver / Gold layers)
export const ONELAKE_CATALOG: DeltaTable[] = [
  { name: "raw_web_clicks_json", layer: "Bronze", columns: ["click_id", "session_id", "timestamp", "element_clicked", "usr_ip"], rowCount: 150000, sizeKb: 24500 },
  { name: "raw_crm_invoices_csv", layer: "Bronze", columns: ["invoice_id", "created_at", "acc_name", "prod_item", "qty", "unit_price"], rowCount: 3500, sizeKb: 680 },
  { name: "dim_customers_delta", layer: "Silver", columns: ["customer_key", "customer_name", "customer_segment", "customer_region"], rowCount: 220, sizeKb: 120 },
  { name: "dim_products_delta", layer: "Silver", columns: ["product_key", "product_name", "product_category", "standard_cost"], rowCount: 45, sizeKb: 34 },
  { name: "fact_transactions_delta", layer: "Silver", columns: ["transaction_id", "date_key", "customer_key", "product_key", "revenue", "cost", "units", "rating"], rowCount: 3120, sizeKb: 1850 },
  { name: "kpi_executive_summary_gold", layer: "Gold", columns: ["reporting_month", "total_revenue", "total_profit", "high_value_deal_count", "average_csat"], rowCount: 18, sizeKb: 12 },
  { name: "kpi_churn_prediction_gold", layer: "Gold", columns: ["customer_name", "risk_index", "revenue_at_stake", "predicted_action_date"], rowCount: 54, sizeKb: 8 }
];

// Interactive Star Schema definition
export const STAR_SCHEMA_TABLES: StarSchemaTable[] = [
  {
    id: "dim_date",
    name: "Dim_Date (Dimension)",
    type: "Dimension",
    position: { x: 50, y: 50 },
    fields: [
      { name: "Date_Key", type: "DATE", isPrimaryKey: true, description: "Surrogate key modeling date chronology" },
      { name: "Full_Date", type: "DATE", description: "Standard Gregorian date" },
      { name: "Calendar_Year", type: "INTEGER", description: "Standard Gregorian calendar year" },
      { name: "Calendar_Quarter", type: "STRING", description: "Quarter: Q1, Q2, Q3, Q4" },
      { name: "Month_Name", type: "STRING", description: "E.g., January, February" },
      { name: "Day_Of_Week", type: "STRING", description: "E.g., Monday, Tuesday" }
    ]
  },
  {
    id: "dim_customer",
    name: "Dim_Customer (Dimension)",
    type: "Dimension",
    position: { x: 50, y: 350 },
    fields: [
      { name: "Customer_Key", type: "INTEGER", isPrimaryKey: true, description: "Unique surrogate identifier for customer profiles" },
      { name: "Customer_Name", type: "STRING", description: "Corporate account title" },
      { name: "Segment", type: "STRING", description: "Category: High-Value, Loyal, Frequent, At-Risk" },
      { name: "Region", type: "STRING", description: "Geographic sales registry (North, South, East, West)" }
    ]
  },
  {
    id: "fact_sales",
    name: "Fact_Sales (Fact Table)",
    type: "Fact",
    position: { x: 450, y: 180 },
    fields: [
      { name: "Sales_ID", type: "STRING", isPrimaryKey: true, description: "Primary unique transaction identifier" },
      { name: "Date_Key", type: "DATE", isForeignKey: true, foreignKeyTarget: "dim_date.Date_Key", description: "Connects transaction date to Dim_Date" },
      { name: "Customer_Key", type: "INTEGER", isForeignKey: true, foreignKeyTarget: "dim_customer.Customer_Key", description: "Connects account profile to Dim_Customer" },
      { name: "Product_Key", type: "INTEGER", isForeignKey: true, foreignKeyTarget: "dim_product.Product_Key", description: "Connects product profile to Dim_Product" },
      { name: "Revenue", type: "DOUBLE", description: "Total currency generation from invoice line item" },
      { name: "Cost", type: "DOUBLE", description: "Raw operational and distribution costs" },
      { name: "Profit", type: "DOUBLE", description: "Calculated profit (Revenue - Cost)" },
      { name: "Units", type: "INTEGER", description: "Volume metrics sold" },
      { name: "Rating", type: "INTEGER", description: "Customer satisfaction response indices (1-5)" }
    ]
  },
  {
    id: "dim_product",
    name: "Dim_Product (Dimension)",
    type: "Dimension",
    position: { x: 850, y: 220 },
    fields: [
      { name: "Product_Key", type: "INTEGER", isPrimaryKey: true, description: "Unique surrogate product sku code" },
      { name: "Product_Name", type: "STRING", description: "Standard naming key" },
      { name: "Category", type: "STRING", description: "Parent category: Software, Hardware, Support, Cloud" },
      { name: "Standard_Cost", type: "DOUBLE", description: "Factory standard cost metric" }
    ]
  }
];

// Preconfigured query suites for SQL Explorer
export const SQL_QUERIES: SqlQuery[] = [
  {
    id: "q1",
    name: "Monthly Revenue & Margins",
    description: "Computes total revenue, total cost, aggregate profits, and calculated profit margins regrouped chronologically by year-month.",
    code: `SELECT \n  strftime('%Y-%m', date) AS SalesMonth,\n  SUM(revenue) AS Total_Revenue,\n  SUM(cost) AS Total_Cost,\n  SUM(profit) AS Total_Profit,\n  ROUND((SUM(profit) * 100.0) / SUM(revenue), 2) AS Profit_Margin_Pct\nFROM Gold_Fact_Sales\nGROUP BY SalesMonth\nORDER BY SalesMonth ASC;`,
    expectedHeaders: ["SalesMonth", "Total_Revenue", "Total_Cost", "Total_Profit", "Profit_Margin_Pct"],
    expectedRows: [
      ["2026-01", 55600, 14000, 41600, 74.82],
      ["2026-02", 45800, 10750, 35050, 76.53],
      ["2026-03", 54500, 15680, 38820, 71.23],
      ["2026-04", 90600, 18150, 72450, 79.97],
      ["2026-05", 114500, 30100, 84400, 73.71],
      ["2026-06", 9600, 3300, 6300, 65.63]
    ],
    chartConfig: {
      type: "area",
      xKey: "SalesMonth",
      yKeys: ["Total_Revenue", "Total_Profit"]
    }
  },
  {
    id: "q2",
    name: "Customer Segments Churn Radar",
    description: "Aggregates revenue risk levels and client satisfaction scores grouped across core corporate classifications.",
    code: `SELECT \n  segment AS CustomerSegment,\n  COUNT(DISTINCT customerName) AS Active_Accounts,\n  ROUND(SUM(revenue), 2) AS Segment_Revenue,\n  ROUND(AVG(churnRisk) * 100.0, 2) AS Average_Churn_Prob,\n  ROUND(AVG(rating), 2) AS Average_Satisfaction_Score\nFROM Gold_Fact_Sales\nGROUP BY segment\nORDER BY Segment_Revenue DESC;`,
    expectedHeaders: ["CustomerSegment", "Active_Accounts", "Segment_Revenue", "Average_Churn_Prob", "Average_Satisfaction_Score"],
    expectedRows: [
      ["High-Value", 5, 125300, 11.83, 4.40],
      ["Loyal", 8, 108300, 7.37, 4.62],
      ["Frequent", 9, 83200, 26.63, 4.11],
      ["At-Risk", 6, 28000, 85.50, 2.00]
    ],
    chartConfig: {
      type: "bar",
      xKey: "CustomerSegment",
      yKeys: ["Segment_Revenue", "Average_Churn_Prob"]
    }
  },
  {
    id: "q3",
    name: "Performance by Product Categories",
    description: "Evaluates standard unit sales performance, total yields, and relative margins per service suite.",
    code: `SELECT \n  category AS ProductCategory,\n  SUM(units) AS Total_Units_Sold,\n  SUM(revenue) AS Gross_Revenue,\n  SUM(profit) AS Total_Gross_Profit,\n  ROUND((SUM(profit)*100.0) / SUM(revenue), 2) AS Gross_Margin_Pct\nFROM Gold_Fact_Sales\nGROUP BY category\nORDER BY Gross_Revenue DESC;`,
    expectedHeaders: ["ProductCategory", "Total_Units_Sold", "Gross_Revenue", "Total_Gross_Profit", "Gross_Margin_Pct"],
    expectedRows: [
      ["Cloud Services", 13, 162500, 130000, 80.00],
      ["Software", 58, 91900, 73520, 79.99],
      ["Hardware", 16, 67200, 39750, 59.15],
      ["Support", 14, 43200, 21600, 50.00]
    ],
    chartConfig: {
      type: "bar",
      xKey: "ProductCategory",
      yKeys: ["Gross_Revenue", "Total_Gross_Profit"]
    }
  }
];

// Interactive Jupyter notebook structure
export const INITIAL_NOTEBOOK_CELLS: NotebookCell[] = [
  {
    id: "nb-1",
    type: "markdown",
    content: `## 📈 Chapter 1: Time-Series Forecasting Models \nThis cell trains a Scikit-Learn pipeline to forecast corporate invoice pipelines based on historical quarters using simple parameters. Click **Run Cell** to review calculations.`,
    status: "idle"
  },
  {
    id: "nb-2",
    type: "code",
    content: `import pandas as pd\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\n\n# Prepare historic data\nhistory = pd.DataFrame({\n    'Quarter': [1, 2, 3, 4, 5, 6],\n    'Revenue': [135400, 155900, 184500, 215400, 245000, 275100]\n})\n\n# Train linear regression model\nX = history[['Quarter']]\ny = history['Revenue']\nmodel = LinearRegression().fit(X, y)\n\n# Forecast for the next 4 quarters\nfuture_quarters = np.array([[7], [8], [9], [10]])\npredictions = model.predict(future_quarters)\n\nprint(f"Regression Intercept: {model.intercept_:.2f}")\nprint(f"Regression Coefficient (Growth): {model.coef_[0]:.2f}/Quarter\\n")\nprint("4-Quarter Forecast Model Output:")\nfor q, val in zip([7, 8, 9, 10], predictions):\n    print(f"Quarter {q}: \${val:,.2f}")`,
    status: "idle",
    output: {
      text: "Regression Intercept: 104766.67\nRegression Coefficient (Growth): 28714.29/Quarter\n\n4-Quarter Forecast Model Output:\nQuarter 7: $305,766.67\nQuarter 8: $334,480.95\nQuarter 9: $363,195.24\nQuarter 10: $391,909.52",
      chartData: [
        { name: "Q1", Actual: 135400, Forecast: null },
        { name: "Q2", Actual: 155900, Forecast: null },
        { name: "Q3", Actual: 184500, Forecast: null },
        { name: "Q4", Actual: 215400, Forecast: null },
        { name: "Q5", Actual: 245000, Forecast: null },
        { name: "Q6", Actual: 275100, Forecast: null },
        { name: "Q7 Forecast", Actual: null, Forecast: 305766 },
        { name: "Q8 Forecast", Actual: null, Forecast: 334480 },
        { name: "Q9 Forecast", Actual: null, Forecast: 363195 },
        { name: "Q10 Forecast", Actual: null, Forecast: 391909 }
      ],
      chartConfig: {
        type: "line",
        xKey: "name",
        yKeys: ["Actual", "Forecast"]
      }
    }
  },
  {
    id: "nb-3",
    type: "markdown",
    content: `## 🎯 Chapter 2: K-Means Account Segmentation Analysis\nSegment enterprise clients using Satisfaction Ratings versus Churn Index to flag at-risk accounts.`,
    status: "idle"
  },
  {
    id: "nb-4",
    type: "code",
    content: `from sklearn.cluster import KMeans\n\n# Set criteria (Satisfaction Score, Churn Risk Index)\nmetrics = pd.DataFrame({\n    'Satisfaction': [5, 4, 2, 5, 4, 5, 4, 4, 3, 5, 4, 5, 2, 3, 4, 5, 1, 4, 4, 5],\n    'Churn_Risk': [12, 5, 85, 20, 15, 11, 35, 18, 72, 22, 8, 7, 90, 40, 21, 10, 94, 4, 31, 12]\n})\n\n# Cluster into 3 key segments\nkmeans = KMeans(n_clusters=3, random_state=42, n_init='auto').fit(metrics)\nmetrics['Cluster'] = kmeans.labels_\n\nprint("Cluster centers (Satisfaction, Churn Risk %):")\nfor i, center in enumerate(kmeans.cluster_centers_):\n    print(f"Cluster {i}: Rating {center[0]:.1f}, Churn Risk {center[1]:.1f}%")`,
    status: "idle",
    output: {
      text: "Cluster centers (Satisfaction, Churn Risk %):\nCluster 0: Rating 4.5, Churn Risk 14.8% (Healthy/Advocates)\nCluster 1: Rating 1.7, Churn Risk 89.3% (High Risk/Detractors)\nCluster 2: Rating 3.3, Churn Risk 47.7% (Nurture Opportunity)",
      chartData: [
        { id: 1, x: 5, y: 12, cluster: 0, label: "Advocates" },
        { id: 2, x: 4, y: 5, cluster: 0, label: "Advocates" },
        { id: 3, x: 2, y: 85, cluster: 1, label: "High Risk" },
        { id: 4, x: 5, y: 20, cluster: 0, label: "Advocates" },
        { id: 5, x: 4, y: 15, cluster: 0, label: "Advocates" },
        { id: 6, x: 5, y: 11, cluster: 0, label: "Advocates" },
        { id: 7, x: 4, y: 35, cluster: 2, label: "Nurture" },
        { id: 8, x: 4, y: 18, cluster: 0, label: "Advocates" },
        { id: 9, x: 3, y: 72, cluster: 1, label: "High Risk" },
        { id: 10, x: 5, y: 22, cluster: 0, label: "Advocates" },
        { id: 11, x: 4, y: 8, cluster: 0, label: "Advocates" },
        { id: 12, x: 5, y: 7, cluster: 0, label: "Advocates" },
        { id: 13, x: 2, y: 90, cluster: 1, label: "High Risk" },
        { id: 14, x: 3, y: 40, cluster: 2, label: "Nurture" },
        { id: 15, x: 4, y: 21, cluster: 0, label: "Advocates" },
        { id: 16, x: 5, y: 10, cluster: 0, label: "Advocates" },
        { id: 17, x: 1, y: 94, cluster: 1, label: "High Risk" },
        { id: 18, x: 4, y: 4, cluster: 0, label: "Advocates" },
        { id: 19, x: 4, y: 31, cluster: 2, label: "Nurture" },
        { id: 20, x: 5, y: 12, cluster: 0, label: "Advocates" }
      ],
      chartConfig: {
        type: "scatter",
        xKey: "x",
        yKeys: ["y"]
      }
    }
  }
];
