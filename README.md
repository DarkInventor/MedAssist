## MedAssist – AI-Powered Medical Research Assistant

MedAssist is an advanced AI tool built specifically for Canadian healthcare providers to get evidence-based answers to medical questions by searching trusted medical research sources.

It integrates with PubMed, Europe PMC, OpenAlex, and other credible health sources, powered by Google's Gemini 1.5 Flash for intelligent medical analysis.

---

### What You Can Do With MedAssist

* Ask questions about medical conditions, treatments, and clinical guidelines
* Get evidence-based summaries from peer-reviewed medical literature
* Compare treatment options with supporting research citations
* Access PHIPA-compliant medical AI assistance for Canadian healthcare
* Search across multiple trusted medical databases simultaneously
* Get personalized recommendations based on patient context

---

### Who It's For

* Canadian physicians and specialists
* Medical students and residents
* Healthcare practitioners and clinicians
* Researchers in medical and health sciences

---

### How It Works

1. **Ask your medical question** - Use natural language to ask about conditions, treatments, guidelines
2. **AI searches medical literature** - Automatically searches PubMed, Europe PMC, OpenAlex, and credible health sources
3. **Get evidence-based responses** - Receive comprehensive summaries with citations and confidence scores
4. **Review research sources** - Access full studies and abstracts with direct links

---

### Setup Instructions

#### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

#### 2. Environment Configuration
Create a `.env.local` file in the root directory with:
```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: For enhanced features
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### 3. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the key and add it to your `.env.local` file

#### 4. Run the Application
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

### Key Features

#### 🔬 **Multi-Source Medical Research**
- **PubMed**: Clinical studies and abstracts
- **Europe PMC**: Open access medical papers  
- **OpenAlex**: Academic publications with medical focus
- **Web Sources**: WHO, Mayo Clinic, Health Canada, etc.

#### 🤖 **AI-Powered Analysis**
- **Gemini 1.5 Flash**: Advanced medical reasoning
- **Evidence Synthesis**: Combines multiple sources intelligently
- **Canadian Context**: Considers Canadian healthcare guidelines
- **Confidence Scoring**: Indicates reliability of recommendations

#### 🏥 **Clinical Features**
- **Patient Context**: Add patient-specific information for tailored advice
- **Study Filtering**: Filter by date range, study type, region
- **Citation Management**: Proper academic citations with links
- **Follow-up Suggestions**: Smart recommendations for further research

#### 🇨🇦 **Canadian Compliance**
- **PHIPA Compliant**: Meets Ontario health privacy requirements
- **Data Residency**: Canadian data handling where applicable
- **Professional Standards**: Appropriate medical disclaimers and guidance

---

### Example Queries

* "What are the current treatment guidelines for hypertension in Canada?"
* "Compare effectiveness of statins vs lifestyle interventions for cardiovascular disease"
* "What are the contraindications for ACE inhibitors in elderly patients?"
* "Latest research on intermittent fasting for diabetes management"
* "CPSO guidelines for telemedicine during COVID-19"

---

### Medical Research Sources

#### Primary Sources
- **PubMed/MEDLINE**: 35+ million biomedical citations
- **Europe PMC**: Open access medical literature
- **OpenAlex**: 200+ million academic works

#### Trusted Health Organizations
- World Health Organization (WHO)
- Health Canada / Santé Canada
- Mayo Clinic
- Canadian Medical Association
- Provincial medical regulatory bodies

---

### Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI Engine**: Google Gemini 1.5 Flash
- **Medical APIs**: PubMed E-utilities, Europe PMC API, OpenAlex API
- **Authentication**: Firebase Auth (optional)
- **Deployment**: Vercel-ready

---

### Development

#### Project Structure
```
MedAssist/
├── app/
│   ├── api/medical-research/     # Medical research API endpoint
│   ├── blog/                     # Medical blog system  
│   └── [other pages]/
├── components/
│   ├── physician-assistant.tsx   # Main medical interface
│   └── ui/                       # UI components
└── types/
    └── medical.ts                # Medical data types
```

#### API Endpoints
- `POST /api/medical-research` - Main medical research endpoint

---

### Security & Compliance

#### Data Handling
- No patient data stored permanently
- Encrypted API communications
- Secure session management
- Canadian data residency where possible

#### Medical Disclaimers
- AI-generated information for educational purposes only
- Not a replacement for professional medical advice
- Always consult qualified healthcare providers
- Compliance with PHIPA and provincial regulations

---

### Contributing

We welcome contributions from the Canadian medical community:

1. **Medical Content**: Suggest improvements to medical reasoning
2. **Data Sources**: Recommend additional trusted medical databases
3. **Clinical Workflows**: Enhance user experience for healthcare providers
4. **Compliance**: Help ensure regulatory compliance across provinces

---

### Support

For technical support or medical content questions:
- Email: support@medassist.ca (placeholder)
- Documentation: [docs.medassist.ca](docs.medassist.ca) (placeholder)

---

### License & Legal

- Built for Canadian healthcare providers
- Complies with PHIPA/PIPEDA requirements
- Medical information for educational use only
- Professional medical advice always required for clinical decisions

**Disclaimer**: MedAssist provides AI-generated summaries of medical literature for educational purposes. Always consult qualified healthcare professionals for clinical decisions and ensure compliance with current Canadian medical guidelines.
