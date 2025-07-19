import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PHIPA Compliance - MedAssist AI Medical Assistant for Ontario Physicians',
  description: 'Learn how MedAssist ensures full PHIPA (Personal Health Information Protection Act) compliance for Ontario physicians. Canadian data storage, encryption, patient consent, and privacy protection.',
  keywords: [
    'PHIPA compliance AI',
    'PHIPA medical assistant',
    'Ontario healthcare privacy',
    'PHIPA compliant AI scribe',
    'medical AI privacy Ontario',
    'healthcare data protection',
    'PHIPA requirements AI',
    'Ontario physician privacy'
  ].join(', '),
  openGraph: {
    title: 'PHIPA Compliance - MedAssist AI Medical Assistant',
    description: 'Full PHIPA compliance for Ontario physicians using AI medical assistants. Learn about data protection, privacy requirements, and compliant AI implementation.',
    url: 'https://medassist.ca/compliance/phipa',
  },
  alternates: {
    canonical: '/compliance/phipa',
  }
}

export default function PHIPACompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header Section */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PHIPA Compliance for AI Medical Assistants
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              How MedAssist ensures full compliance with Ontario's Personal Health Information Protection Act (PHIPA) 
              while providing powerful AI clinical assistance.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-3">
                <span className="text-2xl mr-3">🔒</span>
                <h3 className="font-semibold text-green-900">100% PHIPA Compliant</h3>
              </div>
              <p className="text-sm text-green-800">
                MedAssist meets all PHIPA requirements for Ontario healthcare providers, ensuring patient privacy 
                and data protection while delivering advanced AI clinical assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* What is PHIPA */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Understanding PHIPA</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              The Personal Health Information Protection Act (PHIPA) is Ontario's comprehensive health privacy law 
              that governs the collection, use, and disclosure of personal health information by health information custodians.
            </p>
            <p className="text-gray-700">
              As an Ontario physician using AI medical assistants, you must ensure that any technology you use 
              complies with PHIPA's stringent requirements for protecting patient privacy and health information.
            </p>
          </div>
        </section>

        {/* PHIPA Requirements */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Key PHIPA Requirements for AI Medical Assistants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">Data Storage Location</h3>
                <p className="text-gray-700 text-sm">
                  Personal health information must be stored in Canada, with specific protections against 
                  foreign government access.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">Patient Consent</h3>
                <p className="text-gray-700 text-sm">
                  Patients must provide informed consent for the use of AI systems that process their health information.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">Data Minimization</h3>
                <p className="text-gray-700 text-sm">
                  Only collect and process the minimum amount of health information necessary for the intended purpose.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">Security Safeguards</h3>
                <p className="text-gray-700 text-sm">
                  Implement administrative, technical, and physical safeguards to protect health information.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">Access Controls</h3>
                <p className="text-gray-700 text-sm">
                  Ensure only authorized individuals can access patient health information through the AI system.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-600 mb-3">Audit Logging</h3>
                <p className="text-gray-700 text-sm">
                  Maintain detailed logs of who accesses health information, when, and for what purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How MedAssist Ensures Compliance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">How MedAssist Ensures PHIPA Compliance</h2>
          
          <div className="space-y-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</span>
                Canadian Data Sovereignty
              </h3>
              <p className="text-green-800 mb-3">
                All patient health information processed by MedAssist is stored exclusively on Canadian servers, 
                ensuring compliance with PHIPA's data residency requirements.
              </p>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Data centers located in Toronto and Vancouver</li>
                <li>• No cross-border data transfers</li>
                <li>• Protection against foreign government access requests</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</span>
                Advanced Encryption & Security
              </h3>
              <p className="text-green-800 mb-3">
                MedAssist implements bank-level security measures to protect patient health information:
              </p>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• AES-256 encryption for data at rest</li>
                <li>• TLS 1.3 encryption for data in transit</li>
                <li>• End-to-end encryption for all communications</li>
                <li>• Regular security audits and penetration testing</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</span>
                Patient Consent Management
              </h3>
              <p className="text-green-800 mb-3">
                Built-in tools to obtain and manage patient consent for AI-assisted healthcare:
              </p>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Digital consent forms integrated into workflow</li>
                <li>• Clear explanation of AI use for patients</li>
                <li>• Consent tracking and audit trails</li>
                <li>• Easy consent withdrawal process</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</span>
                Access Controls & Audit Logging
              </h3>
              <p className="text-green-800 mb-3">
                Comprehensive access controls and logging to meet PHIPA requirements:
              </p>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Role-based access controls (RBAC)</li>
                <li>• Multi-factor authentication (MFA)</li>
                <li>• Complete audit trails of all system access</li>
                <li>• Regular access reviews and deprovisioning</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementation Checklist */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">PHIPA Compliance Checklist for Ontario Physicians</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 mb-6">
              Use this checklist to ensure your AI medical assistant implementation meets PHIPA requirements:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled checked />
                <span className="text-blue-900 text-sm">
                  ✓ Verify AI system stores data exclusively in Canada (MedAssist: Compliant)
                </span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled checked />
                <span className="text-blue-900 text-sm">
                  ✓ Ensure robust encryption for data at rest and in transit (MedAssist: AES-256 + TLS 1.3)
                </span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled checked />
                <span className="text-blue-900 text-sm">
                  ✓ Implement strong access controls and authentication (MedAssist: RBAC + MFA)
                </span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled checked />
                <span className="text-blue-900 text-sm">
                  ✓ Obtain informed patient consent for AI processing (MedAssist: Built-in consent tools)
                </span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled checked />
                <span className="text-blue-900 text-sm">
                  ✓ Maintain comprehensive audit logs (MedAssist: Complete audit trails)
                </span>
              </div>
              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" disabled checked />
                <span className="text-blue-900 text-sm">
                  ✓ Regular security assessments and updates (MedAssist: Continuous monitoring)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Structured Data */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">PHIPA Compliance FAQs</h2>
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is MedAssist PHIPA compliant for Ontario physicians?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, MedAssist is fully PHIPA compliant. All patient data is stored on Canadian servers, encrypted with bank-level security, and processed according to PHIPA requirements for Ontario healthcare providers."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Where is my patient data stored when using MedAssist?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "All patient data processed by MedAssist is stored exclusively on Canadian servers located in Toronto and Vancouver. No patient information is transferred outside of Canada."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does MedAssist handle patient consent for AI processing?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "MedAssist includes built-in patient consent tools that allow you to obtain informed consent for AI processing, track consent status, and provide easy withdrawal options for patients."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What security measures does MedAssist use to protect health information?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "MedAssist uses AES-256 encryption for data at rest, TLS 1.3 for data in transit, multi-factor authentication, role-based access controls, and comprehensive audit logging to protect patient health information."
                    }
                  }
                ]
              })
            }}
          />
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is MedAssist PHIPA compliant for Ontario physicians?</h3>
              <p className="text-gray-600">
                Yes, MedAssist is fully PHIPA compliant. All patient data is stored on Canadian servers, 
                encrypted with bank-level security, and processed according to PHIPA requirements for Ontario healthcare providers.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Where is my patient data stored when using MedAssist?</h3>
              <p className="text-gray-600">
                All patient data processed by MedAssist is stored exclusively on Canadian servers located in Toronto and Vancouver. 
                No patient information is transferred outside of Canada.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">How does MedAssist handle patient consent for AI processing?</h3>
              <p className="text-gray-600">
                MedAssist includes built-in patient consent tools that allow you to obtain informed consent for AI processing, 
                track consent status, and provide easy withdrawal options for patients.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">What security measures does MedAssist use to protect health information?</h3>
              <p className="text-gray-600">
                MedAssist uses AES-256 encryption for data at rest, TLS 1.3 for data in transit, multi-factor authentication, 
                role-based access controls, and comprehensive audit logging to protect patient health information.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Trust & Compliance Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold text-sm">PHIPA Compliant</h3>
              <p className="text-xs text-gray-600">Ontario Privacy</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl mb-2">🇨🇦</div>
              <h3 className="font-semibold text-sm">Canadian Hosted</h3>
              <p className="text-xs text-gray-600">Data Sovereignty</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="font-semibold text-sm">SOC 2 Type II</h3>
              <p className="text-xs text-gray-600">Security Certified</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-2xl mb-2">🏥</div>
              <h3 className="font-semibold text-sm">Healthcare Grade</h3>
              <p className="text-xs text-gray-600">Medical Security</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About PHIPA Compliance?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our compliance team is here to help Ontario physicians understand and implement PHIPA-compliant AI solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl hover:bg-blue-700 transition-colors">
              Contact Compliance Team
            </button>
            <button className="border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-2xl hover:bg-gray-100 transition-colors">
              Download PHIPA Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 