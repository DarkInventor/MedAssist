"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Volume2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { VoiceRecognitionState } from "../types/medical"

interface VoiceInputProps {
  onTranscript: (text: string) => void
  disabled?: boolean
}

export function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [voiceState, setVoiceState] = useState<VoiceRecognitionState>({
    isListening: false,
    transcript: "",
    confidence: 0,
  })
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
        setVoiceState(prev => ({
          ...prev,
          isListening: true,
          error: undefined
        }))
      }

      recognition.onresult = (event) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        const confidence = event.results[current][0].confidence

        setVoiceState(prev => ({
          ...prev,
          transcript,
          confidence: confidence || 0.8
        }))

        // If final result, send to parent
        if (event.results[current].isFinal) {
          onTranscript(transcript)
          setVoiceState(prev => ({
            ...prev,
            isListening: false,
            transcript: "",
            confidence: 0
          }))
        }
      }

      recognition.onerror = (event) => {
        setVoiceState(prev => ({
          ...prev,
          isListening: false,
          error: event.error,
          transcript: "",
          confidence: 0
        }))
      }

      recognition.onend = () => {
        setVoiceState(prev => ({
          ...prev,
          isListening: false
        }))
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onTranscript])

  const startListening = () => {
    if (recognitionRef.current && !voiceState.isListening) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        setVoiceState(prev => ({
          ...prev,
          error: "Failed to start voice recognition"
        }))
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && voiceState.isListening) {
      recognitionRef.current.stop()
    }
  }

  const toggleListening = () => {
    if (voiceState.isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!isSupported) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <MicOff className="w-4 h-4" />
        <span className="text-xs">Voice input not supported</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={voiceState.isListening ? "default" : "ghost"}
        size="sm"
        onClick={toggleListening}
        disabled={disabled}
        className={`${
          voiceState.isListening 
            ? "bg-red-600 hover:bg-red-700 text-white animate-pulse" 
            : "text-gray-600 hover:bg-gray-100"
        } transition-all duration-200`}
      >
        {voiceState.isListening ? (
          <Mic className="w-4 h-4" />
        ) : (
          <MicOff className="w-4 h-4" />
        )}
        <span className="ml-2 text-xs hidden sm:inline">
          {voiceState.isListening ? "Listening..." : "Voice"}
        </span>
      </Button>

      {voiceState.isListening && (
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-red-400 rounded animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-4 bg-red-400 rounded animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-4 bg-red-400 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
          <Volume2 className="w-3 h-3 text-red-600 animate-pulse" />
        </div>
      )}

      {voiceState.transcript && (
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-800 text-xs">
            {Math.round(voiceState.confidence * 100)}% confidence
          </Badge>
        </div>
      )}

      {voiceState.error && (
        <div className="flex items-center space-x-1 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs">Voice error</span>
        </div>
      )}

      {voiceState.transcript && voiceState.isListening && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Mic className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-gray-900">Listening...</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-800 text-xs">
              {Math.round(voiceState.confidence * 100)}%
            </Badge>
          </div>
          <p className="text-gray-700 text-sm italic">
            "{voiceState.transcript}"
          </p>
        </div>
      )}
    </div>
  )
}

// Type augmentation for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}