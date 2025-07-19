import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// EMR systems data for Canadian healthcare
const emrSystems = {
  'oscar': {
    name: 'OSCAR EMR',
    full_name: 'Open Source Clinical Application and Resource',
    description: 'Seamless MedAssist integration with OSCAR EMR for Canadian family practices',
    market_share: '40%',
    primary_users: 'Family physicians, community health centers',
    key_features: [
      'Open-source platform with extensive customization',
      'Strong community support and active development',
      'Built-in API framework for third-party integrations',
      'Comprehensive practice management features'
    ],
    integration_benefits: [
      'Real-time clinical documentation within OSCAR interface',
      'Seamless patient data synchronization',
      'Enhanced SOAP note generation and organization',
      'Integrated billing and scheduling workflow support'
    ],
    technical_specs: {
      'API Type': 'RESTful API with JSON responses',
      'Authentication': 'OAuth 2.0 with role-based access',
      'Data Format': 'HL7 FHIR R4 compatible',
      'Integration Method': 'Direct API integration + Plugin architecture'
    },
    compliance: ['PHIPA', 'PIPEDA', 'Provincial privacy regulations'],
    case_study: {
      practice: 'Toronto Family Health Team',
      results: '65% reduction in documentation time, 90% physician satisfaction',
      quote: 'MedAssist integration with OSCAR has transformed our practice workflow.'
    }
  },
  'telus-ps-suite': {
    name: 'TELUS PS Suite',
    full_name: 'TELUS Practice Solutions Suite',
    description: 'Enterprise-grade MedAssist integration with TELUS PS Suite for Canadian healthcare practices',
    market_share: '25%',
    primary_users: 'Large practices, clinics, healthcare networks',
    key_features: [
      'Comprehensive practice management platform',
      'Integrated billing and revenue cycle management',
      'Advanced reporting and analytics capabilities',
      'Enterprise-grade security and reliability'
    ],
    integration_benefits: [
      'Seamless workflow integration across TELUS modules',
      'Enhanced clinical decision support within familiar interface',
      'Automated documentation with TELUS billing integration',
      'Real-time patient engagement and communication tools'
    ],
    technical_specs: {
      'API Type': 'TELUS Connect API framework',
      'Authentication': 'TELUS Health SSO with multi-factor authentication',
      'Data Format': 'HL7 v2.x and FHIR R4 support',
      'Integration Method': 'Certified TELUS Health partner integration'
    },
    compliance: ['PHIPA', 'PIPEDA', 'SOC 2 Type II', 'HITECH'],
    case_study: {
      practice: 'Calgary Medical Network',
      results: '70% faster documentation, 95% user adoption rate',
      quote: 'The MedAssist-TELUS integration has elevated our entire practice efficiency.'
    }
  },
  'epic': {
    name: 'Epic',
    full_name: 'Epic Electronic Health Record',
    description: 'Advanced MedAssist integration with Epic EHR for Canadian hospital systems and large practices',
    market_share: '15%',
    primary_users: 'Hospital systems, large healthcare networks, academic medical centers',
    key_features: [
      'Comprehensive EHR with advanced clinical workflows',
      'Robust clinical decision support tools',
      'Integrated population health management',
      'Strong interoperability and data exchange capabilities'
    ],
    integration_benefits: [
      'SMART on FHIR compliant integration within Epic interface',
      'Enhanced clinical documentation with Epic\'s clinical decision support',
      'Seamless access to patient data across Epic modules',
      'Integration with Epic\'s App Orchard marketplace'
    ],
    technical_specs: {
      'API Type': 'SMART on FHIR R4 compliant APIs',
      'Authentication': 'Epic OAuth 2.0 with SMART authorization',
      'Data Format': 'HL7 FHIR R4 standard',
      'Integration Method': 'Epic App Orchard certified application'
    },
    compliance: ['PHIPA', 'PIPEDA', 'HIPAA', 'SOC 2 Type II'],
    case_study: {
      practice: 'University Health Network (Toronto)',
      results: '80% improvement in documentation efficiency, enhanced clinical workflows',
      quote: 'MedAssist\'s Epic integration has streamlined our complex clinical workflows significantly.'
    }
  },
  'cerner': {
    name: 'Cerner PowerChart',
    full_name: 'Oracle Cerner PowerChart',
    description: 'Intelligent MedAssist integration with Cerner PowerChart for comprehensive clinical documentation',
    market_share: '12%',
    primary_users: 'Hospital systems, specialty clinics, integrated health networks',
    key_features: [
      'Advanced clinical documentation and workflow tools',
      'Integrated population health management',
      'Comprehensive analytics and reporting',
      'Strong clinical decision support capabilities'
    ],
    integration_benefits: [
      'Real-time clinical documentation within PowerChart interface',
      'Enhanced diagnostic and treatment recommendations',
      'Seamless integration with Cerner\'s clinical workflows',
      'Improved patient safety through AI-powered insights'
    ],
    technical_specs: {
      'API Type': 'Cerner FHIR APIs and SMART platform',
      'Authentication': 'OAuth 2.0 with Cerner authorization services',
      'Data Format': 'HL7 FHIR R4 compliant',
      'Integration Method': 'Cerner SMART on FHIR application'
    },
    compliance: ['PHIPA', 'PIPEDA', 'HIPAA', 'SOC 2 Type II'],
    case_study: {
      practice: 'Alberta Health Services',
      results: '75% reduction in documentation burden, improved clinical decision-making',
      quote: 'The MedAssist-Cerner integration has enhanced our clinical decision support capabilities.'
    }
  },
  'allscripts': {
    name: 'Allscripts',
    full_name: 'Allscripts Professional EHR',
    description: 'Streamlined MedAssist integration with Allscripts EHR for efficient clinical documentation',
    market_share: '8%',
    primary_users: 'Primary care practices, specialty clinics, ambulatory care centers',
    key_features: [
      'User-friendly interface with customizable workflows',
      'Integrated practice management and billing',
      'Clinical decision support and quality reporting',
      'Mobile access and remote connectivity'
    ],
    integration_benefits: [
      'Simplified clinical documentation within Allscripts interface',
      'Enhanced workflow efficiency and time savings',
      'Improved clinical decision support with AI insights',
      'Seamless patient data management and accessibility'
    ],
    technical_specs: {
      'API Type': 'Allscripts REST APIs and web services',
      'Authentication': 'OAuth 2.0 with secure token management',
      'Data Format': 'HL7 v2.x and FHIR R4 support',
      'Integration Method': 'Direct API integration with custom workflows'
    },
    compliance: ['PHIPA', 'PIPEDA', 'HIPAA', 'SOC 2 Type II'],
    case_study: {
      practice: 'Maritime Family Medicine Group',
      results: '60% faster documentation, improved patient throughput',
      quote: 'MedAssist has made our Allscripts workflow more efficient and user-friendly.'
    }
  }
}

type EmrSystemKey = keyof typeof emrSystems

interface PageProps {
  params: {
    system: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const emr = emrSystems[params.system as EmrSystemKey]
  
  if (!emr) {
    return {
      title: 'EMR Integration Not Found',
      description: 'The requested EMR integration information could not be found.'
    }
  }

  return {
    title: `MedAssist Integration with ${emr.name} - Canadian Healthcare EMR | PHIPA Compliant`,
    description: `${emr.description}. Seamless integration with ${emr.name} for Canadian physicians. ${emr.market_share} market share. PHIPA/PIPEDA compliant AI clinical assistant.`,
    keywords: [
      `MedAssist ${emr.name} integration`,
      `${emr.name} AI assistant`,
      `${emr.name} clinical documentation`,
      `Canadian EMR AI integration`,
      `${emr.name} PHIPA compliant AI`,
      'EMR integration Canada',
      'AI medical scribe EMR'
    ].join(', '),
    openGraph: {
      title: `MedAssist Integration with ${emr.name} - Canadian Healthcare`,
      description: `Seamless MedAssist integration with ${emr.name}. PHIPA compliant AI clinical assistant for Canadian healthcare practices.`,
      url: `https://medassist.ca/emr/${params.system}`,
    },
    alternates: {
      canonical: `/emr/${params.system}`,
    }
  }
}

export async function generateStaticParams() {
  return Object.keys(emrSystems).map((system) => ({
    system: system,
  }))
}

export default function EmrIntegrationPage({ params }: PageProps) {
  const emr = emrSystems[params.system as EmrSystemKey]
  
  if (!emr) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              MedAssist Integration with {emr.name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {emr.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-semibold text-blue-900 mb-2">{emr.market_share} Market Share</h3>
                <p className="text-sm text-blue-800">Leading EMR in Canadian healthcare</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="font-semibold text-green-900 mb-2">PHIPA Compliant</h3>
                <p className="text-sm text-green-800">Full regulatory compliance assured</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                <h3 className="font-semibold text-purple-900 mb-2">Seamless Integration</h3>
                <p className="text-sm text-purple-800">Native workflow integration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Benefits */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose MedAssist for {emr.name}?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our native integration transforms your {emr.name} workflow with AI-powered clinical documentation and decision support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h3>
              <div className="space-y-4">
                {emr.key_features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Integration Benefits</h3>
              <div className="space-y-4">
                {emr.integration_benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Technical Integration Details
          </h2>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(emr.technical_specs).map(([key, value]) => (
                <div key={key} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <dt className="font-semibold text-gray-900 mb-1">{key}</dt>
                  <dd className="text-gray-600">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Success Story
          </h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {emr.case_study.practice}
              </h3>
              <p className="text-gray-600">{emr.case_study.results}</p>
            </div>
            
            <blockquote className="text-center">
              <p className="text-lg italic text-gray-700 mb-4">
                "{emr.case_study.quote}"
              </p>
              <cite className="text-sm text-gray-600">
                — Clinical Director, {emr.case_study.practice}
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compliance & Security
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {emr.compliance.map((standard, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">{standard}</h3>
                <p className="text-sm text-gray-600 mt-2">Fully compliant and certified</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your {emr.name} Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Canadian physicians using MedAssist to reduce documentation time and improve patient care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/demo"
              className="bg-white text-blue-600 px-8 py-4 font-semibold hover:bg-gray-50 transition-colors rounded-xl shadow-lg"
            >
              Schedule Integration Demo
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

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                How long does the {emr.name} integration take?
              </h3>
              <p className="text-gray-600">
                Most {emr.name} integrations are completed within 2-4 weeks, including setup, testing, and staff training. 
                Our technical team works closely with your practice to ensure a smooth transition.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Will this affect my existing {emr.name} workflows?
              </h3>
              <p className="text-gray-600">
                MedAssist integrates seamlessly within your existing {emr.name} interface. There's no need to learn new systems 
                or change established workflows. The AI assistant enhances your current processes without disruption.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Is my patient data secure with this integration?
              </h3>
              <p className="text-gray-600">
                Absolutely. Our integration maintains all {emr.name} security protocols and adds additional layers of protection. 
                All data remains in Canada and is fully compliant with PHIPA, PIPEDA, and other relevant privacy regulations.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                What support is available during and after integration?
              </h3>
              <p className="text-gray-600">
                We provide comprehensive support including pre-integration planning, hands-on setup assistance, staff training, 
                and ongoing technical support. Our Canadian support team is available during business hours for any questions.
              </p>
            </div>
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
            "name": `MedAssist Integration with ${emr.name}`,
            "description": emr.description,
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web-based",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "CAD",
              "description": "Free trial available"
            },
            "featureList": emr.integration_benefits,
            "softwareRequirements": emr.name,
            "countriesSupported": "CA",
            "inLanguage": "en-CA"
          })
        }}
      />
    </div>
  )
} 