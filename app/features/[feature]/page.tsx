import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Features data for MedAssist capabilities
const features = {
  'ai-scribe': {
    name: 'AI Medical Scribe',
    tagline: 'Automated Clinical Documentation',
    description: 'Revolutionary AI-powered medical scribe that transforms clinical conversations into comprehensive, accurate medical documentation in real-time.',
    hero_stats: [
      { label: 'Documentation Time Saved', value: '75%' },
      { label: 'Accuracy Rate', value: '98%' },
      { label: 'Languages Supported', value: '2' },
      { label: 'EMR Integrations', value: '5+' }
    ],
    key_benefits: [
      'Real-time transcription and documentation during patient encounters',
      'Automatic SOAP note generation with proper medical formatting',
      'Voice recognition optimized for medical terminology',
      'Seamless integration with existing EMR workflows'
    ],
    how_it_works: [
      'Record patient encounters using voice or text input',
      'AI processes conversation and extracts relevant clinical information',
      'Generate structured SOAP notes, assessments, and treatment plans',
      'Review, edit, and approve documentation before EMR integration'
    ],
    use_cases: [
      'Patient consultations and examinations',
      'Follow-up appointments and medication reviews',
      'Specialist referrals and care coordination',
      'Telehealth visits and remote consultations'
    ],
    target_users: ['Family Physicians', 'Specialists', 'Nurse Practitioners', 'Residents']
  },
  'clinical-decision-support': {
    name: 'Clinical Decision Support',
    tagline: 'Evidence-Based Medicine at Your Fingertips',
    description: 'Advanced AI-powered clinical decision support system that provides evidence-based recommendations, differential diagnoses, and treatment guidelines.',
    hero_stats: [
      { label: 'Medical Databases', value: '50+' },
      { label: 'Clinical Guidelines', value: '1000+' },
      { label: 'Diagnostic Accuracy', value: '95%' },
      { label: 'Response Time', value: '<2s' }
    ],
    key_benefits: [
      'Evidence-based treatment recommendations from current medical literature',
      'Differential diagnosis suggestions based on presenting symptoms',
      'Drug interaction checking and dosage recommendations',
      'Clinical guideline integration for standardized care protocols'
    ],
    how_it_works: [
      'Input patient symptoms, history, and examination findings',
      'AI analyzes data against comprehensive medical knowledge base',
      'Receive ranked differential diagnoses with supporting evidence',
      'Access treatment recommendations and clinical guidelines'
    ],
    use_cases: [
      'Complex diagnostic cases requiring specialist insight',
      'Medication management and drug interaction checking',
      'Preventive care and screening recommendations',
      'Evidence-based treatment planning and protocols'
    ],
    target_users: ['Family Physicians', 'Emergency Medicine', 'Internal Medicine', 'Medical Students']
  },
  'voice-input': {
    name: 'Voice Recognition',
    tagline: 'Hands-Free Clinical Documentation',
    description: 'Advanced voice recognition technology specifically trained on medical terminology and Canadian healthcare contexts for accurate, hands-free documentation.',
    hero_stats: [
      { label: 'Voice Accuracy', value: '99%' },
      { label: 'Medical Terms', value: '100K+' },
      { label: 'Processing Speed', value: 'Real-time' },
      { label: 'Noise Filtering', value: 'Advanced' }
    ],
    key_benefits: [
      'Medical terminology recognition with high accuracy',
      'Real-time transcription during patient encounters',
      'Noise filtering for clinical environment optimization',
      'Support for Canadian English and French medical terms'
    ],
    how_it_works: [
      'Activate voice input during patient consultations',
      'Speak naturally while AI captures and processes audio',
      'Real-time conversion to structured clinical text',
      'Automatic punctuation and medical formatting applied'
    ],
    use_cases: [
      'Hands-free documentation during physical examinations',
      'Dictation of clinical notes and assessments',
      'Voice-activated EMR navigation and data entry',
      'Mobile documentation for bedside care'
    ],
    target_users: ['Physicians', 'Nurses', 'Healthcare Assistants', 'Mobile Care Teams']
  },
  'evidence-based-research': {
    name: 'Evidence-Based Research',
    tagline: 'Latest Medical Literature Integration',
    description: 'Real-time access to current medical research, clinical studies, and evidence-based guidelines to support informed clinical decision-making.',
    hero_stats: [
      { label: 'Research Articles', value: '50M+' },
      { label: 'Medical Journals', value: '5000+' },
      { label: 'Update Frequency', value: 'Daily' },
      { label: 'Search Speed', value: '<1s' }
    ],
    key_benefits: [
      'Access to latest medical research and clinical studies',
      'Evidence grading and quality assessment of sources',
      'Canadian clinical guideline integration',
      'Personalized research recommendations based on practice patterns'
    ],
    how_it_works: [
      'Query medical literature using natural language',
      'AI searches across multiple databases and journals',
      'Receive ranked results with evidence quality ratings',
      'Access full abstracts and clinical relevance summaries'
    ],
    use_cases: [
      'Research support for complex clinical cases',
      'Continuing medical education and knowledge updates',
      'Treatment protocol development and validation',
      'Academic research and clinical study support'
    ],
    target_users: ['Physicians', 'Researchers', 'Medical Educators', 'Clinical Teams']
  },
  'workflow-automation': {
    name: 'Workflow Automation',
    tagline: 'Streamlined Clinical Operations',
    description: 'Intelligent automation of routine clinical tasks and administrative workflows to reduce burden and improve efficiency.',
    hero_stats: [
      { label: 'Tasks Automated', value: '50+' },
      { label: 'Time Saved Daily', value: '2.5 hrs' },
      { label: 'Error Reduction', value: '85%' },
      { label: 'Workflow Types', value: '15+' }
    ],
    key_benefits: [
      'Automated patient follow-up scheduling and reminders',
      'Intelligent task prioritization and workflow optimization',
      'Automated clinical protocol adherence checking',
      'Smart template generation for common procedures'
    ],
    how_it_works: [
      'Configure workflows based on practice patterns',
      'AI learns from user behaviors and preferences',
      'Automatically trigger actions based on clinical events',
      'Monitor and optimize workflow performance continuously'
    ],
    use_cases: [
      'Automated appointment scheduling and patient reminders',
      'Clinical protocol compliance monitoring',
      'Referral management and coordination',
      'Quality assurance and performance tracking'
    ],
    target_users: ['Practice Managers', 'Physicians', 'Administrative Staff', 'Healthcare Teams']
  },
  'medical-documentation': {
    name: 'Medical Documentation',
    tagline: 'Comprehensive Clinical Record Management',
    description: 'Advanced medical documentation system that ensures accurate, complete, and compliant clinical records with automated quality assurance.',
    hero_stats: [
      { label: 'Documentation Types', value: '25+' },
      { label: 'Quality Score', value: '98%' },
      { label: 'Compliance Rate', value: '100%' },
      { label: 'Template Library', value: '500+' }
    ],
    key_benefits: [
      'Standardized documentation templates for consistency',
      'Automated quality assurance and completeness checking',
      'PHIPA/PIPEDA compliant record management',
      'Integration with billing and coding systems'
    ],
    how_it_works: [
      'Select appropriate documentation templates',
      'AI assists with information capture and organization',
      'Automated quality checking and validation',
      'Generate final documents with proper formatting'
    ],
    use_cases: [
      'Clinical encounter documentation and SOAP notes',
      'Procedure reports and surgical documentation',
      'Consultation reports and referral letters',
      'Progress notes and discharge summaries'
    ],
    target_users: ['Physicians', 'Nurses', 'Medical Assistants', 'Quality Assurance Teams']
  },
  'patient-engagement': {
    name: 'Patient Engagement',
    tagline: 'Enhanced Patient Communication',
    description: 'AI-powered patient engagement tools that improve communication, education, and adherence through personalized interactions.',
    hero_stats: [
      { label: 'Engagement Rate', value: '85%' },
      { label: 'Satisfaction Score', value: '92%' },
      { label: 'Languages', value: '12+' },
      { label: 'Communication Channels', value: '5+' }
    ],
    key_benefits: [
      'Personalized patient education materials and resources',
      'Automated appointment reminders and follow-up communications',
      'Medication adherence tracking and support',
      'Multilingual patient communication capabilities'
    ],
    how_it_works: [
      'Analyze patient demographics and health conditions',
      'Generate personalized education and communication content',
      'Automate delivery through preferred communication channels',
      'Track engagement and adjust strategies accordingly'
    ],
    use_cases: [
      'Patient education and health literacy improvement',
      'Medication adherence monitoring and support',
      'Appointment scheduling and reminder systems',
      'Post-visit follow-up and care coordination'
    ],
    target_users: ['Patient Care Teams', 'Nurses', 'Physicians', 'Care Coordinators']
  },
  'phipa-compliance': {
    name: 'PHIPA Compliance',
    tagline: 'Canadian Healthcare Privacy Protection',
    description: 'Comprehensive privacy and security framework ensuring full compliance with PHIPA, PIPEDA, and provincial healthcare privacy regulations.',
    hero_stats: [
      { label: 'Compliance Standards', value: '8+' },
      { label: 'Security Audits', value: 'Quarterly' },
      { label: 'Data Encryption', value: 'AES-256' },
      { label: 'Uptime SLA', value: '99.9%' }
    ],
    key_benefits: [
      'Full PHIPA and PIPEDA compliance framework',
      'End-to-end encryption for all patient data',
      'Canadian data residency and sovereignty',
      'Regular security audits and compliance reporting'
    ],
    how_it_works: [
      'Implement privacy-by-design principles',
      'Encrypt all data transmission and storage',
      'Maintain audit logs for all system access',
      'Regular compliance monitoring and reporting'
    ],
    use_cases: [
      'Patient health information protection',
      'Regulatory compliance reporting',
      'Security incident response and management',
      'Privacy impact assessments and audits'
    ],
    target_users: ['Privacy Officers', 'IT Administrators', 'Compliance Teams', 'Healthcare Organizations']
  },
  'emr-integration': {
    name: 'EMR Integration',
    tagline: 'Seamless Healthcare System Connectivity',
    description: 'Native integration with major Canadian EMR systems for seamless workflow and data synchronization.',
    hero_stats: [
      { label: 'EMR Systems', value: '5+' },
      { label: 'API Endpoints', value: '100+' },
      { label: 'Sync Speed', value: 'Real-time' },
      { label: 'Uptime', value: '99.9%' }
    ],
    key_benefits: [
      'Native integration with OSCAR, TELUS PS Suite, Epic, and more',
      'Real-time data synchronization and workflow integration',
      'Minimal disruption to existing clinical workflows',
      'Comprehensive API support for custom integrations'
    ],
    how_it_works: [
      'Connect to EMR system using secure APIs',
      'Synchronize patient data and clinical information',
      'Integrate AI features within EMR interface',
      'Maintain real-time data consistency'
    ],
    use_cases: [
      'Clinical documentation within EMR workflows',
      'Patient data synchronization and management',
      'Workflow optimization and automation',
      'Custom integration development'
    ],
    target_users: ['IT Administrators', 'Physicians', 'Practice Managers', 'Healthcare IT Teams']
  },
  'physician-burnout-reduction': {
    name: 'Physician Burnout Reduction',
    tagline: 'Restoring Joy in Medicine',
    description: 'Comprehensive solution designed to reduce administrative burden and restore physician satisfaction through intelligent automation.',
    hero_stats: [
      { label: 'Burnout Reduction', value: '68%' },
      { label: 'Satisfaction Increase', value: '73%' },
      { label: 'Admin Time Saved', value: '2.5 hrs/day' },
      { label: 'Physician Retention', value: '+45%' }
    ],
    key_benefits: [
      'Significant reduction in documentation time and administrative burden',
      'Improved work-life balance through efficient workflows',
      'Enhanced job satisfaction and professional fulfillment',
      'Reduced cognitive load through intelligent assistance'
    ],
    how_it_works: [
      'Automate routine administrative tasks and documentation',
      'Provide intelligent clinical decision support',
      'Streamline workflows and eliminate redundancies',
      'Monitor burnout indicators and provide interventions'
    ],
    use_cases: [
      'Administrative burden reduction and workflow optimization',
      'Clinical decision support and efficiency improvement',
      'Work-life balance enhancement',
      'Professional satisfaction and retention programs'
    ],
    target_users: ['Physicians', 'Healthcare Administrators', 'Medical Directors', 'Wellness Committees']
  }
}

type FeatureKey = keyof typeof features

interface PageProps {
  params: {
    feature: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const feature = features[params.feature as FeatureKey]
  
  if (!feature) {
    return {
      title: 'Feature Not Found',
      description: 'The requested feature information could not be found.'
    }
  }

  return {
    title: `${feature.name} - MedAssist AI Clinical Assistant | Canadian Healthcare`,
    description: `${feature.description} ${feature.tagline}. PHIPA compliant AI for Canadian physicians. Reduce documentation time and improve patient care.`,
    keywords: [
      feature.name.toLowerCase(),
      'MedAssist features',
      'AI clinical assistant',
      'Canadian healthcare AI',
      'PHIPA compliant AI',
      'medical documentation AI',
      'clinical decision support'
    ].join(', '),
    openGraph: {
      title: `${feature.name} - MedAssist AI Features`,
      description: `${feature.tagline}. ${feature.description}`,
      url: `https://medassist.ca/features/${params.feature}`,
    },
    alternates: {
      canonical: `/features/${params.feature}`,
    }
  }
}

export async function generateStaticParams() {
  return Object.keys(features).map((feature) => ({
    feature: feature,
  }))
}

export default function FeaturePage({ params }: PageProps) {
  const feature = features[params.feature as FeatureKey]
  
  if (!feature) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-b border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {feature.name}
            </h1>
            <p className="text-2xl text-blue-600 font-semibold mb-4">
              {feature.tagline}
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {feature.hero_stats.map((stat, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Benefits
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {feature.key_benefits.map((benefit, index) => (
              <div key={index} className="flex items-start p-6 bg-gray-50 rounded-2xl">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          
          <div className="space-y-6">
            {feature.how_it_works.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  {index + 1}
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex-1">
                  <p className="text-gray-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Common Use Cases
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {feature.use_cases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{useCase}</h3>
                <p className="text-sm text-gray-600">
                  Optimized workflow and enhanced efficiency for this common clinical scenario.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Perfect For
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {feature.target_users.map((user, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">{user}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Specifically designed for {user.toLowerCase()} workflows and requirements.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Experience {feature.name} Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Canadian healthcare professionals using MedAssist to transform their practice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/demo"
              className="bg-white text-blue-600 px-8 py-4 font-semibold hover:bg-gray-50 transition-colors rounded-xl shadow-lg"
            >
              Schedule Demo
            </Link>
            <Link 
              href="/trial"
              className="bg-transparent text-white px-8 py-4 font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors rounded-xl"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Related Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Explore More Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(features)
              .filter(([key]) => key !== params.feature)
              .slice(0, 3)
              .map(([key, relatedFeature]) => (
                <Link 
                  key={key} 
                  href={`/features/${key}`}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-colors group"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                    {relatedFeature.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {relatedFeature.tagline}
                  </p>
                  <div className="text-blue-600 font-medium text-sm group-hover:gap-2 flex items-center">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": feature.name,
            "description": feature.description,
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web-based",
            "featureList": feature.key_benefits,
            "audience": feature.target_users,
            "countriesSupported": "CA",
            "inLanguage": "en-CA",
            "provider": {
              "@type": "Organization",
              "name": "MedAssist",
              "url": "https://medassist.ca"
            }
          })
        }}
      />
    </div>
  )
} 