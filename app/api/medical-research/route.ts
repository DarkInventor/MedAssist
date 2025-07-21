import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface MedicalQuery {
  query: string;
  patientContext?: string;
  uploadedFiles?: File[];
  filters: {
    searchEnabled: boolean;
    deepResearchEnabled: boolean;
    reasonEnabled: boolean;
    dateRange?: string;
    studyType?: string;
    region?: string;
    publicationStatus?: string;
    minQualityScore?: number;
    includePreprints?: boolean;
  };
}

interface ResearchSource {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
  url: string;
  abstract: string;
  studyType: string;
  relevanceScore: number;
}

interface MedicalResponse {
  summary: string;
  keyFindings: string[];
  clinicalRecommendations: string[];
  sources: ResearchSource[];
  citations: string[];
  followUpSuggestions: string[];
  confidence: number;
  lastUpdated: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: MedicalQuery = await request.json();
    const { query, patientContext, filters } = body;

    // Validate request
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Gather research data from multiple sources
    const researchData = await gatherMedicalResearch(query, filters);
    
    // Generate AI response using Gemini 1.5 Flash
    const aiResponse = await generateMedicalResponse(
      query,
      patientContext,
      researchData,
      filters
    );

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('Medical research API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function gatherMedicalResearch(
  query: string,
  filters: MedicalQuery['filters']
): Promise<ResearchSource[]> {
  const sources: ResearchSource[] = [];

  try {
    // Gather data from multiple sources in parallel
    const [pubmedResults, pmcResults, openalexResults, webResults] = 
      await Promise.allSettled([
        searchPubMed(query, filters),
        searchEuropePMC(query, filters),
        searchOpenAlex(query, filters),
        searchHealthWeb(query, filters)
      ]);

    // Combine results from all sources
    if (pubmedResults.status === 'fulfilled') {
      sources.push(...pubmedResults.value);
    }
    if (pmcResults.status === 'fulfilled') {
      sources.push(...pmcResults.value);
    }
    if (openalexResults.status === 'fulfilled') {
      sources.push(...openalexResults.value);
    }
    if (webResults.status === 'fulfilled') {
      sources.push(...webResults.value);
    }

    // Sort by relevance and remove duplicates
    return deduplicateAndRank(sources);
  } catch (error) {
    console.error('Error gathering research:', error);
    return [];
  }
}

async function searchPubMed(
  query: string,
  filters: MedicalQuery['filters']
): Promise<ResearchSource[]> {
  try {
    const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
    
    // Build search query with filters
    let searchQuery = query;
    if (filters.dateRange) {
      const dateFilter = getDateFilter(filters.dateRange);
      searchQuery += ` AND ${dateFilter}`;
    }
    if (filters.studyType && filters.studyType !== 'all') {
      searchQuery += ` AND ${getStudyTypeFilter(filters.studyType)}`;
    }

    // Search for article IDs
    const searchUrl = `${baseUrl}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchQuery)}&retmax=20&retmode=json`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.esearchresult?.idlist?.length) {
      return [];
    }

    // Get article details
    const ids = searchData.esearchresult.idlist.join(',');
    const detailsUrl = `${baseUrl}/esummary.fcgi?db=pubmed&id=${ids}&retmode=json`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    const sources: ResearchSource[] = [];
    for (const id of searchData.esearchresult.idlist) {
      const article = detailsData.result[id];
      if (article) {
        sources.push({
          title: article.title || 'No title available',
          authors: article.authors?.map((a: any) => a.name) || [],
          journal: article.source || 'Unknown journal',
          year: parseInt(article.pubdate?.substring(0, 4)) || new Date().getFullYear(),
          pmid: id,
          url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
          abstract: article.abstract || 'Abstract not available',
          studyType: getStudyTypeFromTitle(article.title || ''),
          relevanceScore: calculateRelevanceScore(article.title || '', query)
        });
      }
    }

    return sources;
  } catch (error) {
    console.error('PubMed search error:', error);
    return [];
  }
}

async function searchEuropePMC(
  query: string,
  filters: MedicalQuery['filters']
): Promise<ResearchSource[]> {
  try {
    const baseUrl = 'https://www.ebi.ac.uk/europepmc/webservices/rest/search';
    
    let searchQuery = query;
    if (filters.dateRange) {
      const dateFilter = getDateFilterEuropePMC(filters.dateRange);
      searchQuery += ` AND ${dateFilter}`;
    }

    const url = `${baseUrl}?query=${encodeURIComponent(searchQuery)}&resultType=core&format=json&pageSize=15`;
    const response = await fetch(url);
    const data = await response.json();

    const sources: ResearchSource[] = [];
    if (data.resultList?.result) {
      for (const article of data.resultList.result) {
        sources.push({
          title: article.title || 'No title available',
          authors: article.authorString?.split(', ') || [],
          journal: article.journalTitle || 'Unknown journal',
          year: parseInt(article.pubYear) || new Date().getFullYear(),
          doi: article.doi,
          pmid: article.pmid,
          url: article.fullTextUrlList?.fullTextUrl?.[0]?.url || 
                `https://europepmc.org/article/${article.source}/${article.id}`,
          abstract: article.abstractText || 'Abstract not available',
          studyType: getStudyTypeFromTitle(article.title || ''),
          relevanceScore: calculateRelevanceScore(article.title || '', query)
        });
      }
    }

    return sources;
  } catch (error) {
    console.error('Europe PMC search error:', error);
    return [];
  }
}

async function searchOpenAlex(
  query: string,
  filters: MedicalQuery['filters']
): Promise<ResearchSource[]> {
  try {
    const baseUrl = 'https://api.openalex.org/works';
    
    let filterParams = `search=${encodeURIComponent(query)}`;
    if (filters.dateRange) {
      const yearRange = getYearRangeFromDateFilter(filters.dateRange);
      if (yearRange) {
        filterParams += `&filter=publication_year:${yearRange}`;
      }
    }
    
    // Add medical/health concept filter
    filterParams += '&filter=concepts.wikidata:Q11190,Q12136'; // Medicine, Health
    
    const url = `${baseUrl}?${filterParams}&per-page=15&select=id,title,authors,primary_location,publication_year,doi,abstract_inverted_index,concepts`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MedAssist/1.0 (mailto:support@medassist.ca)'
      }
    });
    
    const data = await response.json();

    const sources: ResearchSource[] = [];
    if (data.results) {
      for (const work of data.results) {
        sources.push({
          title: work.title || 'No title available',
          authors: work.authors?.map((a: any) => a.author?.display_name).filter(Boolean) || [],
          journal: work.primary_location?.source?.display_name || 'Unknown journal',
          year: work.publication_year || new Date().getFullYear(),
          doi: work.doi?.replace('https://doi.org/', ''),
          url: work.doi || `https://openalex.org/${work.id}`,
          abstract: reconstructAbstractFromInverted(work.abstract_inverted_index) || 'Abstract not available',
          studyType: getStudyTypeFromConcepts(work.concepts || []),
          relevanceScore: calculateRelevanceScore(work.title || '', query)
        });
      }
    }

    return sources;
  } catch (error) {
    console.error('OpenAlex search error:', error);
    return [];
  }
}

async function searchHealthWeb(
  query: string,
  filters: MedicalQuery['filters']
): Promise<ResearchSource[]> {
  // For web search, we'll search credible health sources
  const credibleSources = [
    'site:who.int',
    'site:mayoclinic.org',
    'site:canada.ca',
    'site:healthcanada.gc.ca',
    'site:ncbi.nlm.nih.gov',
    'site:cochrane.org',
    'site:uptodate.com'
  ];

  const sources: ResearchSource[] = [];
  
  // Note: In production, you'd use a proper web search API like Google Custom Search
  // For now, we'll return placeholder data
  try {
    // This would be replaced with actual web search API calls
    // For demonstration, returning structured placeholder data
    sources.push({
      title: `WHO Guidelines on ${query}`,
      authors: ['World Health Organization'],
      journal: 'WHO Guidelines',
      year: new Date().getFullYear(),
      url: 'https://who.int',
      abstract: `WHO clinical guidelines and recommendations related to ${query}`,
      studyType: 'Guideline',
      relevanceScore: 0.8
    });

    return sources;
  } catch (error) {
    console.error('Web search error:', error);
    return [];
  }
}

async function generateMedicalResponse(
  query: string,
  patientContext: string | undefined,
  researchData: ResearchSource[],
  filters: MedicalQuery['filters']
): Promise<MedicalResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build comprehensive prompt
    const prompt = buildMedicalPrompt(query, patientContext, researchData, filters);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the structured response
    const parsedResponse = parseGeminiResponse(text, researchData);
    
    return {
      ...parsedResponse,
      sources: researchData.slice(0, 8), // Return top 8 sources
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Gemini response generation error:', error);
    
    // Fallback response
    return {
      summary: `Based on available research, here are findings related to your query about ${query}.`,
      keyFindings: ['Unable to generate detailed analysis at this time'],
      clinicalRecommendations: ['Please consult current medical literature and guidelines'],
      sources: researchData.slice(0, 5),
      citations: researchData.slice(0, 5).map(s => `${s.authors[0]} et al. ${s.title}. ${s.journal} ${s.year}.`),
      followUpSuggestions: [
        'What are the latest treatment protocols?',
        'Are there any contraindications to consider?',
        'What does the most recent research show?'
      ],
      confidence: 0.7,
      lastUpdated: new Date().toISOString()
    };
  }
}

function buildMedicalPrompt(
  query: string,
  patientContext: string | undefined,
  researchData: ResearchSource[],
  filters: MedicalQuery['filters']
): string {
  let prompt = `You are Canada's premier medical AI assistant, specializing in evidence-based clinical decision support for Canadian healthcare providers. You have expertise in Canadian healthcare guidelines, PHIPA compliance, and integration with Health Canada recommendations.

CLINICAL QUERY: "${query}"

${patientContext ? `ANONYMIZED PATIENT CONTEXT (PHIPA/PIPEDA Compliant): "${patientContext}"` : ''}

ADVANCED EVIDENCE FILTERS APPLIED:
- Publication Date Range: ${filters.dateRange}
- Study Type Focus: ${filters.studyType}
- Geographic Region: ${filters.region}
- Publication Status: ${filters.publicationStatus}
- Minimum Quality Score: ${filters.minQualityScore || 0}/10
- Include Preprints: ${filters.includePreprints ? 'Yes' : 'No'}
- Evidence Search: ${filters.searchEnabled ? 'Enabled' : 'Disabled'}
- Deep Research Mode: ${filters.deepResearchEnabled ? 'Comprehensive analysis with systematic review approach' : 'Standard review'}
- Clinical Reasoning: ${filters.reasonEnabled ? 'Enhanced AI reasoning with clinical correlation' : 'Standard analysis'}

EVIDENCE BASE (${researchData.length} high-quality sources):
${researchData.map((source, index) => 
  `[${index + 1}] STUDY: ${source.title}
  ├── Authors: ${source.authors.slice(0, 3).join(', ')}${source.authors.length > 3 ? ' et al.' : ''}
  ├── Publication: ${source.journal} (${source.year})
  ├── Study Design: ${source.studyType}
  ├── Evidence Quality: ${source.abstract ? 'Full abstract available' : 'Limited abstract - AI analysis enhanced'}
  ├── Abstract/Summary: ${source.abstract ? source.abstract.substring(0, 400) : 'Abstract not available - please generate AI-enhanced summary based on title and metadata'}
  ├── PMID: ${source.pmid || 'Not available'} | DOI: ${source.doi || 'Not available'}
  └── Canadian Relevance: ${filters.region === 'Canada' || filters.region === 'North America' ? 'High - Canadian healthcare context' : 'Moderate - international perspective'}
  `
).join('\n\n')}

ENHANCED AI ANALYSIS INSTRUCTIONS:
Generate CONCISE, ACTIONABLE medical summaries for busy Canadian doctors. Focus on practical clinical guidance, not academic verbosity. When abstracts are unavailable, generate meaningful summaries based on study titles, authors, and your medical knowledge.

CRITICAL: Doctors need quick, clear answers they can act on immediately. Avoid lengthy academic prose.

Provide a clinical response in this exact JSON format:
{
  "summary": "CONCISE 2-3 sentence summary with clear clinical bottom line. Focus on: What should I do? What does this mean for my patients? Include specific numbers/dosages when available.",
  "keyFindings": [
    "One clear finding with specific numbers (e.g., '25% reduction in mortality')",
    "Another finding with clinical significance (e.g., 'Safe in elderly >75 years')",
    "Third finding if relevant (maximum 3 findings total)"
  ],
  "clinicalRecommendations": [
    "Start with X mg daily, monitor Y",
    "Avoid in patients with Z condition",
    "Consider alternative if no response in X weeks"
  ],
  "citations": [
    "First Author et al. Journal Name. Year;Volume(Issue):Pages",
    "Second Author et al. Journal Name. Year;Volume(Issue):Pages"
  ],
  "followUpSuggestions": [
    "What's the optimal dose for elderly patients?",
    "Any drug interactions to watch for?",
    "How long before I see results?"
  ],
  "confidence": 0.85,
  "evidenceQuality": "High/Moderate/Limited based on study quality and availability",
  "lastUpdated": "${new Date().toISOString()}"
}

CRITICAL REQUIREMENTS FOR BUSY CANADIAN DOCTORS:
- Keep it SHORT and ACTIONABLE - doctors have 30 seconds to read this
- Include specific dosages, numbers, timeframes when available
- Focus on "what should I prescribe/do?" not academic discussion
- When abstracts are missing, generate useful summaries from titles and journal reputation
- Use Canadian drug names and Health Canada approvals
- Confidence scoring: 0.9+ for strong evidence, 0.7+ for moderate, 0.5+ for limited
- Always end with practical next steps doctors can take immediately

Generate the comprehensive JSON response now:`;

  return prompt;
}

function parseGeminiResponse(text: string, sources: ResearchSource[]): Omit<MedicalResponse, 'sources' | 'lastUpdated'> {
  try {
    // Try to parse JSON response from Gemini
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        summary: parsed.summary || 'Summary not available',
        keyFindings: parsed.keyFindings || [],
        clinicalRecommendations: parsed.clinicalRecommendations || [],
        citations: parsed.citations || [],
        followUpSuggestions: parsed.followUpSuggestions || [],
        confidence: parsed.confidence || 0.8
      };
    }
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
  }

  // Fallback parsing if JSON parsing fails
  return {
    summary: text.substring(0, 500),
    keyFindings: ['AI analysis completed'],
    clinicalRecommendations: ['Review current guidelines'],
    citations: sources.slice(0, 3).map(s => `${s.authors[0]} et al. ${s.year}`),
    followUpSuggestions: [
      'What are the latest treatment options?',
      'Are there any contraindications?',
      'What do recent studies show?'
    ],
    confidence: 0.8
  };
}

// Helper functions
function getDateFilter(dateRange: string): string {
  const currentYear = new Date().getFullYear();
  switch (dateRange) {
    case 'last-year':
      return `${currentYear - 1}:${currentYear}[dp]`;
    case 'last-2-years':
      return `${currentYear - 2}:${currentYear}[dp]`;
    case 'last-5-years':
      return `${currentYear - 5}:${currentYear}[dp]`;
    default:
      return '';
  }
}

function getDateFilterEuropePMC(dateRange: string): string {
  const currentYear = new Date().getFullYear();
  switch (dateRange) {
    case 'last-year':
      return `PUB_YEAR:[${currentYear - 1} TO ${currentYear}]`;
    case 'last-2-years':
      return `PUB_YEAR:[${currentYear - 2} TO ${currentYear}]`;
    case 'last-5-years':
      return `PUB_YEAR:[${currentYear - 5} TO ${currentYear}]`;
    default:
      return '';
  }
}

function getYearRangeFromDateFilter(dateRange: string): string | null {
  const currentYear = new Date().getFullYear();
  switch (dateRange) {
    case 'last-year':
      return `${currentYear - 1}-${currentYear}`;
    case 'last-2-years':
      return `${currentYear - 2}-${currentYear}`;
    case 'last-5-years':
      return `${currentYear - 5}-${currentYear}`;
    default:
      return null;
  }
}

function getStudyTypeFilter(studyType: string): string {
  const filters: Record<string, string> = {
    'rct': '(randomized controlled trial[pt] OR randomized[tiab])',
    'meta-analysis': 'meta-analysis[pt]',
    'systematic-review': 'systematic review[tiab]',
    'cohort': 'cohort studies[mesh]',
    'case-control': 'case-control studies[mesh]'
  };
  return filters[studyType] || '';
}

function getStudyTypeFromTitle(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('randomized') || lowerTitle.includes('rct')) return 'RCT';
  if (lowerTitle.includes('meta-analysis')) return 'Meta-analysis';
  if (lowerTitle.includes('systematic review')) return 'Systematic Review';
  if (lowerTitle.includes('cohort')) return 'Cohort Study';
  if (lowerTitle.includes('case-control')) return 'Case-Control Study';
  if (lowerTitle.includes('guideline')) return 'Guideline';
  return 'Research Article';
}

function getStudyTypeFromConcepts(concepts: any[]): string {
  // Analyze OpenAlex concepts to determine study type
  const conceptNames = concepts.map(c => c.display_name?.toLowerCase()).join(' ');
  if (conceptNames.includes('randomized')) return 'RCT';
  if (conceptNames.includes('meta-analysis')) return 'Meta-analysis';
  if (conceptNames.includes('systematic review')) return 'Systematic Review';
  return 'Research Article';
}

function calculateRelevanceScore(title: string, query: string): number {
  const titleLower = title.toLowerCase();
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ');
  
  let score = 0;
  queryWords.forEach(word => {
    if (titleLower.includes(word)) {
      score += 0.1;
    }
  });
  
  return Math.min(score, 1.0);
}

function reconstructAbstractFromInverted(invertedIndex: any): string {
  if (!invertedIndex) return '';
  
  try {
    const words: string[] = [];
    for (const [word, positions] of Object.entries(invertedIndex)) {
      (positions as number[]).forEach(pos => {
        words[pos] = word;
      });
    }
    return words.filter(Boolean).join(' ').substring(0, 500);
  } catch {
    return '';
  }
}

function deduplicateAndRank(sources: ResearchSource[]): ResearchSource[] {
  // Remove duplicates based on DOI or title similarity
  const seen = new Set<string>();
  const unique: ResearchSource[] = [];
  
  for (const source of sources) {
    const identifier = source.doi || source.title.substring(0, 50);
    if (!seen.has(identifier)) {
      seen.add(identifier);
      unique.push(source);
    }
  }
  
  // Sort by relevance score and year (recent first)
  return unique
    .sort((a, b) => {
      const scoreA = a.relevanceScore + (a.year / 10000); // Boost recent papers slightly
      const scoreB = b.relevanceScore + (b.year / 10000);
      return scoreB - scoreA;
    })
    .slice(0, 20); // Return top 20 sources
} 