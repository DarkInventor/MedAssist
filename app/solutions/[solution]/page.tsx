import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Solutions data for MedAssist solution categories
const solutions = {
  'documentation-automation': {
    name: 'Documentation Automation',
    tagline: 'Eliminate Manual Documentation Burden',
    description: 'Comprehensive automation solution that transforms clinical documentation from a time-consuming burden into an efficient, accurate process.',
    problem_statement: 'Physicians spend 40% of their time on documentation, leading to burnout and reduced patient interaction.',
    solution_overview: 'MedAssist automates clinical documentation through AI-powered transcription, intelligent note generation, and seamless EMR integration.',
    key_metrics: [
      { label: 'Time Saved', value: '75%', description: 'Reduction in documentation time' },
      { label: 'Accuracy Rate', value: '98%', description: 'Clinical documentation accuracy' },
      { label: 'Physician Satisfaction', value: '92%', description: 'User satisfaction rating' },
      { label: 'ROI Timeline', value: '3 months', description: 'Return on investment' }
    ],
    benefits: [
      'Automated SOAP note generation from patient encounters',
      'Real-time transcription with medical terminology recognition',
      'Seamless integration with existing EMR workflows',
      'Quality assurance and completeness checking',
      'Reduced administrative burden and improved work-life balance'
    ],
    features: [
      'AI-powered voice recognition and transcription',
      'Intelligent clinical note structuring and formatting',
      'EMR integration with major Canadian systems',
      'Quality checking and validation algorithms',
      'Customizable templates and workflows'
    ],
    use_cases: [
      {
        title: 'Family Practice Efficiency',
        description: 'Automate routine visit documentation and chronic disease management notes',
        impact: '60% reduction in after-hours documentation work'
      },
      {
        title: 'Specialist Consultation Reports',
        description: 'Generate comprehensive consultation reports and referral letters',
        impact: '80% faster report turnaround time'
      },
      {
        title: 'Emergency Department Documentation',
        description: 'Rapid documentation for high-volume emergency encounters',
        impact: '50% improvement in patient throughput'
      }
    ],
    target_personas: ['Family Physicians', 'Specialists', 'Emergency Medicine', 'Rural Practitioners']
  },
  'clinical-decision-support': {
    name: 'Clinical Decision Support',
    tagline: 'Evidence-Based Medicine Enhanced by AI',
    description: 'Advanced clinical decision support system that enhances diagnostic accuracy and treatment planning through AI-powered evidence-based recommendations.',
    problem_statement: 'Keeping up with rapidly evolving medical knowledge while making accurate diagnoses under time pressure is increasingly challenging.',
    solution_overview: 'MedAssist provides real-time access to evidence-based recommendations, differential diagnoses, and treatment guidelines powered by comprehensive medical databases.',
    key_metrics: [
      { label: 'Diagnostic Accuracy', value: '95%', description: 'Improvement in diagnostic precision' },
      { label: 'Medical Databases', value: '50+', description: 'Integrated knowledge sources' },
      { label: 'Response Time', value: '<2 seconds', description: 'Clinical recommendation speed' },
      { label: 'Guideline Coverage', value: '100%', description: 'Canadian clinical guidelines' }
    ],
    benefits: [
      'Evidence-based differential diagnosis suggestions',
      'Real-time drug interaction and dosage checking',
      'Integration with Canadian clinical practice guidelines',
      'Personalized treatment recommendations based on patient history',
      'Continuous learning from latest medical research'
    ],
    features: [
      'Comprehensive medical knowledge base integration',
      'Natural language query processing',
      'Risk stratification and clinical scoring tools',
      'Drug database with Canadian formulary integration',
      'Clinical guideline adherence monitoring'
    ],
    use_cases: [
      {
        title: 'Complex Diagnostic Cases',
        description: 'Support for challenging cases requiring specialist-level insight',
        impact: '40% improvement in diagnostic confidence'
      },
      {
        title: 'Medication Management',
        description: 'Comprehensive drug interaction checking and dosage optimization',
        impact: '85% reduction in medication errors'
      },
      {
        title: 'Preventive Care Protocols',
        description: 'Automated screening recommendations and preventive care reminders',
        impact: '60% increase in preventive care compliance'
      }
    ],
    target_personas: ['Primary Care Physicians', 'Emergency Medicine', 'Internal Medicine', 'Medical Residents']
  },
  'voice-recognition': {
    name: 'Voice Recognition',
    tagline: 'Hands-Free Clinical Documentation',
    description: 'State-of-the-art voice recognition technology specifically optimized for medical terminology and clinical environments.',
    problem_statement: 'Traditional documentation methods interrupt patient interaction and slow down clinical workflows.',
    solution_overview: 'MedAssist voice recognition enables hands-free documentation with medical-grade accuracy, allowing physicians to focus on patient care.',
    key_metrics: [
      { label: 'Voice Accuracy', value: '99%', description: 'Medical terminology recognition' },
      { label: 'Processing Speed', value: 'Real-time', description: 'Live transcription capability' },
      { label: 'Noise Filtering', value: 'Advanced', description: 'Clinical environment optimization' },
      { label: 'Language Support', value: '2 Languages', description: 'English and French Canadian' }
    ],
    benefits: [
      'Hands-free documentation during patient encounters',
      'Real-time transcription with medical terminology accuracy',
      'Noise filtering optimized for clinical environments',
      'Support for Canadian English and French medical terms',
      'Seamless integration with existing documentation workflows'
    ],
    features: [
      'Medical-grade speech recognition engine',
      'Advanced noise cancellation and filtering',
      'Medical terminology dictionary with 100K+ terms',
      'Real-time transcription and formatting',
      'Multi-speaker recognition and identification'
    ],
    use_cases: [
      {
        title: 'Bedside Documentation',
        description: 'Document patient encounters while maintaining eye contact and engagement',
        impact: '70% increase in patient interaction quality'
      },
      {
        title: 'Mobile Documentation',
        description: 'Voice documentation for home visits and mobile care scenarios',
        impact: '90% improvement in field documentation efficiency'
      },
      {
        title: 'Surgical Procedure Notes',
        description: 'Hands-free operative note dictation during procedures',
        impact: '80% reduction in post-procedure documentation time'
      }
    ],
    target_personas: ['Surgeons', 'Emergency Physicians', 'Mobile Care Teams', 'Specialists']
  },
  'patient-engagement': {
    name: 'Patient Engagement',
    tagline: 'Enhanced Patient Communication and Care',
    description: 'Comprehensive patient engagement platform that improves communication, education, and adherence through personalized AI-powered interactions.',
    problem_statement: 'Poor patient communication and engagement leads to reduced adherence, worse outcomes, and increased healthcare costs.',
    solution_overview: 'MedAssist enhances patient engagement through personalized education, automated communication, and intelligent care coordination tools.',
    key_metrics: [
      { label: 'Engagement Rate', value: '85%', description: 'Patient interaction improvement' },
      { label: 'Satisfaction Score', value: '92%', description: 'Patient satisfaction rating' },
      { label: 'Adherence Rate', value: '78%', description: 'Medication compliance improvement' },
      { label: 'Communication Channels', value: '5+', description: 'Multi-channel support' }
    ],
    benefits: [
      'Personalized patient education materials and resources',
      'Automated appointment reminders and follow-up communications',
      'Medication adherence tracking and support',
      'Multilingual patient communication capabilities',
      'Care coordination and family involvement tools'
    ],
    features: [
      'Personalized patient education content generation',
      'Automated communication workflows',
      'Medication adherence monitoring tools',
      'Multi-channel communication platform',
      'Patient portal integration and management'
    ],
    use_cases: [
      {
        title: 'Chronic Disease Management',
        description: 'Ongoing support and education for patients with chronic conditions',
        impact: '65% improvement in disease management outcomes'
      },
      {
        title: 'Post-Procedure Care',
        description: 'Automated follow-up and recovery monitoring after procedures',
        impact: '50% reduction in post-procedure complications'
      },
      {
        title: 'Preventive Care Engagement',
        description: 'Proactive engagement for screening and preventive care measures',
        impact: '80% increase in preventive care participation'
      }
    ],
    target_personas: ['Family Physicians', 'Chronic Care Teams', 'Patient Care Coordinators', 'Nurses']
  },
  'billing-optimization': {
    name: 'Billing Optimization',
    tagline: 'Maximized Revenue Through Accurate Coding',
    description: 'Intelligent billing optimization solution that ensures accurate coding, maximizes reimbursement, and reduces administrative overhead.',
    problem_statement: 'Inaccurate coding and billing inefficiencies result in lost revenue and increased administrative burden for healthcare practices.',
    solution_overview: 'MedAssist optimizes billing through AI-powered coding suggestions, automated claim preparation, and revenue cycle management.',
    key_metrics: [
      { label: 'Revenue Increase', value: '15%', description: 'Average practice revenue improvement' },
      { label: 'Coding Accuracy', value: '98%', description: 'Billing code accuracy rate' },
      { label: 'Claim Denial Rate', value: '2%', description: 'Reduction in claim denials' },
      { label: 'Processing Time', value: '75%', description: 'Faster billing cycle' }
    ],
    benefits: [
      'Automated ICD-10 and CPT code suggestions',
      'Real-time billing compliance checking',
      'Integration with provincial billing systems',
      'Denial management and resubmission automation',
      'Revenue cycle analytics and optimization'
    ],
    features: [
      'AI-powered medical coding assistance',
      'Automated claim preparation and submission',
      'Provincial billing system integration',
      'Revenue cycle management tools',
      'Billing analytics and reporting dashboard'
    ],
    use_cases: [
      {
        title: 'Primary Care Billing',
        description: 'Streamlined billing for family practice and general medicine',
        impact: '20% increase in billing accuracy and revenue'
      },
      {
        title: 'Specialist Billing Optimization',
        description: 'Complex procedure coding and specialty billing management',
        impact: '25% improvement in reimbursement rates'
      },
      {
        title: 'Multi-Provider Practice',
        description: 'Centralized billing management for group practices',
        impact: '40% reduction in billing administrative time'
      }
    ],
    target_personas: ['Practice Managers', 'Billing Administrators', 'Physicians', 'Healthcare Executives']
  },
  'workflow-improvement': {
    name: 'Workflow Improvement',
    tagline: 'Optimized Clinical Operations',
    description: 'Comprehensive workflow optimization solution that streamlines clinical operations, reduces inefficiencies, and improves patient flow.',
    problem_statement: 'Inefficient workflows lead to physician burnout, reduced patient satisfaction, and operational inefficiencies.',
    solution_overview: 'MedAssist analyzes and optimizes clinical workflows through AI-powered process improvement, automation, and intelligent task management.',
    key_metrics: [
      { label: 'Efficiency Gain', value: '60%', description: 'Workflow efficiency improvement' },
      { label: 'Patient Throughput', value: '40%', description: 'Increase in patient capacity' },
      { label: 'Wait Times', value: '50%', description: 'Reduction in patient wait times' },
      { label: 'Staff Satisfaction', value: '88%', description: 'Improved staff satisfaction' }
    ],
    benefits: [
      'Automated workflow optimization and task management',
      'Intelligent scheduling and resource allocation',
      'Real-time performance monitoring and analytics',
      'Process standardization and quality improvement',
      'Staff productivity enhancement and satisfaction'
    ],
    features: [
      'Workflow analysis and optimization tools',
      'Automated task management and prioritization',
      'Real-time dashboard and analytics',
      'Resource planning and allocation systems',
      'Performance measurement and improvement tracking'
    ],
    use_cases: [
      {
        title: 'Patient Flow Optimization',
        description: 'Streamlined patient scheduling and clinic flow management',
        impact: '45% reduction in patient wait times'
      },
      {
        title: 'Staff Resource Management',
        description: 'Optimal staff scheduling and task allocation',
        impact: '35% improvement in staff productivity'
      },
      {
        title: 'Quality Improvement Programs',
        description: 'Systematic quality improvement and performance monitoring',
        impact: '50% improvement in quality metrics'
      }
    ],
    target_personas: ['Practice Managers', 'Healthcare Administrators', 'Quality Officers', 'Clinical Directors']
  }
}

type SolutionKey = keyof typeof solutions

interface PageProps {
  params: {
    solution: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const solution = solutions[params.solution as SolutionKey]
  
  if (!solution) {
    return {
      title: 'Solution Not Found',
      description: 'The requested solution information could not be found.'
    }
  }

  return {
    title: `${solution.name} - MedAssist AI Solutions | Canadian Healthcare`,
    description: `${solution.description} ${solution.tagline}. PHIPA compliant AI solution for Canadian healthcare practices. Improve efficiency and patient care.`,
    keywords: [
      solution.name.toLowerCase(),
      'MedAssist solutions',
      'healthcare AI solutions',
      'Canadian healthcare technology',
      'PHIPA compliant AI',
      'medical practice optimization',
      'clinical workflow automation'
    ].join(', '),
    openGraph: {
      title: `${solution.name} - MedAssist AI Solutions`,
      description: `${solution.tagline}. ${solution.description}`,
      url: `https://medassist.ca/solutions/${params.solution}`,
    },
    alternates: {
      canonical: `/solutions/${params.solution}`,
    }
  }
}

export async function generateStaticParams() {
  return Object.keys(solutions).map((solution) => ({
    solution: solution,
  }))
}

export default function SolutionPage({ params }: PageProps) {
  const solution = solutions[params.solution as SolutionKey]
  
  if (!solution) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {solution.name}
            </h1>
            <p className="text-2xl text-blue-600 font-semibold mb-6">
              {solution.tagline}
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {solution.description}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {solution.key_metrics.map((metric, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{metric.label}</div>
                <div className="text-xs text-gray-600">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem & Solution */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {solution.problem_statement}
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {solution.solution_overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Benefits
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.benefits.map((benefit, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Core Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {solution.features.map((feature, index) => (
              <div key={index} className="flex items-start p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  {index + 1}
                </div>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Real-World Applications
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {solution.use_cases.map((useCase, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-6">{useCase.description}</p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-green-800">{useCase.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Personas */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Perfect For
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {solution.target_personas.map((persona, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{persona}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Tailored specifically for {persona.toLowerCase()} workflows and requirements.
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
            Transform Your Practice with {solution.name}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Canadian healthcare professionals who have revolutionized their practice with MedAssist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/demo"
              className="bg-white text-blue-600 px-8 py-4 font-semibold hover:bg-gray-50 transition-colors rounded-xl shadow-lg"
            >
              Schedule Solution Demo
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

      {/* Related Solutions */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Explore More Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(solutions)
              .filter(([key]) => key !== params.solution)
              .slice(0, 3)
              .map(([key, relatedSolution]) => (
                <Link 
                  key={key} 
                  href={`/solutions/${key}`}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-colors group"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                    {relatedSolution.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {relatedSolution.tagline}
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
            "@type": "Service",
            "name": solution.name,
            "description": solution.description,
            "provider": {
              "@type": "Organization",
              "name": "MedAssist",
              "url": "https://medassist.ca"
            },
            "areaServed": "CA",
            "audience": solution.target_personas,
            "serviceType": "Healthcare Technology Solution"
          })
        }}
      />
    </div>
  )
} 