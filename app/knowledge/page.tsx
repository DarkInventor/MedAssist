import type { Metadata } from 'next'
import Link from 'next/link'
import { PhysicianAssistant } from '../../components/physician-assistant'

export const metadata: Metadata = {
  title: 'MedAssist Knowledge Center - AI Medical Assistant Resources for Canadian Physicians',
  description: 'Comprehensive resources on AI in healthcare, clinical decision support, PHIPA/PIPEDA compliance, EMR integration, and medical AI best practices for Canadian physicians.',
  keywords: [
    'AI medical assistant knowledge',
    'clinical AI resources Canada',
    'PHIPA PIPEDA compliance guide',
    'AI scribe best practices',
    'medical AI ethics',
    'clinical decision support AI',
    'EMR integration AI',
    'physician burnout solutions',
    'AI healthcare documentation',
    'Canadian healthcare AI'
  ].join(', '),
  openGraph: {
    title: 'MedAssist Knowledge Center - AI Medical Resources',
    description: 'Expert insights on AI in Canadian healthcare, compliance guides, and best practices for medical professionals.',
    url: 'https://medassist.ca/knowledge',
  },
  alternates: {
    canonical: '/knowledge',
  }
}

// Knowledge center categories based on research themes
const knowledgeCategories = [
  {
    id: 'documentation-burnout',
    title: 'Documentation & Burnout',
    description: 'Understanding the administrative burden on physicians and how AI can help',
    icon: '📋',
    articles: [
      'The Hidden Cost of Medical Documentation: 40% of Physician Time',
      'How AI Scribes Are Reducing Physician Burnout in Canada',
      'Documentation Burden Statistics: Canadian vs Global Perspective',
      'Family Physician Burnout: The Role of Administrative Tasks'
    ]
  },
  {
    id: 'ai-compliance',
    title: 'Privacy & Compliance',
    description: 'PHIPA/PIPEDA compliance for AI in Canadian healthcare',
    icon: '🔒',
    articles: [
      'PHIPA Compliance for AI Medical Assistants in Ontario',
      'PIPEDA Requirements for Healthcare AI in Canada',
      'Quebec Privacy Act and Medical AI: What You Need to Know',
      'How to Ensure HIPAA-PIPEDA Compliance with AI Scribes'
    ]
  },
  {
    id: 'clinical-decision-support',
    title: 'Clinical Decision Support',
    description: 'AI-powered evidence-based medicine and diagnostic assistance',
    icon: '🩺',
    articles: [
      'Generative AI for Differential Diagnosis: Benefits & Limitations',
      'Evidence-Based AI: How MedAssist Sources Medical Literature',
      'AI Clinical Decision Support vs Traditional Guidelines',
      'The Future of AI in Primary Care Diagnosis'
    ]
  },
  {
    id: 'emr-integration',
    title: 'EMR Integration & Workflow',
    description: 'Integrating AI with Canadian EMRs and healthcare workflows',
    icon: '🔗',
    articles: [
      'OSCAR EMR Integration with AI Medical Assistants',
      'TELUS PS Suite and AI Scribe Compatibility',
      'Workflow Optimization with AI in Family Practice',
      'Canadian EMR Landscape: AI Integration Opportunities'
    ]
  },
  {
    id: 'ai-ethics-safety',
    title: 'AI Ethics & Safety',
    description: 'Safe AI use in medicine and ethical considerations',
    icon: '⚖️',
    articles: [
      'AI Medical Assistant Safety: Guidelines for Canadian Physicians',
      'Ethical Considerations in AI-Assisted Clinical Decision Making',
      'When AI Gets It Wrong: Managing Clinical AI Errors',
      'Patient Consent and AI Medical Assistants'
    ]
  },
  {
    id: 'implementation-guides',
    title: 'Implementation & Training',
    description: 'How to successfully implement AI assistants in your practice',
    icon: '🚀',
    articles: [
      'Getting Started with AI Medical Assistants: A Step-by-Step Guide',
      'Training Your Team on AI Scribe Technology',
      'ROI of AI Medical Assistants in Primary Care',
      'Change Management for AI Implementation in Healthcare'
    ]
  }
]

// Featured articles for homepage
const featuredArticles = [
  {
    title: 'The Complete Guide to PHIPA Compliance for AI Medical Assistants',
    excerpt: 'Everything Ontario physicians need to know about using AI assistants while maintaining PHIPA compliance.',
    category: 'Privacy & Compliance',
    readTime: '8 min read',
    author: 'Dr. Sarah Chen, Family Medicine',
    date: '2024-01-15',
    slug: 'phipa-compliance-ai-medical-assistants'
  },
  {
    title: 'How AI Scribes Save 75% of Documentation Time: Canadian Study Results',
    excerpt: 'New research from Toronto Family Health Teams shows dramatic time savings with AI medical scribes.',
    category: 'Documentation & Burnout',
    readTime: '6 min read',
    author: 'Dr. Michael Rodriguez, Primary Care',
    date: '2024-01-12',
    slug: 'ai-scribes-save-documentation-time-canadian-study'
  },
  {
    title: 'AI vs Human: Clinical Decision Accuracy in Primary Care',
    excerpt: 'Comparing AI-assisted diagnosis with traditional clinical decision-making in Canadian family practice.',
    category: 'Clinical Decision Support',
    readTime: '10 min read',
    author: 'Dr. Emily Watson, Family Medicine Research',
    date: '2024-01-10',
    slug: 'ai-vs-human-clinical-decision-accuracy'
  }
]

export default function KnowledgeCenterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header Section */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MedAssist Knowledge Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Expert insights on AI in Canadian healthcare, compliance guides, and best practices for medical professionals
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              Stay informed about AI medical assistants, privacy compliance, and digital health innovations 
              specifically for Canadian physicians and primary care providers.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredArticles.map((article, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                  <Link href={`/knowledge/${article.slug}`} className="hover:text-blue-600">
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Knowledge Categories */}
        <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {knowledgeCategories.map((category) => (
            <div key={category.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{category.description}</p>
              
              <ul className="space-y-2 mb-4">
                {category.articles.slice(0, 3).map((article, index) => (
                  <li key={index} className="text-sm">
                    <Link href={`/knowledge/category/${category.id}`} className="text-blue-600 hover:text-blue-800">
                      {article}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={`/knowledge/category/${category.id}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View all {category.title.toLowerCase()} articles →
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section with Structured Data */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How do I ensure my AI medical assistant is PHIPA/PIPEDA compliant?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Ensure your AI medical assistant stores data on Canadian servers, has proper encryption, patient consent mechanisms, and follows provincial privacy regulations. Our compliance guide provides detailed requirements for each province."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can AI medical assistants integrate with Canadian EMRs like OSCAR?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, modern AI medical assistants can integrate with popular Canadian EMRs including OSCAR, TELUS PS Suite, and Epic through APIs and direct integrations. Check our EMR integration guides for specific setup instructions."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are the benefits of AI scribes for family physicians?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "AI scribes can reduce documentation time by up to 75%, decrease physician burnout, improve patient interaction time, and maintain accurate clinical records. Studies show significant ROI for primary care practices."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are AI clinical decision support tools safe to use?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "AI clinical decision support tools are safe when used as augmentation to, not replacement for, clinical judgment. They should be evidence-based, transparent about limitations, and used within proper clinical workflows."
                    }
                  }
                ]
              })
            }}
          />
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">How do I ensure my AI medical assistant is PHIPA/PIPEDA compliant?</h3>
              <p className="text-gray-600">
                Ensure your AI medical assistant stores data on Canadian servers, has proper encryption, patient consent mechanisms, 
                and follows provincial privacy regulations. Our compliance guide provides detailed requirements for each province.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Can AI medical assistants integrate with Canadian EMRs like OSCAR?</h3>
              <p className="text-gray-600">
                Yes, modern AI medical assistants can integrate with popular Canadian EMRs including OSCAR, TELUS PS Suite, 
                and Epic through APIs and direct integrations. Check our EMR integration guides for specific setup instructions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">What are the benefits of AI scribes for family physicians?</h3>
              <p className="text-gray-600">
                AI scribes can reduce documentation time by up to 75%, decrease physician burnout, improve patient interaction time, 
                and maintain accurate clinical records. Studies show significant ROI for primary care practices.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Are AI clinical decision support tools safe to use?</h3>
              <p className="text-gray-600">
                AI clinical decision support tools are safe when used as augmentation to, not replacement for, clinical judgment. 
                They should be evidence-based, transparent about limitations, and used within proper clinical workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated on AI in Healthcare</h2>
          <p className="text-lg text-gray-600 mb-6">
            Get the latest insights on AI medical assistants, compliance updates, and healthcare technology delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-2xl hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Try MedAssist Section */}
      {/* <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Experience MedAssist - AI Clinical Assistant
          </h2>
          <PhysicianAssistant />
        </div>
      </div> */}
    </div>
  )
} 