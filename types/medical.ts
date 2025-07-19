export interface StudySummary {
  id: string
  title: string
  date: string
  journal: string
  abstract: string
  verdict: string
  effectiveness: "effective" | "not-effective" | "mixed"
  safety: "safe" | "caution" | "unsafe"
  targetPopulation: string
  citationUrl: string
  studyType: "RCT" | "Meta-analysis" | "Cohort" | "Case Study"
  region: string
  keyTakeaway?: string // Added for Explainability Layer
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  studies?: StudySummary[]
}

export interface PhysicianProfile {
  id: string
  name: string
  specialty: string
  institution: string
  licenseNumber: string
}

export interface SavedConsultation {
  id: string
  title: string
  date: Date
  messageCount: number
  lastMessage: string
}

export type FilterOptions = {
  dateRange: "last-year" | "last-2-years" | "last-5-years" | "all"
  studyType: "all" | "RCT" | "Meta-analysis" | "Cohort" | "Case Study"
  region: "all" | "North America" | "Europe" | "Asia" | "Global"
}
