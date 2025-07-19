import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PhysicianAssistant } from '../../../components/physician-assistant'

// Specialty data targeting primary care providers as mentioned in research
const specialties = {
  'family-physicians': {
    name: 'Family Physicians',
    formal_name: 'Family Medicine',
    description: 'Comprehensive AI clinical assistant designed specifically for family medicine practice',
    target_audience: 'Family physicians, family medicine residents, and FHT practitioners',
    key_challenges: [
      'High patient volume and time constraints',
      'Complex documentation requirements',
      'Diverse case presentations requiring broad knowledge',
      'Administrative burden reducing patient interaction time'
    ],
    medassist_benefits: [
      'Reduce documentation time by up to 75%',
      'Access evidence-based research for diverse conditions',
      'Streamlined workflow for family practice EMRs',
      'Support for preventive care and chronic disease management'
    ],
    use_cases: [
      'Annual physical examinations',
      'Chronic disease management',
      'Acute care visits',
      'Preventive care documentation',
      'Referral letter generation',
      'Medication management'
    ],
    canada_specific: [
      'Integration with OSCAR EMR (most popular in family practice)',
      'PHIPA/PIPEDA compliance for all provinces',
      'Canadian clinical guidelines integration',
      'Bilingual support (English/French)'
    ],
    statistics: {
      practitioners: '35,000+',
      burnout_rate: '94%',
      admin_time: '40%',
      shortage: 'Critical shortage nationwide'
    }
  },
  'nurse-practitioners': {
    name: 'Nurse Practitioners',
    formal_name: 'Nurse Practitioner',
    description: 'AI-powered clinical assistant supporting nurse practitioners in primary care settings',
    target_audience: 'Nurse practitioners, NP students, and primary care nurses',
    key_challenges: [
      'Expanding scope of practice requiring diverse knowledge',
      'Documentation standards matching physician requirements',
      'Time management in busy community clinics',
      'Staying current with evidence-based practice'
    ],
    medassist_benefits: [
      'Comprehensive clinical decision support',
      'Streamlined documentation matching NP standards',
      'Evidence-based care recommendations',
      'Integration with community health workflows'
    ],
    use_cases: [
      'Primary care consultations',
      'Chronic disease monitoring',
      'Health promotion and disease prevention',
      'Minor procedures documentation',
      'Prescription management',
      'Care coordination'
    ],
    canada_specific: [
      'Provincial NP scope compliance',
      'Community Health Centre (CHC) workflows',
      'Indigenous health considerations',
      'Rural and remote practice support'
    ],
    statistics: {
      practitioners: '6,000+',
      burnout_rate: '89%',
      admin_time: '35%',
      shortage: 'Growing demand, especially rural'
    }
  },
  'pediatricians': {
    name: 'Community Pediatricians',
    formal_name: 'Pediatrics',
    description: 'Specialized AI assistant for pediatric primary care and community pediatrics',
    target_audience: 'Community pediatricians, general pediatricians, and pediatric residents',
    key_challenges: [
      'Age-specific dosing and treatment protocols',
      'Developmental milestone tracking',
      'Parent communication and education',
      'Complex vaccination schedules'
    ],
    medassist_benefits: [
      'Pediatric-specific clinical guidelines',
      'Growth chart integration and monitoring',
      'Vaccination schedule management',
      'Age-appropriate treatment recommendations'
    ],
    use_cases: [
      'Well-child visits',
      'Vaccination documentation',
      'Developmental assessments',
      'Acute pediatric illness',
      'Parent education materials',
      'School forms and clearances'
    ],
    canada_specific: [
      'Canadian vaccination schedules by province',
      'Public health integration',
      'Pediatric emergency protocols',
      'Indigenous child health considerations'
    ],
    statistics: {
      practitioners: '3,000+',
      burnout_rate: '78%',
      admin_time: '30%',
      shortage: 'Moderate shortage in rural areas'
    }
  },
  'rural-physicians': {
    name: 'Rural Physicians',
    formal_name: 'Rural Medicine',
    description: 'Comprehensive AI clinical assistant designed for rural and remote practice challenges',
    target_audience: 'Rural family physicians, remote practice doctors, and fly-in specialists',
    key_challenges: [
      'Limited specialist consultation access',
      'Broad scope of practice requirements',
      'Emergency medicine responsibilities',
      'Resource constraints and isolation'
    ],
    medassist_benefits: [
      'Comprehensive medical knowledge for diverse cases',
      'Emergency medicine decision support',
      'Teleconsultation documentation support',
      'Resource-appropriate treatment recommendations'
    ],
    use_cases: [
      'Emergency department coverage',
      'Multi-specialty consultations',
      'Telemedicine visits',
      'Obstetric and surgical procedures',
      'Mental health assessments',
      'Occupational health'
    ],
    canada_specific: [
      'Remote practice guidelines',
      'Indigenous health protocols',
      'Northern and territorial considerations',
      'Limited connectivity optimization'
    ],
    statistics: {
      practitioners: '8,000+',
      burnout_rate: '96%',
      admin_time: '45%',
      shortage: 'Severe shortage nationwide'
    }
  }
} as const

type SpecialtyKey = keyof typeof specialties

interface PageProps {
  params: {
    specialty: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const specialty = specialties[params.specialty as SpecialtyKey]
  
  if (!specialty) {
    return {
      title: 'Specialty Not Found',
      description: 'The requested specialty page could not be found.'
    }
  }

  return {
    title: `MedAssist for ${specialty.name} - AI Clinical Assistant | Canadian Primary Care`,
    description: `${specialty.description}. Reduce documentation burden, improve patient care, and access evidence-based medicine with PHIPA/PIPEDA compliant AI designed for ${specialty.name.toLowerCase()}.`,
    keywords: [
      `AI assistant ${specialty.name.toLowerCase()}`,
      `${specialty.formal_name} AI`,
      `medical AI ${specialty.name.toLowerCase()}`,
      `${specialty.name.toLowerCase()} documentation AI`,
      `${specialty.name.toLowerCase()} clinical decision support`,
      'primary care AI Canada',
      'PHIPA compliant medical AI'
    ].join(', '),
    openGraph: {
      title: `MedAssist for ${specialty.name} - AI Clinical Assistant`,
      description: `Specialized AI clinical assistant for ${specialty.name.toLowerCase()}. PHIPA compliant, EMR integrated, designed for Canadian primary care.`,
      url: `https://medassist.ca/for/${params.specialty}`,
    },
    alternates: {
      canonical: `/for/${params.specialty}`,
    }
  }
}

export async function generateStaticParams() {
  return Object.keys(specialties).map((specialty) => ({
    specialty: specialty,
  }))
}

export default function SpecialtyPage({ params }: PageProps) {
  const specialty = specialties[params.specialty as SpecialtyKey]
  
  if (!specialty) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header Section */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              MedAssist for {specialty.name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {specialty.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{specialty.statistics.practitioners}</h3>
                <p className="text-sm text-gray-600">Practitioners in Canada</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{specialty.statistics.burnout_rate}</h3>
                <p className="text-sm text-gray-600">Report Burnout</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{specialty.statistics.admin_time}</h3>
                <p className="text-sm text-gray-600">Time on Admin Tasks</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                <h3 className="font-semibold text-blue-900 mb-1">Up to 75%</h3>
                <p className="text-sm text-blue-800">Documentation Time Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Challenges & Solutions */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Challenges Facing {specialty.name}</h2>
            <div className="space-y-4 mb-8">
              {specialty.key_challenges.map((challenge, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-gray-700">{challenge}</p>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-blue-600">How MedAssist Helps</h3>
            <div className="space-y-4">
              {specialty.medassist_benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Common Use Cases</h2>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {specialty.use_cases.map((useCase, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">{useCase}</h4>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Specialty Focus</h3>
              <p className="text-blue-800 text-sm">
                MedAssist understands the unique workflows and requirements of {specialty.name.toLowerCase()}, 
                providing specialized features and evidence-based recommendations tailored to your practice.
              </p>
            </div>
          </div>
        </div>

        {/* Canadian-Specific Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Built for Canadian {specialty.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialty.canada_specific.map((feature, index) => (
              <div key={index} className="flex items-center p-4 bg-red-50 rounded-lg border border-red-200">
                <span className="text-2xl mr-4">🍁</span>
                <p className="font-medium text-red-900">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials/Case Studies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            What {specialty.name} Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <blockquote className="text-gray-700 mb-4">
                "MedAssist has transformed my practice. I'm spending 75% less time on documentation and 
                more time with my patients. The AI understands the complexity of {specialty.formal_name.toLowerCase()} 
                and provides relevant, evidence-based suggestions."
              </blockquote>
              <footer className="text-sm text-gray-600">
                — Dr. Sarah M., {specialty.formal_name} • Toronto, ON
              </footer>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <blockquote className="text-gray-700 mb-4">
                "The PHIPA compliance and Canadian EMR integration made adoption seamless. 
                MedAssist feels like having a knowledgeable colleague who never gets tired and 
                always has the latest research at their fingertips."
              </blockquote>
              <footer className="text-sm text-gray-600">
                — Dr. Michael R., {specialty.formal_name} • Vancouver, BC
              </footer>
            </div>
          </div>
        </div>

        {/* FAQ Section with Structured Data */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions - {specialty.name}
          </h2>
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": `How is MedAssist specifically designed for ${specialty.name.toLowerCase()}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `MedAssist includes specialized features for ${specialty.formal_name.toLowerCase()} including relevant clinical guidelines, specialty-specific documentation templates, and evidence-based recommendations tailored to ${specialty.name.toLowerCase()} practice patterns.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `Can MedAssist help with the unique challenges of ${specialty.formal_name.toLowerCase()}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `Yes, MedAssist addresses the specific challenges faced by ${specialty.name.toLowerCase()} including ${specialty.key_challenges[0].toLowerCase()}, providing automated documentation, clinical decision support, and workflow optimization.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `Is MedAssist compliant with Canadian regulations for ${specialty.name.toLowerCase()}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `MedAssist is fully compliant with PHIPA/PIPEDA and other Canadian healthcare regulations. It integrates with Canadian EMRs commonly used by ${specialty.name.toLowerCase()} and follows provincial healthcare privacy standards.`
                    }
                  }
                ]
              })
            }}
          />
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">How is MedAssist specifically designed for {specialty.name.toLowerCase()}?</h3>
              <p className="text-gray-600">
                MedAssist includes specialized features for {specialty.formal_name.toLowerCase()} including relevant clinical guidelines, 
                specialty-specific documentation templates, and evidence-based recommendations tailored to {specialty.name.toLowerCase()} practice patterns.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can MedAssist help with the unique challenges of {specialty.formal_name.toLowerCase()}?</h3>
              <p className="text-gray-600">
                Yes, MedAssist addresses the specific challenges faced by {specialty.name.toLowerCase()} including {specialty.key_challenges[0].toLowerCase()}, 
                providing automated documentation, clinical decision support, and workflow optimization.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is MedAssist compliant with Canadian regulations for {specialty.name.toLowerCase()}?</h3>
              <p className="text-gray-600">
                MedAssist is fully compliant with PHIPA/PIPEDA and other Canadian healthcare regulations. 
                It integrates with Canadian EMRs commonly used by {specialty.name.toLowerCase()} and follows provincial healthcare privacy standards.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your {specialty.formal_name} Practice?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of Canadian {specialty.name.toLowerCase()} who have reduced documentation burden 
            and improved patient care with MedAssist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
            <button className="border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-2xl hover:bg-gray-100 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      {/* <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Try MedAssist - Designed for {specialty.name}
          </h2>
          <PhysicianAssistant />
        </div>
      </div> */}
    </div>
  )
} 