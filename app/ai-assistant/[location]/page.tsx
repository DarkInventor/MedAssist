import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PhysicianAssistant } from '../../../components/physician-assistant'

// Canadian provinces and territories data
const canadianLocations = {
  'ontario': {
    name: 'Ontario',
    abbreviation: 'ON',
    major_cities: ['Toronto', 'Ottawa', 'Hamilton', 'London', 'Windsor'],
    healthcare_system: 'Ontario Health',
    privacy_law: 'PHIPA (Personal Health Information Protection Act)',
    popular_emrs: ['OSCAR', 'TELUS PS Suite', 'Epic'],
    physician_count: '28,000+',
    primary_care_focus: 'Family Health Teams (FHTs) and Community Health Centres'
  },
  'british-columbia': {
    name: 'British Columbia',
    abbreviation: 'BC',
    major_cities: ['Vancouver', 'Victoria', 'Burnaby', 'Surrey', 'Richmond'],
    healthcare_system: 'BC Health Authorities',
    privacy_law: 'PIPA (Personal Information Protection Act)',
    popular_emrs: ['OSCAR', 'TELUS PS Suite', 'Plexia'],
    physician_count: '12,000+',
    primary_care_focus: 'Primary Care Networks (PCNs) and Urgent Primary Care Centres'
  },
  'quebec': {
    name: 'Quebec',
    abbreviation: 'QC',
    major_cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Sherbrooke'],
    healthcare_system: 'Régie de l\'assurance maladie du Québec (RAMQ)',
    privacy_law: 'Quebec Privacy Act',
    popular_emrs: ['OSCAR', 'TELUS PS Suite', 'Dossier Santé Québec (DSQ)'],
    physician_count: '22,000+',
    primary_care_focus: 'Groupes de médecine de famille (GMF) and CLSC'
  },
  'alberta': {
    name: 'Alberta',
    abbreviation: 'AB',
    major_cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'Medicine Hat'],
    healthcare_system: 'Alberta Health Services (AHS)',
    privacy_law: 'PIPA (Personal Information Protection Act)',
    popular_emrs: ['OSCAR', 'TELUS PS Suite', 'Epic'],
    physician_count: '11,000+',
    primary_care_focus: 'Primary Care Networks (PCNs) and Family Care Clinics'
  },
  'manitoba': {
    name: 'Manitoba',
    abbreviation: 'MB',
    major_cities: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie'],
    healthcare_system: 'Manitoba Health',
    privacy_law: 'PHIA (Personal Health Information Act)',
    popular_emrs: ['OSCAR', 'TELUS PS Suite'],
    physician_count: '3,000+',
    primary_care_focus: 'My Health Teams and Community Health Centres'
  },
  'saskatchewan': {
    name: 'Saskatchewan',
    abbreviation: 'SK',
    major_cities: ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current'],
    healthcare_system: 'Saskatchewan Health Authority',
    privacy_law: 'HIPA (Health Information Protection Act)',
    popular_emrs: ['OSCAR', 'TELUS PS Suite'],
    physician_count: '2,500+',
    primary_care_focus: 'Primary Health Care and Community Clinics'
  }
} as const

type LocationKey = keyof typeof canadianLocations

interface PageProps {
  params: {
    location: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const location = canadianLocations[params.location as LocationKey]
  
  if (!location) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }

  return {
    title: `MedAssist - AI Medical Assistant for Family Doctors in ${location.name} | ${location.privacy_law} Compliant`,
    description: `MedAssist helps family physicians and primary care providers in ${location.name} reduce documentation burden with our ${location.privacy_law} compliant AI medical scribe. Integrates with ${location.popular_emrs.join(', ')} and supports ${location.primary_care_focus}.`,
    keywords: [
      `AI medical assistant ${location.name}`,
      `AI scribe ${location.abbreviation}`,
      `family doctor AI ${location.name}`,
      `${location.privacy_law} compliant AI`,
      `medical AI ${location.major_cities.join(' ')}`
    ].join(', '),
    openGraph: {
      title: `AI Medical Assistant for Family Doctors in ${location.name}`,
      description: `${location.privacy_law} compliant AI scribe for ${location.name} physicians. Reduce documentation time and improve patient care.`,
      url: `https://medassist.ca/ai-assistant/${params.location}`,
    },
    alternates: {
      canonical: `/ai-assistant/${params.location}`,
    }
  }
}

export async function generateStaticParams() {
  return Object.keys(canadianLocations).map((location) => ({
    location: location,
  }))
}

export default function LocationPage({ params }: PageProps) {
  const location = canadianLocations[params.location as LocationKey]
  
  if (!location) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Clean header section */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Medical Assistant for Family Doctors in {location.name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              MedAssist helps {location.name} physicians reduce documentation burden and improve patient care 
              with our {location.privacy_law} compliant AI clinical assistant.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Serving {location.physician_count} Physicians</h3>
                <p className="text-sm text-gray-600">Trusted by family doctors across {location.name}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2">{location.privacy_law} Compliant</h3>
                <p className="text-sm text-blue-800">Full compliance with {location.name} privacy regulations</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">EMR Integration</h3>
                <p className="text-sm text-gray-600">Works with {location.popular_emrs.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location-specific content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Designed for {location.name} Healthcare System
            </h2>
            <p className="text-gray-600 mb-4">
              MedAssist understands the unique needs of {location.name}'s healthcare environment, 
              including {location.primary_care_focus} and integration with {location.healthcare_system}.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Compliant with {location.privacy_law}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Integrates with popular {location.name} EMRs
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Supports bilingual documentation (EN/FR)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                24/7 Canadian customer support
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Serving Major Cities in {location.name}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {location.major_cities.map((city) => (
                <div key={city} className="bg-gray-50 rounded-lg p-3 text-center">
                  <span className="font-medium">{city}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Quick Stats</h3>
              <p className="text-blue-800 text-sm">
                <strong>{location.physician_count}</strong> physicians in {location.name} can benefit from 
                AI-powered clinical documentation to reduce burnout and improve patient interactions.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section with Structured Data */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions - AI Medical Assistant in {location.name}
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
                    "name": `Is MedAssist compliant with ${location.privacy_law}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `Yes, MedAssist is fully compliant with ${location.privacy_law} and all ${location.name} privacy regulations. Patient data is stored on Canadian servers and processed according to provincial healthcare privacy standards.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `Does MedAssist integrate with EMRs used in ${location.name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `MedAssist integrates with popular EMRs in ${location.name} including ${location.popular_emrs.join(', ')}. Our API supports seamless data transfer and workflow integration.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `How does MedAssist help family doctors in ${location.name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `MedAssist reduces documentation time by up to 75% for family physicians in ${location.name}, allowing more time for patient care while ensuring accurate clinical notes and evidence-based decision support.`
                    }
                  }
                ]
              })
            }}
          />
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is MedAssist compliant with {location.privacy_law}?</h3>
              <p className="text-gray-600">
                Yes, MedAssist is fully compliant with {location.privacy_law} and all {location.name} privacy regulations. 
                Patient data is stored on Canadian servers and processed according to provincial healthcare privacy standards.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Does MedAssist integrate with EMRs used in {location.name}?</h3>
              <p className="text-gray-600">
                MedAssist integrates with popular EMRs in {location.name} including {location.popular_emrs.join(', ')}. 
                Our API supports seamless data transfer and workflow integration.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">How does MedAssist help family doctors in {location.name}?</h3>
              <p className="text-gray-600">
                MedAssist reduces documentation time by up to 75% for family physicians in {location.name}, 
                allowing more time for patient care while ensuring accurate clinical notes and evidence-based decision support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Application */}
      {/* <div className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Try MedAssist - AI Clinical Assistant
          </h2>
          <PhysicianAssistant />
        </div>
      </div> */}
    </div>
  )
} 