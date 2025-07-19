"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Volume2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { VoiceRecognitionState } from "../types/medical"

// Type definitions for Speech Recognition API
interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic
    webkitSpeechRecognition: SpeechRecognitionStatic
  }
}

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

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        const confidence = event.results[current][0].confidence

        setVoiceState(prev => ({
          ...prev,
          transcript,
          confidence,
        }))

        // Only call onTranscript if result is final and confidence is reasonable
        if (event.results[current].isFinal && confidence > 0.7) {
          onTranscript(transcript)
          setVoiceState(prev => ({
            ...prev,
            transcript: "",
            confidence: 0,
          }))
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setVoiceState(prev => ({
          ...prev,
          isListening: false,
          error: `Speech recognition error: ${event.error}`,
        }))
      }

      recognition.onend = () => {
        setVoiceState(prev => ({
          ...prev,
          isListening: false,
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
      <div className="flex items-center space-x-2 text-gray-400">
        <MicOff className="w-4 h-4" />
        <span className="text-xs font-medium hidden sm:inline">Voice not supported</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleListening}
        disabled={disabled}
        className={`rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 ${
          voiceState.isListening 
            ? "bg-red-100 hover:bg-red-200 text-red-600 animate-pulse" 
            : "text-gray-500 hover:bg-gray-100"
        }`}
      >
        {voiceState.isListening ? (
          <Mic className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </Button>

      {voiceState.isListening && (
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-1 h-6 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-6 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-6 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
          <Volume2 className="w-4 h-4 text-red-600 animate-pulse" />
        </div>
      )}

      {voiceState.transcript && (
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50/70 text-blue-800 text-xs rounded-full px-3 py-1 font-medium">
            {Math.round(voiceState.confidence * 100)}% confidence
          </Badge>
        </div>
      )}

      {voiceState.error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-medium">{voiceState.error}</span>
        </div>
      )}

      {voiceState.transcript && (
        <div className="bg-gray-50 rounded-full px-4 py-2 max-w-xs">
          <p className="text-sm text-gray-700 truncate font-medium">{voiceState.transcript}</p>
        </div>
      )}
    </div>
  )
}