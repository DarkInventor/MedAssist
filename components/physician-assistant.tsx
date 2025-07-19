"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  FileText,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AdvancedFilters } from "./advanced-filters";
import { PatientContextUpload } from "./patient-context";
import { VoiceInput } from "./voice-input";
import { PhysicianProfileSettings } from "./physician-profile";
import type {
  ChatMessage,
  StudySummary,
  PhysicianProfile,
  SavedConsultation,
  FilterOptions,
  SearchHistoryItem,
  PatientContext,
} from "../types/medical";
import { AIAssistantInterface } from "./ai-assistant-interface";

// Enhanced mock data with more comprehensive information
const mockPhysician: PhysicianProfile = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "General Practitioner",
  institution: "Toronto General Hospital",
  licenseNumber: "MD-12345",
  preferences: {
    preferredSources: [
      "PubMed/MEDLINE",
      "Cochrane Library",
      "ClinicalTrials.gov",
    ],
    notificationSettings: true,
    defaultFilters: {
      dateRange: "last-2-years",
      studyType: "all",
      region: "all",
      publicationStatus: "peer-reviewed",
      includePreprints: false,
    },
  },
};

const mockStudies: StudySummary[] = [
  {
    id: "1",
    title:
      "The impact of Intermittent Fasting on Hypertension: A Meta-Analysis",
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
    qualityScore: 8.5,
    sampleSize: 2456,
    publicationStatus: "peer-reviewed",
    keyTakeaway:
      "Intermittent fasting shows promise in reducing blood pressure, particularly systolic BP, in adults with hypertension.",
  },
  {
    id: "2",
    title:
      "Efficacy of Intermittent Fasting in Middle-Aged Hypertensive Patients",
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
    qualityScore: 9.1,
    sampleSize: 524,
    publicationStatus: "peer-reviewed",
    keyTakeaway:
      "Recent RCT data supports IF for mild hypertension in a specific age group, but cautions apply for certain medications.",
  },
  {
    id: "3",
    title: "Nutritional Interventions and Blood Pressure: An Overview",
    date: "March 2022",
    journal: "Current Hypertensive Reports, March 2022",
    abstract:
      "Safety analysis of intermittent fasting protocols in patients with hypertension.",
    verdict:
      "Not recommended for patients on beta-blockers without supervision.",
    effectiveness: "mixed",
    safety: "caution",
    targetPopulation: "Hypertensive patients on medication",
    citationUrl: "https://pubmed.ncbi.nlm.nih.gov/example3",
    studyType: "Cohort",
    region: "North America",
    qualityScore: 7.2,
    sampleSize: 1284,
    publicationStatus: "peer-reviewed",
    keyTakeaway:
      "Patients on beta-blockers require strict supervision if considering intermittent fasting due to potential adverse interactions.",
  },
];

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
];

const mockSearchHistory: SearchHistoryItem[] = [
  {
    id: "1",
    query:
      "Is there evidence for intermittent fasting in managing hypertension?",
    timestamp: new Date("2024-01-15T10:30:00"),
    resultCount: 3,
    specialty: "General Practitioner",
  },
  {
    id: "2",
    query: "GLP-1 agonists cardiovascular outcomes",
    timestamp: new Date("2024-01-14T14:20:00"),
    resultCount: 5,
    specialty: "General Practitioner",
  },
  {
    id: "3",
    query: "Statin therapy elderly patients safety",
    timestamp: new Date("2024-01-13T09:15:00"),
    resultCount: 7,
    specialty: "General Practitioner",
  },
];

function AppSidebar({
  physician,
  savedConsultations,
  searchHistory,
  onNewQuery,
}: {
  physician: PhysicianProfile;
  savedConsultations: SavedConsultation[];
  searchHistory: SearchHistoryItem[];
  onNewQuery: () => void;
}) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 rounded-2xl flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              MedAssist
            </h1>
            <p className="text-xs text-gray-500">Clinical AI</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="px-4 pb-4">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-100 rounded-2xl"
            onClick={onNewQuery}
          >
            <Plus className="w-4 h-4 mr-2" />
            New clinical query
          </Button>
        </div>
        {/* Chats Header */}
        <div className="px-4 pt-0 pb-3">
          <h3 className="text-sm font-medium text-gray-900">Chats</h3>
        </div>

        {/* Chat History - ChatGPT Style */}
        <div className="flex-1 px-1">
          <SidebarMenu className="space-y-0">
            {savedConsultations.map((consultation) => (
              <SidebarMenuItem key={consultation.id}>
                <SidebarMenuButton className="rounded-lg hover:bg-gray-100 w-full text-left p-1 px-4 h-auto transition-colors">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-sm text-gray-800 font-normal w-full text-left leading-tight line-clamp-2">
                      {consultation.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {consultation.date.toLocaleDateString()}
                    </p>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {searchHistory.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton className="rounded-lg hover:bg-gray-100 w-full text-left p-1 px-4 h-auto transition-colors">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-sm text-gray-800 font-normal w-full text-left leading-tight line-clamp-2">
                      {item.query}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-2xl flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {physician.name}
            </p>
            <p className="text-xs text-gray-500">{physician.specialty}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function PhysicianAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "user",
      content:
        "Is there evidence for intermittent fasting in managing hypertension?",
      timestamp: new Date(),
    },
    {
      id: "2",
      role: "assistant",
      content:
        "Certainly, here is some evidence related to intermittent fasting for managing hypertension:",
      timestamp: new Date(),
      studies: mockStudies,
      followUpSuggestions: [
        "Any major side effects?",
        "What about patients on beta-blockers?",
        "Optimal fasting schedules for hypertension?",
        "Comparison with DASH diet effectiveness?",
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [evidenceStackOpen, setEvidenceStackOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "last-2-years",
    studyType: "all",
    region: "all",
    publicationStatus: "peer-reviewed",
    includePreprints: false,
  });
  const [patientContext, setPatientContext] = useState<PatientContext | null>(
    null
  );
  const [physician, setPhysician] = useState<PhysicianProfile>(mockPhysician);
  const [searchHistory, setSearchHistory] =
    useState<SearchHistoryItem[]>(mockSearchHistory);
  const [savedConsultations, setSavedConsultations] = useState<
    SavedConsultation[]
  >(mockSavedConsultations);
  const [activeTab, setActiveTab] = useState("new-search");

  // Reset function for new clinical query
  const handleNewQuery = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setEvidenceStackOpen(false);
    setPatientContext(null);
    setActiveTab("new-search");
    // Keep filters, physician, searchHistory, and savedConsultations intact
  };

  const handleSendMessage = async (messageText?: string) => {
    const finalInput = messageText || input;
    if (!finalInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: finalInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add to search history
    const newSearchItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query: finalInput,
      timestamp: new Date(),
      resultCount: 0,
      specialty: physician.specialty,
    };
    setSearchHistory((prev) => [newSearchItem, ...prev.slice(0, 9)]);

    // Simulate AI response with enhanced features
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Based on the latest medical literature and your query, here are the most relevant findings:",
        timestamp: new Date(),
        studies: mockStudies.slice(0, 2), // Show relevant studies
        followUpSuggestions: [
          "Are there any contraindications?",
          "What are the recommended protocols?",
          "How does this compare to standard treatments?",
          "Any recent safety updates?",
        ],
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript);
    // Auto-send voice messages
    setTimeout(() => handleSendMessage(transcript), 500);
  };

  const handleFollowUpClick = (suggestion: string) => {
    setInput(suggestion);
    handleSendMessage(suggestion);
  };

  const handleSaveConsultation = () => {
    const title =
      messages.find((m) => m.role === "user")?.content.slice(0, 50) + "..." ||
      "New Consultation";
    const newConsultation: SavedConsultation = {
      id: Date.now().toString(),
      title,
      date: new Date(),
      messageCount: messages.length,
      lastMessage: messages[messages.length - 1]?.content.slice(0, 100) || "",
      specialty: physician.specialty,
      tags: [],
      isBookmarked: false,
    };
    setSavedConsultations((prev) => [newConsultation, ...prev]);
  };

  const handleExportChat = () => {
    const exportData = {
      consultation: {
        date: new Date().toISOString(),
        physician: physician.name,
        specialty: physician.specialty,
        messages: messages,
        patientContext: patientContext,
        filters: filters,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clinical-consultation-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        physician={physician}
        savedConsultations={savedConsultations}
        searchHistory={searchHistory}
        onNewQuery={handleNewQuery}
      />
      <SidebarInset>
        {/* Simple Header */}
        <header className="px-4 py-3 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SidebarTrigger />
              <h2 className="text-lg font-semibold text-gray-900">
                MedAssist
              </h2>

              {/* Evidence Stack Toggle - Left side */}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-2">
              <Sheet
                open={evidenceStackOpen}
                onOpenChange={setEvidenceStackOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:bg-gray-100 rounded-2xl"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Evidence Stack
                    <Badge
                      variant="outline"
                      className="ml-2 text-gray-600 font-medium rounded-2xl"
                    >
                      {mockStudies.length}
                    </Badge>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] sm:w-[500px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center">
                      <Layers className="w-5 h-5 mr-2 text-blue-600" />
                      Evidence Stack
                    </SheetTitle>
                    <SheetDescription>
                      Latest research findings and clinical evidence for your
                      queries
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {mockStudies.map((study, index) => (
                      <div
                        key={study.id}
                        className="hover:bg-gray-50 cursor-pointer transition-all bg-white border border-gray-200 rounded-2xl p-4"
                      >
                        <button
                          className="text-left w-full"
                          onClick={() =>
                            window.open(study.citationUrl, "_blank")
                          }
                        >
                          <h4 className="text-gray-900 font-semibold text-sm leading-tight mb-3">
                            {study.title}
                          </h4>
                          <p className="text-gray-600 text-xs mb-3">
                            {study.journal}
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={`text-xs rounded-2xl ${
                                  study.effectiveness === "effective"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {study.studyType}
                              </Badge>
                              <div className="flex items-center space-x-1 bg-gray-100 rounded-2xl px-2 py-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-gray-700 font-medium">
                                  {study.qualityScore}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                              {new Date(study.date).getFullYear()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-700 mb-3">
                            {study.verdict}
                          </p>
                          <div className="text-xs text-gray-500">
                            {study.sampleSize?.toLocaleString()} participants
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions in Sheet */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start rounded-2xl"
                        onClick={handleExportChat}
                      >
                        <FileDown className="w-4 h-4 mr-2" />
                        Export Evidence
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start rounded-2xl"
                        onClick={handleSaveConsultation}
                      >
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save Consultation
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <AdvancedFilters
                filters={filters}
                onFiltersChange={setFilters}
                studyCount={mockStudies.length}
              />
              <PatientContextUpload
                context={patientContext}
                onContextChange={setPatientContext}
              />
              <Button variant="ghost" size="sm" onClick={handleExportChat}>
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveConsultation}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Where should we begin?
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Ask me about the latest medical research, treatment protocols,
                or clinical guidelines.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {[
                  "Latest hypertension guidelines",
                  "Diabetes medication updates",
                  "COVID-19 treatment protocols",
                  "Evidence for statins in elderly",
                ].map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="p-4 h-auto text-left justify-start rounded-2xl"
                    onClick={() => handleSendMessage(query)}
                  >
                    <div>
                      <p className="font-medium">{query}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-8">
              <div className="space-y-8">
                {/* Clinical Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">
                        Clinical Decision Support Notice
                      </h4>
                      <p className="text-amber-800 text-sm">
                        This AI-generated evidence synthesis is for
                        informational purposes only. Not a substitute for
                        professional medical judgment, diagnosis, or treatment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Patient Context Banner */}
                {patientContext && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <h4 className="font-semibold text-green-900">
                            Patient Context Active
                          </h4>
                          <p className="text-green-800 text-sm">
                            Research results are being personalized
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPatientContext(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id}>
                    {message.role === "user" && (
                      <div className="flex justify-end mb-6">
                        <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
                          <p className="text-gray-900">{message.content}</p>
                        </div>
                      </div>
                    )}

                    {message.role === "assistant" && (
                      <div className="mb-8">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-8 h-8 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Search className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 leading-relaxed">
                              {message.content}
                            </p>
                          </div>
                        </div>

                        {message.studies && (
                          <div className="ml-11 space-y-6">
                            {message.studies.map((study, index) => (
                              <div
                                key={study.id}
                                className="border border-gray-200 rounded-2xl p-4"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-start space-x-3 flex-1">
                                    <div
                                      className={`w-6 h-6 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                                        study.effectiveness === "effective"
                                          ? "bg-green-100"
                                          : "bg-amber-100"
                                      }`}
                                    >
                                      {study.effectiveness === "effective" ? (
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                      ) : (
                                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-gray-900 leading-tight">
                                        {study.title}
                                      </h4>
                                      <p className="text-gray-600 text-sm mt-1">
                                        {study.journal}
                                      </p>
                                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                        <span>
                                          {study.sampleSize?.toLocaleString()}{" "}
                                          participants
                                        </span>
                                        <span>
                                          Quality: {study.qualityScore}/10
                                        </span>
                                        <span>{study.studyType}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-gray-700 mb-3">
                                  {study.verdict}
                                </p>

                                {study.keyTakeaway && (
                                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 mb-3">
                                    <p className="text-blue-900 text-sm">
                                      <span className="font-semibold">
                                        Clinical Significance:
                                      </span>{" "}
                                      {study.keyTakeaway}
                                    </p>
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                  <p className="text-gray-600 text-sm">
                                    <span className="font-semibold">
                                      Population:
                                    </span>{" "}
                                    {study.targetPopulation}
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-600 hover:bg-blue-50 rounded-2xl"
                                      onClick={() =>
                                        window.open(study.citationUrl, "_blank")
                                      }
                                    >
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      View Study
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="rounded-2xl"
                                    >
                                      <Bookmark className="w-3 h-3 mr-1" />
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Follow-up Suggestions */}
                        {message.followUpSuggestions &&
                          message.followUpSuggestions.length > 0 && (
                            <div className="ml-11 mt-6">
                              <p className="text-sm font-semibold text-gray-700 mb-3">
                                Suggested follow-up questions:
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {message.followUpSuggestions.map(
                                  (suggestion, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className="justify-start text-left h-auto py-2 px-3 rounded-2xl"
                                      onClick={() =>
                                        handleFollowUpClick(suggestion)
                                      }
                                    >
                                      <span className="text-sm">
                                        {suggestion}
                                      </span>
                                    </Button>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-2xl flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">
                        Analyzing medical literature...
                      </p>
                      <p className="text-gray-600 text-sm">
                        Searching through research papers and clinical trials
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Floating Input Area - ChatGPT Style */}
        {/* <div className="p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end bg-white border border-gray-300 rounded-2xl shadow-sm"> */}
        {/* <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything"
                className="flex-1 bg-transparent border-0 focus:ring-0 px-4 py-3 rounded-2xl resize-none min-h-[48px] max-h-[200px] focus:outline-none"
                rows={1}
              />
              <div className="flex items-center space-x-2 pr-2 pb-2">
                <VoiceInput 
                  onTranscript={handleVoiceTranscript}
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="rounded-2xl w-8 h-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div> */}
        <AIAssistantInterface />
        {/* </div> */}
        <p className="text-xs text-gray-500 text-center mt-2">
          MedAssist can make mistakes. Check important info.
        </p>
        {/* </div>
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
