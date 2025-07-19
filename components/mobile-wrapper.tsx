'use client'

import { useIsMobile } from '../hooks/use-mobile'
import { Smartphone, Calendar, CheckCircle, Mail, Globe, Search, User, ArrowRight, Layers, Filter, Mic, FileText } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
// import Navigation from './navigation'

interface MobileWrapperProps {
  children: React.ReactNode
}

export function MobileWrapper({ children }: MobileWrapperProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white">
        {/* <Navigation /> */}
        
        {/* Mobile Coming Soon Screen */}
        <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen">
          <div className="max-w-md mx-auto text-center">
            {/* Header with Brand */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">MedAssist</h1>
                  <p className="text-xs text-gray-500">Clinical AI</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <Badge className="absolute -top-1 -right-8 bg-amber-100 text-amber-700 rounded-2xl text-xs">
                  Coming Soon
                </Badge>
              </div>
            </div>

            {/* Main Message */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Mobile Experience
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We're crafting a mobile experience that brings the full power of MedAssist's clinical AI to your fingertips.
            </p>

            {/* Features Preview with MedAssist styling */}
            <div className="space-y-3 mb-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Mic className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">Voice Documentation</p>
                    <p className="text-gray-600 text-xs">Clinical notes with voice input</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Layers className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">Evidence Stack</p>
                    <p className="text-gray-600 text-xs">Research at your fingertips</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">EMR Integration</p>
                    <p className="text-gray-600 text-xs">Seamless workflow integration</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">PHIPA Compliant</p>
                    <p className="text-gray-600 text-xs">Secure Canadian healthcare data</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons - MedAssist style */}
            <div className="space-y-3 mb-8">
              <Button 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-2xl h-12"
                onClick={() => window.open('mailto:info@medassist.ca?subject=Mobile App Beta Access')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get Early Access
              </Button>
              
              <Button 
                variant="outline"
                className="w-full rounded-2xl h-12 border-gray-300 hover:bg-gray-100"
                onClick={() => window.location.href = '/demo'}
              >
                <Globe className="w-4 h-4 mr-2" />
                Try Desktop Version
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Timeline with MedAssist styling */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-center text-sm text-blue-900">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-medium">Expected Launch: Q2 2025</span>
              </div>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-gray-500 leading-relaxed">
              For the best experience, please use MedAssist on a desktop or tablet device. Our mobile app will provide the same powerful clinical AI tools optimized for smaller screens.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Desktop/Tablet view - show normal content
  return (
    <>
    
      {children}
    </>
  )
} 