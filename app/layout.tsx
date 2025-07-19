import type { Metadata } from 'next'
import './globals.css'
import Navigation from '../components/navigation'

export const metadata: Metadata = {
  title: 'MedAssist - AI Medical Assistant for Canadian Physicians | PHIPA Compliant',
  description: 'MedAssist is Canada\'s leading AI-powered clinical assistant for family physicians and primary care providers. Get evidence-based answers, reduce documentation burden, and improve patient care with our PHIPA/PIPEDA compliant AI medical scribe.',
  keywords: [
    'AI medical assistant Canada',
    'AI scribe for doctors',
    'clinical documentation AI',
    'digital health assistant Canada',
    'EHR AI voice assistant',
    'AI clinical decision support Canada',
    'AI medical note-taking Canada',
    'PHIPA compliant AI scribe',
    'HIPAA PIPEDA healthcare AI',
    'AI assistant for family physicians',
    'virtual nurse AI',
    'AI prescription assistant',
    'Canadian healthcare AI',
    'medical AI Ontario',
    'clinical AI assistant',
    'physician burnout solution'
  ].join(', '),
  authors: [{ name: 'MedAssist' }],
  creator: 'MedAssist',
  publisher: 'MedAssist',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://medassist.ca'),
  alternates: {
    canonical: '/',
    languages: {
      'en-CA': '/en-ca',
      'fr-CA': '/fr-ca',
    },
  },
  openGraph: {
    title: 'MedAssist - AI Medical Assistant for Canadian Physicians',
    description: 'Canada\'s leading AI-powered clinical assistant for family physicians. PHIPA/PIPEDA compliant medical AI that reduces documentation burden and improves patient care.',
    url: 'https://medassist.ca',
    siteName: 'MedAssist',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MedAssist - AI Medical Assistant for Canadian Physicians',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedAssist - AI Medical Assistant for Canadian Physicians',
    description: 'Canada\'s leading AI-powered clinical assistant for family physicians. PHIPA/PIPEDA compliant.',
    images: ['/twitter-image.jpg'],
    creator: '@MedAssistAI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'healthcare',
  classification: 'Medical AI Assistant',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://medassist.ca" />
        <meta name="geo.region" content="CA" />
        <meta name="geo.country" content="Canada" />
        <meta name="dc.language" content="en-CA" />
        <meta name="application-name" content="MedAssist" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Structured Data for Medical Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "MedAssist",
              "description": "AI-powered clinical assistant for Canadian physicians",
              "url": "https://medassist.ca",
              "logo": "https://medassist.ca/logo.png",
              "sameAs": [
                "https://twitter.com/MedAssistAI",
                "https://linkedin.com/company/medassist-ai"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "CA",
                "addressRegion": "ON"
              },
              "medicalSpecialty": [
                "Family Medicine",
                "Primary Care",
                "General Practice"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Medical Assistant Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "SoftwareApplication",
                      "name": "MedAssist AI Clinical Assistant",
                      "applicationCategory": "Medical Software",
                      "operatingSystem": "Web Browser",
                      "description": "AI-powered clinical documentation and decision support",
                      "featureList": [
                        "Clinical documentation automation",
                        "Evidence-based medical research",
                        "PHIPA/PIPEDA compliance",
                        "EMR integration",
                        "Voice-to-text transcription"
                      ]
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Software Application Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "MedAssist",
              "applicationCategory": "Medical Software",
              "applicationSubCategory": "Clinical Decision Support",
              "operatingSystem": "Web Browser",
              "description": "AI-powered clinical assistant for Canadian physicians with PHIPA/PIPEDA compliance",
              "url": "https://medassist.ca",
              "screenshot": "https://medassist.ca/screenshot.png",
              "featureList": [
                "AI Medical Scribe",
                "Clinical Documentation",
                "Evidence-Based Research",
                "EMR Integration",
                "Voice Input",
                "Patient Context Management",
                "PHIPA Compliance",
                "PIPEDA Compliance"
              ],
              "offers": {
                "@type": "Offer",
                "category": "Medical AI Software",
                "eligibleRegion": {
                  "@type": "Country",
                  "name": "Canada"
                }
              },
              "publisher": {
                "@type": "Organization",
                "name": "MedAssist"
              },
              "softwareVersion": "1.0",
              "releaseNotes": "Initial release of AI clinical assistant for Canadian physicians"
            })
          }}
        />
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
