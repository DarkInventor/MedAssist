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

    // Add compliance pages
    const compliancePages = [
      'phipa', 'pipeda', 'hipaa', 'quebec-privacy-act'
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

    // Add feature-specific pages
    const features = [
      'ai-scribe', 'clinical-decision-support', 'voice-input', 
      'evidence-based-research', 'workflow-automation'
    ]
    
    features.forEach(feature => {
      result.push({
        loc: `/features/${feature}`,
        changefreq: 'monthly',
        priority: 0.6,
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

    // Default
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    }
  },
} 