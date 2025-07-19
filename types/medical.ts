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
  studyType: "RCT" | "Meta-analysis" | "Cohort" | "Case Study" | "Systematic Review"
  region: string
  keyTakeaway?: string
  qualityScore?: number
  sampleSize?: number
  publicationStatus: "peer-reviewed" | "preprint" | "conference"
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  studies?: StudySummary[]
  followUpSuggestions?: string[]
  auditId?: string
}

export interface PhysicianProfile {
  id: string
  name: string
  specialty: string
  institution: string
  licenseNumber: string
  preferences?: {
    preferredSources: string[]
    notificationSettings: boolean
    defaultFilters: FilterOptions
  }
}

export interface SavedConsultation {
  id: string
  title: string
  date: Date
  messageCount: number
  lastMessage: string
  specialty?: string
  tags?: string[]
  isBookmarked?: boolean
}

export interface SearchHistoryItem {
  id: string
  query: string
  timestamp: Date
  resultCount: number
  specialty: string
}

export interface AuditLogEntry {
  id: string
  userId: string
  action: "search" | "view_study" | "save_consultation" | "export"
  timestamp: Date
  details: string
  ipAddress?: string
}

export interface VoiceRecognitionState {
  isListening: boolean
  transcript: string
  confidence: number
  error?: string
}

export interface FilterOptions {
  dateRange: "last-year" | "last-2-years" | "last-5-years" | "all"
  studyType: "all" | "RCT" | "Meta-analysis" | "Cohort" | "Case Study" | "Systematic Review"
  region: "all" | "North America" | "Europe" | "Asia" | "Global"
  publicationStatus: "all" | "peer-reviewed" | "preprint"
  minQualityScore?: number
  includePreprints: boolean
}

export interface PatientContext {
  age?: string
  gender?: string
  conditions?: string[]
  medications?: string[]
  allergies?: string[]
  isAnonymized: boolean
}

export interface DataSource {
  name: string
  description: string
  lastUpdated: Date
  coverage: string
  url: string
}

export interface NotificationSettings {
  newStudyAlerts: boolean
  weeklyDigest: boolean
  safetyAlerts: boolean
  preferredTime: string
}
