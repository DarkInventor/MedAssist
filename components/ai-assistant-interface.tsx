"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  Search,
  Mic,
  ArrowUp,
  Plus,
  FileText,
  Code,
  BookOpen,
  PenTool,
  BrainCircuit,
  Sparkles,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";

export function AIAssistantInterface() {
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [activeCommandCategory, setActiveCommandCategory] = useState<
    string | null
  >(null);
  const [patientContext, setPatientContext] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { state, isMobile } = useSidebar();

  const commandSuggestions = {
    learn: [
      "What are the current treatments for hypertension?",
      "How does diabetes mellitus type 2 develop?",
      "What are the symptoms of myocardial infarction?",
      "Explain the mechanism of action of ACE inhibitors",
      "What are the risk factors for stroke?",
    ],
    code: [
      "What are the latest CPSO guidelines for telemedicine?",
      "Compare effectiveness of statins vs lifestyle changes",
      "What are the contraindications for beta-blockers?",
      "Explain the Canadian guidelines for managing COPD",
      "What are the current vaccination schedules in Canada?",
    ],
    write: [
      "What are the differential diagnoses for chest pain?",
      "How to diagnose and treat community-acquired pneumonia?",
      "What are the drug interactions with warfarin?",
      "Explain the PHIPA requirements for patient data",
      "What are the latest updates on COVID-19 treatment?",
    ],
  };

  const handleUploadFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    setShowUploadAnimation(true);

    // Simulate upload delay (in real app, this would be actual upload logic)
    setTimeout(() => {
      setUploadedFiles(prev => [...prev, ...filesArray]);
      setShowUploadAnimation(false);
    }, 1500);

    // Reset the file input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleCommandSelect = (command: string) => {
    setInputValue(command);
    setActiveCommandCategory(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const currentQuery = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Read file contents for uploaded files
      const fileContents = await Promise.all(
        uploadedFiles.map(async (file) => {
          const text = await file.text();
          return { name: file.name, content: text };
        })
      );

      const requestBody = {
        query: currentQuery,
        patientContext: patientContext || undefined,
        uploadedFiles: fileContents,
        filters: {
          searchEnabled,
          deepResearchEnabled,
          reasonEnabled,
          dateRange: "last-2-years",
          studyType: "all",
          region: "canada"
        }
      };

      const response = await fetch('/api/medical-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Emit event to the main physician interface to display results
      window.dispatchEvent(new CustomEvent('medicalQueryResult', {
        detail: {
          query: currentQuery,
          response: data
        }
      }));

    } catch (error) {
      console.error('Error fetching medical research:', error);
      
      // Emit error event
      window.dispatchEvent(new CustomEvent('medicalQueryResult', {
        detail: {
          query: currentQuery,
          response: {
            summary: 'Sorry, there was an error processing your medical query. Please try again.',
            keyFindings: [],
            clinicalRecommendations: [],
            sources: [],
            citations: [],
            followUpSuggestions: [
              'Try rephrasing your question',
              'Check if your question is medical-related',
              'Ensure you have a stable internet connection'
            ],
            confidence: 0.0,
            lastUpdated: new Date().toISOString()
          }
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-0 right-0 bg-transparent z-50   ${
      isMobile ? 'left-0' : state === "expanded" ? 'left-72' : 'left-12'
    }`}>
      <div className="max-w-3xl mx-auto px-4 py-4 ">
        <div className="w-full bg-transparent rounded-xl">
          <div className="w-full flex flex-col items-center">
      

        {/* Patient Context Input */}
        {patientContext && (
          <div className="w-full bg-blue-50 border border-blue-200 rounded-[1rem] overflow-hidden mb-3">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">Patient Context</span>
                <button
                  onClick={() => setPatientContext("")}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear
                </button>
              </div>
              <p className="text-sm text-blue-700">{patientContext}</p>
            </div>
          </div>
        )}

        {/* Input area with integrated functions and file upload */}
        <div className="w-full bg-white border border-gray-200 rounded-[1rem] overflow-hidden mb-3">
          <div className="p-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me about medical conditions, treatments, guidelines..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              className="w-full text-gray-700 text-base outline-none focus:outline-none focus:ring-0 placeholder:text-gray-400 bg-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 py-1 px-2 rounded-md border border-gray-200"
                  >
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-gray-700">{file.name}</span>
                    <button
                      onClick={() =>
                        setUploadedFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search, Deep Research, Reason functions and actions */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchEnabled(!searchEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  searchEnabled
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
              <button
                onClick={() => setDeepResearchEnabled(!deepResearchEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  deepResearchEnabled
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    deepResearchEnabled ? "text-blue-600" : "text-gray-400"
                  }
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="8" cy="8" r="3" fill="currentColor" />
                </svg>
                <span>Deep Research</span>
              </button>
              <button
                onClick={() => setReasonEnabled(!reasonEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  reasonEnabled
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                <BrainCircuit
                  className={`w-4 h-4 ${
                    reasonEnabled ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <span>Reason</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  inputValue.trim() && !isLoading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowUp className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Upload files and Patient Context */}
          <div className="px-4 py-2 border-t border-gray-100 space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept="*/*"
            />
            <div className="flex items-center justify-between">
              <button
                onClick={handleUploadFile}
                className="flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                {showUploadAnimation ? (
                  <motion.div
                    className="flex space-x-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                        variants={{
                          hidden: { opacity: 0, y: 5 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.4,
                              repeat: Infinity,
                              repeatType: "mirror",
                              delay: i * 0.1,
                            },
                          },
                        }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span>Upload Files</span>
              </button>
              <button
                onClick={() => {
                  const context = prompt("Enter patient context (age, conditions, medications, etc.):");
                  if (context) setPatientContext(context);
                }}
                className="flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Add Patient Context</span>
              </button>
            </div>
          </div>
        </div>

        {/* Medical responses are now handled in the main physician assistant UI */}

        {/* Command categories */}
        {/* <div className="w-full grid grid-cols-3 gap-4 mb-4">
          <CommandButton
            icon={<BookOpen className="w-5 h-5" />}
            label="Learn"
            isActive={activeCommandCategory === "learn"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "learn" ? null : "learn"
              )
            }
          />
          <CommandButton
            icon={<Code className="w-5 h-5" />}
            label="Code"
            isActive={activeCommandCategory === "code"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "code" ? null : "code"
              )
            }
          />
          <CommandButton
            icon={<PenTool className="w-5 h-5" />}
            label="Write"
            isActive={activeCommandCategory === "write"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "write" ? null : "write"
              )
            }
          />
        </div> */}

        {/* Command suggestions */}
        <AnimatePresence>
          {activeCommandCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full mb-6 overflow-hidden"
            >
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700">
                    {activeCommandCategory === "learn"
                      ? "Clinical Learning"
                      : activeCommandCategory === "code"
                      ? "Guidelines & Protocols"
                      : "Diagnostic & Treatment"}
                  </h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {commandSuggestions[
                    activeCommandCategory as keyof typeof commandSuggestions
                  ].map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleCommandSelect(suggestion)}
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-75"
                    >
                      <div className="flex items-center gap-3">
                        {activeCommandCategory === "learn" ? (
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        ) : activeCommandCategory === "code" ? (
                          <Code className="w-4 h-4 text-blue-600" />
                        ) : (
                          <PenTool className="w-4 h-4 text-blue-600" />
                        )}
                        <span className="text-sm text-gray-700">
                          {suggestion}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
    </div>
  );
}

interface CommandButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function CommandButton({ icon, label, isActive, onClick }: CommandButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
        isActive
          ? "bg-blue-50 border-blue-200 shadow-sm"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
        {icon}
      </div>
      <span
        className={`text-sm font-medium ${
          isActive ? "text-blue-700" : "text-gray-700"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}
