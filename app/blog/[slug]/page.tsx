import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts, generateBlogSEO } from '../blog-data'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  
  return generateBlogSEO(post)
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug
  }))
}

// CSS gradients for consistent design
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #91a7ff 100%)',
]

function renderMarkdownContent(content: string) {
  const sections = content.split('\n\n')
  
  const processInlineFormatting = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
  }
  
  return sections.map((section, index) => {
    const trimmed = section.trim()
    
    if (trimmed.startsWith('# ')) {
      const headerText = trimmed.replace('# ', '')
      return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.startsWith('## ')) {
      const headerText = trimmed.replace('## ', '')
      return <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-8 leading-tight" dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.startsWith('### ')) {
      const headerText = trimmed.replace('### ', '')
      return <h3 key={index} className="text-xl font-semibold text-gray-900 mb-3 mt-6 leading-tight" dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.startsWith('#### ')) {
      const headerText = trimmed.replace('#### ', '')
      return <h4 key={index} className="text-lg font-semibold text-gray-900 mb-3 mt-4 leading-tight" dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.startsWith('##### ')) {
      const headerText = trimmed.replace('##### ', '')
      return <h5 key={index} className="text-base font-semibold text-gray-900 mb-2 mt-4 leading-tight" dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
      const listItems = trimmed.split('\n').filter(item => item.trim().startsWith('- '))
      return (
        <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-gray-700 leading-relaxed">
          {listItems.map((item, itemIndex) => {
            const itemText = item.replace(/^- /, '')
            return (
              <li key={itemIndex} dangerouslySetInnerHTML={{ __html: processInlineFormatting(itemText) }} />
            )
          })}
        </ul>
      )
    } else if (trimmed.includes('\n1. ') || trimmed.match(/^\d+\. /)) {
      const listItems = trimmed.split('\n').filter(item => item.trim().match(/^\d+\. /))
      return (
        <ol key={index} className="list-decimal list-inside space-y-2 mb-6 text-gray-700 leading-relaxed">
          {listItems.map((item, itemIndex) => {
            const itemText = item.replace(/^\d+\. /, '')
            return (
              <li key={itemIndex} dangerouslySetInnerHTML={{ __html: processInlineFormatting(itemText) }} />
            )
          })}
        </ol>
      )
    } else if (trimmed.startsWith('> ')) {
      const quoteText = trimmed.replace('> ', '')
      return (
        <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-2 mb-6 bg-blue-50 rounded-r-lg">
          <p className="text-gray-700 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: processInlineFormatting(quoteText) }} />
        </blockquote>
      )
    } else if (trimmed) {
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: processInlineFormatting(trimmed) }} />
      )
    }
    
    return null
  }).filter(Boolean)
}

export default function BlogPost({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  const postIndex = blogPosts.findIndex(p => p.slug === post.slug)
  const gradientIndex = postIndex >= 0 ? postIndex % gradients.length : 0

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Blog */}
      <div className="border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Image */}
          <div 
            className="aspect-[2/1] rounded-2xl mb-8"
            style={{ background: gradients[gradientIndex] }}
          />
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.date}</span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <img 
                  src={`https://avatar.vercel.sh/${post.author}`} 
                  alt={`${post.author} avatar`}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div>
                <div className="text-gray-900 font-medium">{post.author}</div>
                <div className="text-gray-600 text-sm">Medical AI Specialist</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <article className="prose prose-lg max-w-none">
            <div className="blog-content text-lg">
              {renderMarkdownContent(post.content)}
            </div>
          </article>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Call-to-Action */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 p-8 text-center rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Practice with AI?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Experience how MedAssist can reduce your documentation time by 60% while improving patient care quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/demo"
                className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors rounded-xl"
              >
                Book a Demo
              </Link>
              <Link 
                href="/trial"
                className="bg-white text-gray-700 px-8 py-3 font-medium border border-gray-200 hover:bg-gray-50 transition-colors rounded-xl"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => {
                const relatedGradientIndex = (gradientIndex + index + 1) % gradients.length
                return (
                  <article key={relatedPost.slug} className="bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-all rounded-2xl group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div 
                        className="h-48 w-full"
                        style={{ background: gradients[relatedGradientIndex] }}
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            {relatedPost.category}
                          </span>
                          <span className="text-xs text-gray-500">{relatedPost.date}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                          {relatedPost.excerpt}
                        </p>
                        <div className="text-blue-600 font-medium text-sm">
                          Read more →
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Never Miss an Update
          </h3>
          <p className="text-gray-600 mb-6">
            Get the latest insights on AI in healthcare delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl"
            />
            <button className="bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition-colors rounded-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogSEO(post).structuredData)
        }}
      />
    </div>
  )
} 