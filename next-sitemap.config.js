/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://medassist.ca',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://medassist.ca/sitemap-programmatic.xml',
    ],
  },
  exclude: ['/api/*', '/admin/*', '/_next/*'],
  additionalPaths: async (config) => {
    const result = []

    // Canadian provinces for location-based SEO pages
    const provinces = [
      'ontario', 'british-columbia', 'quebec', 'alberta', 
      'manitoba', 'saskatchewan', 'nova-scotia', 'new-brunswick',
      'newfoundland-labrador', 'prince-edward-island', 'northwest-territories',
      'yukon', 'nunavut'
    ]

    // Competitor comparison pages
    const competitors = [
      'uptodate', 'glass-health', 'scribeberry', 'heidi-health', 
      'tali-ai', 'hippocratic-ai', 'dragon-copilot', 'oracle-health'
    ]

    // Specialty pages targeting primary care
    const specialties = [
      'family-physicians', 'nurse-practitioners', 'pediatricians', 
      'rural-physicians', 'community-health', 'primary-care'
    ]

    // Knowledge center categories
    const knowledgeCategories = [
      'documentation-burnout', 'ai-compliance', 'clinical-decision-support',
      'emr-integration', 'ai-ethics-safety', 'implementation-guides'
    ]

    // Add location-based pages
    provinces.forEach(province => {
      result.push({
        loc: `/ai-assistant/${province}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })

    // Add competitor comparison pages
    competitors.forEach(competitor => {
      result.push({
        loc: `/vs/${competitor}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })

    // Add specialty pages
    specialties.forEach(specialty => {
      result.push({
        loc: `/for/${specialty}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })

    // Add knowledge center category pages
    knowledgeCategories.forEach(category => {
      result.push({
        loc: `/knowledge/category/${category}`,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // Add compliance pages (expanded for comprehensive coverage)
    const compliancePages = [
      'phipa', 'pipeda', 'hipaa', 'quebec-privacy-act',
      'phia-manitoba', 'hipa-saskatchewan', 'pipa-alberta', 'pipa-bc'
    ]
    
    compliancePages.forEach(page => {
      result.push({
        loc: `/compliance/${page}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })

    // Add EMR integration pages
    const emrSystems = [
      'oscar', 'telus-ps-suite', 'epic', 'cerner', 'allscripts'
    ]
    
    emrSystems.forEach(emr => {
      result.push({
        loc: `/emr/${emr}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // Add feature-specific pages (expanded based on blog content)
    const features = [
      'ai-scribe', 'clinical-decision-support', 'voice-input', 
      'evidence-based-research', 'workflow-automation',
      'medical-documentation', 'patient-engagement', 'phipa-compliance',
      'emr-integration', 'physician-burnout-reduction'
    ]
    
    features.forEach(feature => {
      result.push({
        loc: `/features/${feature}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // Add blog pages
    result.push({
      loc: '/blog',
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })

    // Add all 30 blog posts created for comprehensive SEO coverage
    const blogSlugs = [
      // Clinic & Physiotherapy Audience (10 posts)
      'ai-tools-canadian-physiotherapy-clinics-2024',
      'automate-medical-note-taking-ai-canada',
      'ai-vs-manual-data-entry-physiotherapists',
      'billing-documentation-automation-small-clinics',
      'improve-patient-engagement-ai-assistants',
      'phipa-compliance-guide-ai-medical-documentation',
      'reducing-physician-burnout-through-ai-automation',
      'emr-integration-strategies-ai-medical-assistants',
      'voice-recognition-technology-canadian-healthcare',
      'building-digital-first-medical-practice-canada',
      
      // Medical Professionals & Researchers (10 posts)
      'future-ai-canadian-primary-care-2024',
      'ai-assistants-reliable-clinical-summaries',
      'clinical-decision-support-ai-vs-traditional-guidelines',
      'machine-learning-diagnostic-accuracy-canadian-healthcare',
      'ethical-considerations-ai-canadian-medical-practice',
      'impact-ai-documentation-clinical-reasoning-skills',
      'interoperability-challenges-canadian-health-ai-systems',
      'population-health-management-ai-analytics',
      'ai-powered-clinical-trials-opportunities-canadian-healthcare',
      'quality-improvement-ai-driven-healthcare-analytics',
      
      // Product-Specific & Competitive Analysis (10 posts)
      'medassist-vs-uptodate-ai-clinical-decision-support',
      'canadian-physicians-choose-medassist-over-glass-health',
      'medassist-vs-scribeberry-ai-scribe-canadian-clinics',
      'behind-scenes-medassist-claude-mistral-eleven-labs',
      'medassist-implementation-success-stories-canadian-healthcare',
      'phipa-compliance-medassist-leads-canadian-healthcare-ai',
      'cost-analysis-medassist-roi-canadian-medical-practices',
      'integration-guide-medassist-oscar-emr-telus-ps-suite',
      'medassist-vs-tali-ai-comprehensive-feature-comparison',
      'medassist-advantage-10-features-set-us-apart'
    ]

    blogSlugs.forEach(slug => {
      result.push({
        loc: `/blog/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })

    // Add use case specific pages
    const useCases = [
      'small-clinics', 'large-practices', 'hospital-systems',
      'telehealth', 'walk-in-clinics', 'specialist-clinics'
    ]
    
    useCases.forEach(useCase => {
      result.push({
        loc: `/use-cases/${useCase}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // Add industry-specific pages
    const industries = [
      'physiotherapy', 'chiropractic', 'mental-health',
      'dermatology', 'cardiology', 'pediatrics'
    ]
    
    industries.forEach(industry => {
      result.push({
        loc: `/industries/${industry}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // Add solution pages
    const solutions = [
      'documentation-automation', 'clinical-decision-support', 
      'voice-recognition', 'patient-engagement', 'billing-optimization',
      'workflow-improvement'
    ]
    
    solutions.forEach(solution => {
      result.push({
        loc: `/solutions/${solution}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })

    return result
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on page type
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.includes('/ai-assistant/') || path.includes('/for/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.includes('/vs/') || path.includes('/compliance/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.includes('/knowledge/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      }
    }

    if (path === '/blog') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.includes('/blog/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.includes('/solutions/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.includes('/use-cases/') || path.includes('/industries/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.includes('/features/') || path.includes('/emr/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      }
    }

    // Default
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    }
  },
} 