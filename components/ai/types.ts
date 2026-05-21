export interface AITranscript {
  id: string;
  fileName: string;
  fileSize: string;
  meetingTitle: string;
  department: string;
  processTag?: string;
  uploadedAt: string;
  content: string;
}

export interface BottleneckDetail {
  id: string;
  step: string;
  lane: string;
  delay: string;
  impact: string;
  mitigation: string;
}

export interface RiskDetail {
  id: string;
  risk: string;
  severity: "EXTREME" | "HIGH" | "MEDIUM";
  mitigation: string;
  checked?: boolean;
}

export interface ProcessStep {
  id: string;
  title: string;
  lane: string;
  mode: "AS_IS" | "TO_BE";
  type: string;
  x?: number;
  y?: number;
}

export interface AIRecommendation {
  id: string;
  title: string;
  owner: string;
  steps: string[];
}

export interface AIAnalysisReport {
  id: string;
  transcriptId: string;
  healthScore: number;
  maturityLevel: string;
  summary: string;
  verdict: string;
  bottlenecks: BottleneckDetail[];
  risks: RiskDetail[];
  processSteps: ProcessStep[];
  recommendations: AIRecommendation[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  referenceId?: string;
}
