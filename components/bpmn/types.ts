export type BPMNNodeType =
  | "START"
  | "END"
  | "TASK"
  | "USER_TASK"
  | "SYSTEM_TASK"
  | "DECISION_GATEWAY"
  | "PARALLEL_GATEWAY"
  | "TIMER"
  | "NOTIFICATION"
  | "SLA_CHECKPOINT"
  | "ESCALATION"
  | "CUSTOMER_TOUCHPOINT"
  | "CUSTOMER_ACTION";

export interface BPMNNodeMetadata {
  owner: string;
  description: string;
  sla: string;
  systems: string[];
  risks?: string;
  bottlenecks?: string;
  aiInsights?: string;
  input?: string;
  output?: string;
  notes?: string;
}

export interface BPMNNode {
  id: string;
  type: BPMNNodeType;
  title: string;
  laneId: string;
  x: number;
  y: number;
  metadata: BPMNNodeMetadata;
}

export type ConnectionSLAStatus = "STABLE" | "WARNING" | "CRITICAL";

export interface BPMNConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
  type?: "DEFAULT" | "CONDITIONAL" | "ASSOCIATION";
  slaStatus?: ConnectionSLAStatus;
}

export interface SwimlaneType {
  id: string;
  name: string;
  color: string;
  height: number;
}

export interface BPMNDiagramData {
  diagramId: string;
  version: string;
  mode: "AS_IS" | "TO_BE";
  swimlanes: SwimlaneType[];
  nodes: BPMNNode[];
  connections: BPMNConnection[];
}

export interface VersionHistoryItem {
  version: string;
  date: string;
  author: string;
  changeLog: string;
  status: "DRAFT" | "PUBLISHED";
}
