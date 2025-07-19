"use client"

import type React from "react"

import { useState } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { ChatMessage, StudySummary, PhysicianProfile, SavedConsultation, FilterOptions } from "../types/medical"

// Mock data (keeping the same data)
const mockPhysician: PhysicianProfile = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "General Practitioner",
  institution: "Toronto General Hospital",
  licenseNumber: "MD-12345",
}

const mockStudies: StudySummary[] = [
  {
    id: "1",
    title: "The impact of Intermittent Fasting on Hypertension: A Meta-Analysis",
    date: "January 2023",
    journal: "Journal of Hypertension, January 2023",
    abstract:
      "This meta-analysis of 12 randomized controlled trials examined the effects of intermittent fasting on blood pressure in adults with hypertension.",
    verdict:
      "Intermittent fasting was associated with a reduction in systolic blood pressure of approximately 7 mmHg among individuals with hypertension.",
    effectiveness: "effective",
    safety: "safe",
    targetPopulation: "45-60 year olds with mild hypertension",
    citationUrl: "https://pubmed.ncbi.nlm.nih.gov/example1",
    studyType: "Meta-analysis",
    region: "Global",
    keyTakeaway:
      "Intermittent fasting shows promise in reducing blood pressure, particularly systolic BP, in adults with hypertension.",
  },
  {
    id: "2",
    title: "Efficacy of Intermittent Fasting in Middle-Aged Hypertensive Patients",
    date: "May 2024",
    journal: "Hypertension Research, May 2024",
    abstract:
      "A 12-week randomized controlled trial investigating the effects of 16:8 intermittent fasting on blood pressure control.",
    verdict:
      "Recent RCT data supports IF for mild hypertension in a specific age group, but cautions apply for certain medications.",
    effectiveness: "effective",
    safety: "caution",
    targetPopulation: "Adults with mild hypertension not on beta-blockers",
    citationUrl: "https://pubmed.ncbi.nlm.nih.gov/example2",
    studyType: "RCT",
    region: "North America",
    keyTakeaway:
      "Recent RCT data supports IF for mild hypertension in a specific age group, but cautions apply for certain medications.",
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
    keyTakeaway:
      "Patients on beta-blockers require strict supervision if considering intermittent fasting due to potential adverse interactions.",
  },
]

const mockSavedConsultations: SavedConsultation[] = [
  {
    id: "1",
    title: "GLP-1 agonists for weight loss",
    date: new Date("2024-01-15"),
    messageCount: 8,
    lastMessage: "Any major side effects with semaglutide?",
  },
  {
    id: "2",
    title: "Statins in elderly patients",
    date: new Date("2024-01-10"),
    messageCount: 5,
    lastMessage: "Dosage recommendations for patients over 75",
  },
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
    },
    {
      id: "3",
      role: "user",
      content: "Any major side effects?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState<StudySummary | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "last-2-years",
    studyType: "all",
    region: "all",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on the latest medical literature, here are some potential side effects:",
        timestamp: new Date(),
        studies: [mockStudies[2]], // Only show the warning study for this follow-up
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
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
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-black">MedAssist</h1>
              <p className="text-sm text-slate-500">Enterprise Clinical AI</p>
            </div>
          </div>
        </div>

        {/* Doctor Profile */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Dr. Sarah Johnson</h3>
                <p className="text-gray-600 text-sm">General Practitioner</p>
                <p className="text-gray-500 text-xs">Toronto General Hospital</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-6 py-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-700 bg-blue-50 hover:bg-blue-100 font-medium text-sm py-3 px-3 rounded-lg"
          >
            <Plus className="w-4 h-4 mr-3" />
            New Clinical Query
          </Button>

          <div className="pt-2 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100 font-medium text-sm py-3 px-3 rounded-lg"
            >
              <Clock className="w-4 h-4 mr-3" />
              Recent Searches
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100 font-medium text-sm py-3 px-3 rounded-lg"
            >
              <BookOpen className="w-4 h-4 mr-3" />
              Saved Consultations
            </Button>
          </div>

          {/* Recent Activity */}
          <div className="pt-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Activity</h4>
            <div className="space-y-2">
              {mockSavedConsultations.map((consultation) => (
                <div key={consultation.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-gray-700 font-medium text-sm truncate">{consultation.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{consultation.date.toLocaleDateString()}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{consultation.messageCount} queries</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                <Upload className="w-4 h-4 mr-2" />
                Patient Context
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                <MoreHorizontal className="w-4 h-4" />
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
                {/* Disclaimer */}
                <div className="bg-amber-50 rounded-lg p-4 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">Clinical Decision Support Notice</h4>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      This AI-generated evidence synthesis is for informational purposes only and does not process
                      patient data. Not a substitute for professional medical judgment, diagnosis, or treatment. Always
                      verify with current clinical guidelines.
                    </p>
                  </div>
                </div>

                {messages.map((message) => (
                  <div key={message.id}>
                    {message.role === "user" && (
                      <div className="flex justify-end mb-4">
                        <div className="bg-white rounded-lg p-4 max-w-[80%] shadow-sm">
                          <p className="text-gray-900 font-medium">{message.content}</p>
                          <p className="text-gray-500 text-xs mt-2">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    )}

                    {message.role === "assistant" && (
                      <div className="mb-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                          <div className="flex items-center space-x-2 mb-4">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                              <Search className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              Evidence Analysis
                            </span>
                          </div>

                          <p className="text-gray-900 font-medium mb-6">{message.content}</p>

                          {message.studies && (
                            <div className="space-y-6">
                              {message.studies.map((study, index) => (
                                <div key={study.id} className="border-l-4 border-gray-200 pl-6">
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
                                      </div>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
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
                                  </div>

                                  <p className="text-gray-700 leading-relaxed mb-3">{study.verdict}</p>

                                  {study.keyTakeaway && (
                                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                      <p className="text-blue-900 text-sm">
                                        <span className="font-semibold">Clinical Significance:</span>{" "}
                                        {study.keyTakeaway}
                                      </p>
                                    </div>
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
                                        View Study
                                      </Button>
                                      <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                                        <Bookmark className="w-4 h-4 mr-1" />
                                        Save
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-center space-x-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <div>
                          <p className="text-gray-900 font-semibold">Analyzing Medical Literature</p>
                          <p className="text-gray-600 text-sm">
                            Searching through latest research papers and clinical trials
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-3 sm:p-4 md:p-6">
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a follow-up question or start a new clinical query..."
                    className="w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base py-3 px-4 sm:px-6 rounded-full shadow-sm pr-12 sm:pr-16 transition-all text-center"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-2 sm:px-3 py-1.5 text-sm sm:text-base"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center px-2 sm:px-0">
                  Press Enter to send • Powered by advanced medical AI • Always verify with clinical guidelines
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Evidence Stack */}
          <div className="hidden xl:flex w-80 bg-white border-l border-gray-200 flex-col">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
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
                <div key={study.id} className="p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <button className="text-left w-full" onClick={() => window.open(study.citationUrl, "_blank")}>
                    <h4 className="text-gray-900 font-semibold text-sm leading-tight mb-2">{study.title}</h4>
                    <p className="text-gray-600 text-xs mb-3">{study.journal}</p>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`text-xs ${
                          study.effectiveness === "effective"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {study.studyType}
                      </Badge>
                      <span className="text-xs text-gray-500 font-medium">{new Date(study.date).getFullYear()}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
