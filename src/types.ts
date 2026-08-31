/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PipelineNode {
  id: string;
  label: string;
  type: "source" | "cleaning" | "transformation" | "destination";
  status: "idle" | "running" | "success" | "error";
  description: string;
  outputs?: string;
}

export interface PipelineLog {
  timestamp: string;
  level: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  message: string;
}

export interface DeltaTable {
  name: string;
  layer: "Bronze" | "Silver" | "Gold";
  columns: string[];
  rowCount: number;
  sizeKb: number;
}

export interface SchemaField {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  foreignKeyTarget?: string;
  description: string;
}

export interface StarSchemaTable {
  id: string;
  name: string;
  type: "Fact" | "Dimension";
  fields: SchemaField[];
  position: { x: number; y: number };
}

export interface StarSchemaRelation {
  fromTable: string;
  fromField: string;
  toTable: string;
  toField: string;
}

export interface SqlQuery {
  id: string;
  name: string;
  description: string;
  code: string;
  expectedHeaders: string[];
  expectedRows: any[][];
  chartConfig?: {
    type: "bar" | "line" | "area";
    xKey: string;
    yKeys: string[];
  };
}

export interface NotebookCell {
  id: string;
  type: "markdown" | "code";
  content: string;
  status: "idle" | "running" | "success" | "error";
  output?: {
    text?: string;
    chartData?: any[];
    chartConfig?: {
      type: "bar" | "line" | "scatter";
      xKey: string;
      yKeys: string[];
    };
  };
}

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface InteractiveDataRecord {
  id: string;
  date: string;
  customerName: string;
  segment: "High-Value" | "Loyal" | "Frequent" | "At-Risk";
  product: string;
  category: "Software" | "Hardware" | "Cloud Services" | "Support";
  region: "North" | "South" | "East" | "West";
  revenue: number;
  cost: number;
  profit: number;
  units: number;
  rating: number; // Customer Satisfaction Rating (1-5)
  churnRisk: number; // 0 to 1 percentage
}
