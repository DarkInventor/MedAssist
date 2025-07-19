import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Try MedAssist Demo - AI Medical Assistant for Canadian Physicians',
  description: 'Experience MedAssist in action. Try our AI medical assistant demo and see how it can reduce documentation time by 75% while improving patient care.',
  keywords: 'MedAssist demo, AI medical assistant demo, clinical AI trial, medical scribe demo',
  openGraph: {
    title: 'Try MedAssist Demo - AI Medical Assistant',
    description: 'Experience how MedAssist can transform your clinical practice with AI-powered documentation and decision support.',
    url: 'https://medassist.ca/demo',
  },
  alternates: {
    canonical: '/demo',
  }
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Try MedAssist Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience how our AI medical assistant can transform your clinical practice
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Demo Coming Soon */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Demo Coming Soon
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're working hard to bring you an interactive demo of MedAssist. 
            In the meantime, explore our blog to learn more about AI in healthcare.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blog"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Read Our Blog
            </Link>
            <Link 
              href="/knowledge"
              className="bg-white text-gray-700 px-8 py-3 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Knowledge Center
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What You'll Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Input</h3>
              <p className="text-gray-600">Speak naturally and watch your words transform into structured clinical notes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Documentation</h3>
              <p className="text-gray-600">AI-powered note-taking that understands medical terminology and context</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinical Research</h3>
              <p className="text-gray-600">Access evidence-based medical research and clinical guidelines instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 