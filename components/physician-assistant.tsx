"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  User,
  CheckCircle,
  AlertTriangle,
  Clock,
  BookOpen,
  Plus,
  Menu,
  X,
  ChevronRight,
  Filter,
  Upload,
  Bookmark,
  Search,
  Settings,
  MoreHorizontal,
  Download,
  Bell,
  History,
  Lightbulb,
  Share,
  FileDown,
  Heart,
  Star,
  TrendingUp,
  Eye,
  Mic,
  Copy,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AdvancedFilters } from "./advanced-filters"
import { PatientContextUpload } from "./patient-context"
import { VoiceInput } from "./voice-input"
import { PhysicianProfileSettings } from "./physician-profile"
import type { 
  ChatMessage, 
  StudySummary, 
  PhysicianProfile, 
  SavedConsultation, 
  FilterOptions,
  SearchHistoryItem,
  PatientContext
} from "../types/medical"

// Enhanced mock data with more comprehensive information
const mockPhysician: PhysicianProfile = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "General Practitioner",
  institution: "Toronto General Hospital",
  licenseNumber: "MD-12345",
  preferences: {
    preferredSources: ["PubMed/MEDLINE", "Cochrane Library", "ClinicalTrials.gov"],
    notificationSettings: true,
    defaultFilters: {
      dateRange: "last-2-years",
      studyType: "all",
      region: "all",
      publicationStatus: "peer-reviewed",
      includePreprints: false
    }
  }
}

const mockStudies: StudySummary[] = [
  {
    id: "1",
    title: "The impact of Intermittent Fasting on Hypertension: A Meta-Analysis",
    date: "January 2023",
    journal: "Journal of Hypertension, January 2023",
    abstract: "This meta-analysis of 12 randomized controlled trials examined the effects of intermittent fasting on blood pressure in adults with hypertension.",
    verdict: "Intermittent fasting was associated with a reduction in systolic blood pressure of approximately 7 mmHg among individuals with hypertension.",
    effectiveness: "effective",
    safety: "safe",
    targetPopulation: "45-60 year olds with mild hypertension",
    citationUrl: "https://pubmed.ncbi.nlm.nih.gov/example1",
    studyType: "Meta-analysis",
    region: "Global",
    qualityScore: 8.5,
    sampleSize: 2456,
    publicationStatus: "peer-reviewed",
    keyTakeaway: "Intermittent fasting shows promise in reducing blood pressure, particularly systolic BP, in adults with hypertension.",
  },
  {
    id: "2",
    title: "Efficacy of Intermittent Fasting in Middle-Aged Hypertensive Patients",
    date: "May 2024",
    journal: "Hypertension Research, May 2024",
    abstract: "A 12-week randomized controlled trial investigating the effects of 16:8 intermittent fasting on blood pressure control.",
    verdict: "Recent RCT data supports IF for mild hypertension in a specific age group, but cautions apply for certain medications.",
    effectiveness: "effective",
    safety: "caution",
    targetPopulation: "Adults with mild hypertension not on beta-blockers",
    citationUrl: "https://pubmed.ncbi.nlm.nih.gov/example2",
    studyType: "RCT",
    region: "North America",
    qualityScore: 9.1,
    sampleSize: 524,
    publicationStatus: "peer-reviewed",
    keyTakeaway: "Recent RCT data supports IF for mild hypertension in a specific age group, but cautions apply for certain medications.",
  },
  {
    id: "3",
    title: "Nutritional Interventions and Blood Pressure: An Overview",
    date: "March 2022",
    journal: "Current Hypertensive Reports, March 2022",
    abstract: "Safety analysis of intermittent fasting protocols in patients with hypertension.",
    verdict: "Not recommended for patients on beta-blockers without supervision.",
    effectiveness: "mixed",
    safety: "caution",
    targetPopulation: "Hypertensive patients on medication",
    citationUrl: "https://pubmed.ncbi.nlm.nih.gov/example3",
    studyType: "Cohort",
    region: "North America",
    qualityScore: 7.2,
    sampleSize: 1284,
    publicationStatus: "peer-reviewed",
    keyTakeaway: "Patients on beta-blockers require strict supervision if considering intermittent fasting due to potential adverse interactions.",
  },
]

const mockSavedConsultations: SavedConsultation[] = [
  {
    id: "1",
    title: "GLP-1 agonists for weight loss",
    date: new Date("2024-01-15"),
    messageCount: 8,
    lastMessage: "Any major side effects with semaglutide?",
    specialty: "Endocrinology",
    tags: ["diabetes", "weight-loss"],
    isBookmarked: true,
  },
  {
    id: "2",
    title: "Statins in elderly patients",
    date: new Date("2024-01-10"),
    messageCount: 5,
    lastMessage: "Dosage recommendations for patients over 75",
    specialty: "Cardiology",
    tags: ["cardiovascular", "elderly"],
    isBookmarked: false,
  },
  {
    id: "3",
    title: "ADHD medications in adults",
    date: new Date("2024-01-08"),
    messageCount: 12,
    lastMessage: "Drug interactions with stimulants",
    specialty: "Psychiatry",
    tags: ["adhd", "adult-psychiatry"],
    isBookmarked: true,
  },
]

const mockSearchHistory: SearchHistoryItem[] = [
  {
    id: "1",
    query: "Is there evidence for intermittent fasting in managing hypertension?",
    timestamp: new Date("2024-01-15T10:30:00"),
    resultCount: 3,
    specialty: "General Practitioner"
  },
  {
    id: "2", 
    query: "GLP-1 agonists cardiovascular outcomes",
    timestamp: new Date("2024-01-14T14:20:00"),
    resultCount: 5,
    specialty: "General Practitioner"
  },
  {
    id: "3",
    query: "Statin therapy elderly patients safety",
    timestamp: new Date("2024-01-13T09:15:00"),
    resultCount: 7,
    specialty: "General Practitioner"
  }
]

export function PhysicianAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "user",
      content: "Is there evidence for intermittent fasting in managing hypertension?",
      timestamp: new Date(),
    },
    {
      id: "2",
      role: "assistant",
      content: "Certainly, here is some evidence related to intermittent fasting for managing hypertension:",
      timestamp: new Date(),
      studies: mockStudies,
      followUpSuggestions: [
        "Any major side effects?",
        "What about patients on beta-blockers?",
        "Optimal fasting schedules for hypertension?",
        "Comparison with DASH diet effectiveness?"
      ],
    },
  ])
  
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "last-2-years",
    studyType: "all",
    region: "all",
    publicationStatus: "peer-reviewed",
    includePreprints: false,
  })
  const [patientContext, setPatientContext] = useState<PatientContext | null>(null)
  const [physician, setPhysician] = useState<PhysicianProfile>(mockPhysician)
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(mockSearchHistory)
  const [savedConsultations, setSavedConsultations] = useState<SavedConsultation[]>(mockSavedConsultations)
  const [activeTab, setActiveTab] = useState("new-search")

  const handleSendMessage = async (messageText?: string) => {
    const finalInput = messageText || input
    if (!finalInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: finalInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Add to search history
    const newSearchItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query: finalInput,
      timestamp: new Date(),
      resultCount: 0,
      specialty: physician.specialty
    }
    setSearchHistory(prev => [newSearchItem, ...prev.slice(0, 9)])

    // Simulate AI response with enhanced features
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on the latest medical literature and your query, here are the most relevant findings:",
        timestamp: new Date(),
        studies: mockStudies.slice(0, 2), // Show relevant studies
        followUpSuggestions: [
          "Are there any contraindications?",
          "What are the recommended protocols?",
          "How does this compare to standard treatments?",
          "Any recent safety updates?"
        ],
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript)
    // Auto-send voice messages
    setTimeout(() => handleSendMessage(transcript), 500)
  }

  const handleFollowUpClick = (suggestion: string) => {
    setInput(suggestion)
    handleSendMessage(suggestion)
  }

  const handleSaveConsultation = () => {
    const title = messages.find(m => m.role === "user")?.content.slice(0, 50) + "..." || "New Consultation"
    const newConsultation: SavedConsultation = {
      id: Date.now().toString(),
      title,
      date: new Date(),
      messageCount: messages.length,
      lastMessage: messages[messages.length - 1]?.content.slice(0, 100) || "",
      specialty: physician.specialty,
      tags: [],
      isBookmarked: false,
    }
    setSavedConsultations(prev => [newConsultation, ...prev])
  }

  const handleExportChat = () => {
    const exportData = {
      consultation: {
        date: new Date().toISOString(),
        physician: physician.name,
        specialty: physician.specialty,
        messages: messages,
        patientContext: patientContext,
        filters: filters
      }
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `clinical-consultation-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Left Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative z-50 w-80 bg-white flex flex-col transition-transform duration-300 ease-in-out lg:border-r border-gray-200`}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* Brand Header */}
        <div className="text-black leading-3 mx-[13px] px-3 py-4">
          <div className="flex items-center space-x-3 leading-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-black">OpenEvidence</h1>
              <p className="text-sm text-slate-500">Enterprise Clinical AI</p>
            </div>
          </div>
        </div>

        {/* Doctor Profile */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{physician.name}</h3>
                <p className="text-blue-700 text-sm font-medium">{physician.specialty}</p>
                <p className="text-gray-500 text-xs">{physician.institution}</p>
              </div>
            </div>
            <PhysicianProfileSettings 
              profile={physician} 
              onProfileUpdate={setPhysician}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 py-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="new-search" className="text-xs">New</TabsTrigger>
              <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
              <TabsTrigger value="saved" className="text-xs">Saved</TabsTrigger>
            </TabsList>

            <TabsContent value="new-search" className="mt-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-blue-700 bg-blue-50 hover:bg-blue-100 font-medium text-sm py-3 px-3 rounded-lg"
                onClick={() => {
                  setMessages([])
                  setInput("")
                }}
              >
                <Plus className="w-4 h-4 mr-3" />
                New Clinical Query
              </Button>
              
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3">Quick Start</p>
                <div className="space-y-1">
                  {[
                    "Latest hypertension guidelines",
                    "Diabetes medication updates",
                    "COVID-19 treatment protocols"
                  ].map((query, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:bg-gray-100 text-sm py-2 px-3 rounded-lg"
                      onClick={() => handleSendMessage(query)}
                    >
                      <Lightbulb className="w-3 h-3 mr-2" />
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4 space-y-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3">Recent Searches</p>
                {searchHistory.slice(0, 5).map((item) => (
                  <div key={item.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <p className="text-gray-700 text-sm truncate">{item.query}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {item.timestamp.toLocaleDateString()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {item.resultCount} results
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-4 space-y-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3">Saved Consultations</p>
                {savedConsultations.map((consultation) => (
                  <div key={consultation.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-700 font-medium text-sm truncate">{consultation.title}</p>
                        <p className="text-gray-500 text-xs mt-1">{consultation.date.toLocaleDateString()}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{consultation.messageCount} queries</span>
                          {consultation.isBookmarked && <Heart className="w-3 h-3 text-red-500 fill-current" />}
                        </div>
                      </div>
                    </div>
                    {consultation.tags && consultation.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {consultation.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-600"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Clinical Research Assistant</h2>
                <p className="text-gray-600 text-sm">AI-powered evidence synthesis for clinical decision making</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <AdvancedFilters 
                filters={filters} 
                onFiltersChange={setFilters}
                studyCount={mockStudies.length}
              />
              <PatientContextUpload 
                context={patientContext}
                onContextChange={setPatientContext}
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:bg-gray-100"
                onClick={handleExportChat}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:bg-gray-100"
                onClick={handleSaveConsultation}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4 md:p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Enhanced Disclaimer */}
                <Card className="border-l-4 border-l-amber-500 bg-amber-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-1">Clinical Decision Support Notice</h4>
                        <p className="text-amber-800 text-sm leading-relaxed">
                          This AI-generated evidence synthesis is for informational purposes only and does not process
                          patient data. Not a substitute for professional medical judgment, diagnosis, or treatment. 
                          Always verify with current clinical guidelines and consult colleagues when needed.
                        </p>
                        <div className="flex items-center space-x-4 mt-3 text-xs text-amber-700">
                          <span>HIPAA/PIPEDA Compliant</span>
                          <span>•</span>
                          <span>SOC 2 Certified</span>
                          <span>•</span>
                          <span>Audit Trail Enabled</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Patient Context Banner */}
                {patientContext && (
                  <Card className="border-l-4 border-l-green-500 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-green-900 mb-1">Patient Context Active</h4>
                          <p className="text-green-800 text-sm">
                            Research results are being personalized based on anonymized patient information
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setPatientContext(null)}
                          className="text-green-700 hover:bg-green-100"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {messages.map((message) => (
                  <div key={message.id}>
                    {message.role === "user" && (
                      <div className="flex justify-end mb-4">
                        <Card className="max-w-[80%] bg-blue-600 text-white">
                          <CardContent className="p-4">
                            <p className="font-medium">{message.content}</p>
                            <p className="text-blue-100 text-xs mt-2">{message.timestamp.toLocaleTimeString()}</p>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {message.role === "assistant" && (
                      <div className="mb-6">
                        <Card className="shadow-sm">
                          <CardHeader className="pb-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                                <Search className="w-3 h-3 text-white" />
                              </div>
                              <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                Evidence Analysis
                              </CardTitle>
                              <Badge variant="outline" className="ml-auto">
                                {message.studies?.length || 0} Studies Found
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-900 font-medium mb-6">{message.content}</p>

                            {message.studies && (
                              <div className="space-y-6">
                                {message.studies.map((study, index) => (
                                  <div key={study.id} className="border-l-4 border-l-gray-200 pl-6">
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex items-start space-x-3">
                                        {study.effectiveness === "effective" ? (
                                          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                        ) : (
                                          <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                                        )}
                                        <div className="flex-1">
                                          <h4 className="font-semibold text-gray-900 text-base leading-tight">
                                            {study.title}
                                          </h4>
                                          <p className="text-gray-600 text-sm mt-1">{study.journal}</p>
                                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                            <span>{study.sampleSize?.toLocaleString()} participants</span>
                                            <span>Quality: {study.qualityScore}/10</span>
                                            <span>{study.publicationStatus}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex flex-col space-y-2 ml-4">
                                        <div className="flex space-x-2">
                                          <Badge
                                            className={`text-xs font-medium ${
                                              study.effectiveness === "effective"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-amber-100 text-amber-800"
                                            }`}
                                          >
                                            {study.effectiveness}
                                          </Badge>
                                          <Badge variant="outline" className="text-xs font-medium">
                                            {study.studyType}
                                          </Badge>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                          <span className="text-xs text-gray-600">{study.qualityScore}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed mb-3">{study.verdict}</p>

                                    {study.keyTakeaway && (
                                      <Card className="bg-blue-50 border-blue-200 mb-4">
                                        <CardContent className="p-3">
                                          <p className="text-blue-900 text-sm">
                                            <span className="font-semibold">Clinical Significance:</span>{" "}
                                            {study.keyTakeaway}
                                          </p>
                                        </CardContent>
                                      </Card>
                                    )}

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 space-y-2 sm:space-y-0">
                                      <p className="text-gray-500 text-sm">
                                        <span className="font-medium">Target Population:</span> {study.targetPopulation}
                                      </p>
                                      <div className="flex items-center space-x-3">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-medium"
                                          onClick={() => window.open(study.citationUrl, "_blank")}
                                        >
                                          <ExternalLink className="w-4 h-4 mr-1" />
                                          View Study
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                                          <Bookmark className="w-4 h-4 mr-1" />
                                          Save
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                                          <Copy className="w-4 h-4 mr-1" />
                                          Cite
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Follow-up Suggestions */}
                            {message.followUpSuggestions && message.followUpSuggestions.length > 0 && (
                              <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                  <Lightbulb className="w-4 h-4 mr-2" />
                                  Suggested Follow-up Questions
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {message.followUpSuggestions.map((suggestion, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className="justify-start text-left h-auto py-2 px-3 hover:bg-blue-50 hover:border-blue-200"
                                      onClick={() => handleFollowUpClick(suggestion)}
                                    >
                                      <ArrowRight className="w-3 h-3 mr-2 flex-shrink-0" />
                                      <span className="text-sm">{suggestion}</span>
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <Card className="shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <div>
                            <p className="text-gray-900 font-semibold">Analyzing Medical Literature</p>
                            <p className="text-gray-600 text-sm">
                              Searching through latest research papers and clinical trials
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Input Area */}
            <div className="bg-white border-t border-gray-200 p-3 sm:p-4 md:p-6">
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a clinical question or start a new evidence search..."
                    className="w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base py-3 px-4 sm:px-6 rounded-2xl shadow-sm pr-24 sm:pr-32 transition-all resize-none min-h-[50px] max-h-[120px]"
                    rows={2}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                    <VoiceInput 
                      onTranscript={handleVoiceTranscript}
                      disabled={isLoading}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!input.trim() || isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-3 sm:px-4 py-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-gray-500">
                    Press Enter to send • Powered by advanced medical AI • Always verify with clinical guidelines
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{input.length}/2000</span>
                    {patientContext && (
                      <Badge variant="outline" className="text-xs">
                        Context Active
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Sidebar - Evidence Stack */}
          <div className="hidden xl:flex w-80 bg-white border-l border-gray-200 flex-col">
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Evidence Stack</h3>
                <Badge variant="outline" className="text-gray-600 font-medium">
                  {mockStudies.length} Studies
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mt-1">Latest research findings</p>
            </div>

            <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
              {mockStudies.map((study, index) => (
                <Card key={study.id} className="hover:shadow-md cursor-pointer transition-all border-l-4 border-l-blue-200 hover:border-l-blue-500">
                  <CardContent className="p-4">
                    <button 
                      className="text-left w-full" 
                      onClick={() => window.open(study.citationUrl, "_blank")}
                    >
                      <h4 className="text-gray-900 font-semibold text-sm leading-tight mb-2">{study.title}</h4>
                      <p className="text-gray-600 text-xs mb-3">{study.journal}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`text-xs ${
                              study.effectiveness === "effective"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {study.studyType}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600">{study.qualityScore}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          {new Date(study.date).getFullYear()}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {study.sampleSize?.toLocaleString()} participants
                      </div>
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleExportChat}>
                  <FileDown className="w-4 h-4 mr-2" />
                  Export Evidence
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleSaveConsultation}>
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
