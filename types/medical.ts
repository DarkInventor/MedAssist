export interface StudySummary {
  id: string
  title: string
  date?: string
  journal: string
  abstract: string
  verdict?: string
  effectiveness?: "effective" | "not-effective" | "mixed"
  safety?: "safe" | "caution" | "unsafe"
  targetPopulation?: string
  citationUrl?: string
  url?: string  // URL to the full study
  authors?: string  // Authors list as string
  year?: number | string  // Publication year
  doi?: string  // DOI identifier
  pmid?: string  // PubMed ID
  studyType: "RCT" | "Meta-analysis" | "Cohort" | "Case Study" | "Systematic Review" | string
  region?: string
  keyTakeaway?: string
  qualityScore?: number
  sampleSize?: number | string
  publicationStatus?: "peer-reviewed" | "preprint" | "conference"
  findings?: string[]  // Key findings from the study
  methodology?: string  // Study methodology
  significance?: string  // Statistical significance
  relevanceScore?: number  // Relevance to the query
  canadianRelevance?: string  // Relevance to Canadian healthcare
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
  studyType: "all" | "RCT" | "Meta-analysis" | "Cohort" | "Case Study" | "Systematic Review" | "Clinical Trial" | "Observational Study"
  region: "all" | "North America" | "Europe" | "Asia" | "Global" | "Canada"
  publicationStatus: "all" | "peer-reviewed" | "preprint"
  minQualityScore?: number // 0-10 scale
  includePreprints: boolean
}

export interface PatientContext {
  ageRange?: "18-30" | "31-45" | "46-60" | "61-75" | "75+" | string
  gender?: "male" | "female" | "other" | "not-specified"
  conditions?: string[]
  medications?: string[]
  allergies?: string[]
  isAnonymized: boolean
  additionalNotes?: string
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
