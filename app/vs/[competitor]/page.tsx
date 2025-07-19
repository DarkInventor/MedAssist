import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PhysicianAssistant } from '../../../components/physician-assistant'

// Competitor data based on research
const competitors = {
  'uptodate': {
    name: 'UpToDate',
    company: 'Wolters Kluwer',
    type: 'Clinical Decision Support Platform',
    positioning: 'AI in Clinical Decision Support with evidence-based content',
    target_market: 'Hospitals and Large Healthcare Systems',
    pricing: '$500+ per user/year',
    strengths: ['Established brand', 'Comprehensive medical database', 'Hospital integrations'],
    weaknesses: ['Expensive for small practices', 'Complex interface', 'Limited AI scribe functionality', 'US-focused content'],
    key_differentiators: [
      'UpToDate focuses on reference content, MedAssist provides active AI assistance',
      'UpToDate targets hospitals, MedAssist designed for primary care',
      'MedAssist offers Canadian-specific compliance and EMR integrations'
    ]
  },
  'glass-health': {
    name: 'Glass Health',
    company: 'Glass Health (Startup)',
    type: 'AI Clinical Decision Support Platform',
    positioning: 'Generative AI for differential diagnosis and plan drafting',
    target_market: 'Physicians and Hospitals',
    pricing: 'Subscription-based (pricing varies)',
    strengths: ['Modern AI technology', 'Venture-backed', 'Focus on differential diagnosis'],
    weaknesses: ['Limited market presence', 'US-focused', 'No Canadian compliance', 'Limited EMR integrations'],
    key_differentiators: [
      'Glass focuses on diagnosis, MedAssist provides comprehensive clinical assistance',
      'MedAssist offers PHIPA/PIPEDA compliance for Canadian market',
      'MedAssist includes medical scribe functionality Glass lacks'
    ]
  },
  'scribeberry': {
    name: 'Scribeberry',
    company: 'Scribeberry Inc.',
    type: 'AI Medical Scribe',
    positioning: 'Canadian-focused AI medical scribe with Infoway funding eligibility',
    target_market: 'Primary Care (Family Docs, NPs)',
    pricing: 'Competitive pricing with government funding options',
    strengths: ['Canadian focus', 'PIPA/PIPEDA compliance', 'Infoway funding eligible', 'EMR integration'],
    weaknesses: ['Limited to transcription', 'No clinical decision support', 'Smaller feature set'],
    key_differentiators: [
      'MedAssist combines scribe + clinical decision support vs Scribeberry\'s scribe-only approach',
      'MedAssist offers evidence-based research integration',
      'MedAssist provides comprehensive workflow automation beyond documentation'
    ]
  },
  'heidi-health': {
    name: 'Heidi Health',
    company: 'Heidi Health',
    type: 'Ambient AI Medical Scribe',
    positioning: 'Ambient AI medical scribe that automates documentation and restores eye contact',
    target_market: 'All Clinicians (MDs, NPs, RNs)',
    pricing: 'Per-consultation pricing model',
    strengths: ['Ambient technology', 'ISO/HIPAA compliance', 'Cross-provider support'],
    weaknesses: ['No Canadian-specific compliance', 'Limited clinical decision support', 'Per-use pricing can be expensive'],
    key_differentiators: [
      'MedAssist offers fixed pricing vs Heidi\'s per-consultation costs',
      'MedAssist provides PHIPA/PIPEDA compliance for Canadian market',
      'MedAssist includes clinical research and evidence synthesis features'
    ]
  },
  'tali-ai': {
    name: 'Tali AI',
    company: 'Tali (backed by Infoway/WELL)',
    type: 'Voice-enabled EHR Assistant and Scribe',
    positioning: 'Voice-enabled EHR assistant developed with Canadian clinicians',
    target_market: 'Canadian Healthcare Providers',
    pricing: 'Enterprise pricing through WELL Health',
    strengths: ['Canadian backing', 'Infoway support', 'WELL Health integration', 'Voice-enabled'],
    weaknesses: ['Limited to WELL ecosystem', 'Enterprise-focused pricing', 'Less comprehensive AI features'],
    key_differentiators: [
      'MedAssist is EMR-agnostic vs Tali\'s WELL ecosystem lock-in',
      'MedAssist offers more advanced AI clinical decision support',
      'MedAssist provides accessible pricing for independent practices'
    ]
  }
} as const

type CompetitorKey = keyof typeof competitors

interface PageProps {
  params: {
    competitor: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const competitor = competitors[params.competitor as CompetitorKey]
  
  if (!competitor) {
    return {
      title: 'Comparison Not Found',
      description: 'The requested comparison could not be found.'
    }
  }

  return {
    title: `MedAssist vs ${competitor.name} - Canadian AI Medical Assistant Comparison`,
    description: `Compare MedAssist and ${competitor.name} for Canadian physicians. See why MedAssist is the better choice for primary care providers with PHIPA/PIPEDA compliance, Canadian EMR integration, and comprehensive AI clinical assistance.`,
    keywords: [
      `MedAssist vs ${competitor.name}`,
      `${competitor.name} alternative Canada`,
      `Canadian AI medical assistant comparison`,
      `AI scribe comparison Canada`,
      `${competitor.name} vs MedAssist`,
      'best AI medical assistant Canada'
    ].join(', '),
    openGraph: {
      title: `MedAssist vs ${competitor.name} - AI Medical Assistant Comparison`,
      description: `Why Canadian physicians choose MedAssist over ${competitor.name}. PHIPA compliant, EMR integrated, designed for primary care.`,
      url: `https://medassist.ca/vs/${params.competitor}`,
    },
    alternates: {
      canonical: `/vs/${params.competitor}`,
    }
  }
}

export async function generateStaticParams() {
  return Object.keys(competitors).map((competitor) => ({
    competitor: competitor,
  }))
}

export default function ComparisonPage({ params }: PageProps) {
  const competitor = competitors[params.competitor as CompetitorKey]
  
  if (!competitor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header Section */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              MedAssist vs {competitor.name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Why Canadian physicians choose MedAssist over {competitor.name} for their AI clinical assistant needs
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-blue-900 mb-2">Quick Summary</h3>
              <p className="text-sm text-blue-800">
                MedAssist is specifically designed for Canadian primary care providers with PHIPA/PIPEDA compliance, 
                Canadian EMR integration, and comprehensive clinical decision support - features that {competitor.name} lacks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Comparison Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-semibold bg-blue-50">
                    <div className="flex items-center justify-center">
                      <span className="text-blue-600 font-bold">MedAssist</span>
                    </div>
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-semibold">
                    {competitor.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">PHIPA/PIPEDA Compliance</td>
                  <td className="border border-gray-200 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 font-semibold">✓ Full Compliance</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center bg-red-50">
                    <span className="text-red-600">✗ Limited/None</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Canadian EMR Integration</td>
                  <td className="border border-gray-200 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 font-semibold">✓ OSCAR, TELUS PS, Epic</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center bg-yellow-50">
                    <span className="text-yellow-600">⚠ Limited Canadian Support</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">AI Medical Scribe</td>
                  <td className="border border-gray-200 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 font-semibold">✓ Advanced AI Scribe</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <span className="text-gray-600">
                      {competitor.type.includes('Scribe') ? '✓ Basic Scribe' : '✗ No Scribe Feature'}
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Clinical Decision Support</td>
                  <td className="border border-gray-200 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 font-semibold">✓ Evidence-Based Research</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <span className="text-gray-600">
                      {competitor.type.includes('Decision Support') ? '✓ Limited Support' : '✗ No Decision Support'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Primary Care Focus</td>
                  <td className="border border-gray-200 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 font-semibold">✓ Designed for Family Docs</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <span className="text-gray-600">
                      {competitor.target_market.includes('Primary Care') ? '✓ Some Support' : '✗ Hospital/Enterprise Focus'}
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Pricing</td>
                  <td className="border border-gray-200 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 font-semibold">$ Affordable for Small Practices</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center bg-red-50">
                    <span className="text-red-600">$$$ {competitor.pricing}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Why Canadian Physicians Choose MedAssist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">MedAssist Advantages</h3>
              <div className="space-y-4">
                {competitor.key_differentiators.map((diff, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-gray-700">{diff}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-600">{competitor.name} Limitations</h3>
              <div className="space-y-4">
                {competitor.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-gray-700">{weakness}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section with Structured Data */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions - MedAssist vs {competitor.name}
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
                    "name": `Why should I choose MedAssist over ${competitor.name} for my Canadian practice?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `MedAssist is specifically designed for Canadian physicians with full PHIPA/PIPEDA compliance, integration with Canadian EMRs like OSCAR and TELUS PS Suite, and pricing suitable for primary care practices. ${competitor.name} lacks these Canadian-specific features.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `Does MedAssist offer the same features as ${competitor.name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `MedAssist provides comprehensive AI clinical assistance including medical scribing, clinical decision support, and evidence-based research - often exceeding ${competitor.name}'s capabilities while being specifically designed for Canadian healthcare workflows.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `Is MedAssist more affordable than ${competitor.name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `Yes, MedAssist offers competitive pricing designed for Canadian primary care practices, often significantly more affordable than ${competitor.name}'s enterprise-focused pricing model.`
                    }
                  }
                ]
              })
            }}
          />
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Why should I choose MedAssist over {competitor.name} for my Canadian practice?</h3>
              <p className="text-gray-600">
                MedAssist is specifically designed for Canadian physicians with full PHIPA/PIPEDA compliance, 
                integration with Canadian EMRs like OSCAR and TELUS PS Suite, and pricing suitable for primary care practices. 
                {competitor.name} lacks these Canadian-specific features.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Does MedAssist offer the same features as {competitor.name}?</h3>
              <p className="text-gray-600">
                MedAssist provides comprehensive AI clinical assistance including medical scribing, clinical decision support, 
                and evidence-based research - often exceeding {competitor.name}'s capabilities while being specifically 
                designed for Canadian healthcare workflows.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is MedAssist more affordable than {competitor.name}?</h3>
              <p className="text-gray-600">
                Yes, MedAssist offers competitive pricing designed for Canadian primary care practices, 
                often significantly more affordable than {competitor.name}'s enterprise-focused pricing model.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Switch from {competitor.name}?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of Canadian physicians who have made the switch to MedAssist for better 
            AI clinical assistance, Canadian compliance, and affordable pricing.
          </p>
          <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl hover:bg-blue-700 transition-colors">
            Try MedAssist Free
          </button>
        </div>
      </div>

      {/* Demo Section */}
      {/* <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Try MedAssist - See the Difference for Yourself
          </h2>
          <PhysicianAssistant />
        </div>
      </div> */}
    </div>
  )
} 