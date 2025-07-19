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
      return <h1 key={index} dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.startsWith('## ')) {
      const headerText = trimmed.replace('## ', '')
      return <h2 key={index} dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.startsWith('### ')) {
      const headerText = trimmed.replace('### ', '')
      return <h3 key={index} dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.startsWith('#### ')) {
      const headerText = trimmed.replace('#### ', '')
      return <h4 key={index} dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.startsWith('##### ')) {
      const headerText = trimmed.replace('##### ', '')
      return <h5 key={index} dangerouslySetInnerHTML={{ __html: processInlineFormatting(headerText) }} />
    } else if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
      const listItems = trimmed.split('\n').filter(item => item.trim().startsWith('- '))
      return (
        <ul key={index}>
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
        <ol key={index}>
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
        <blockquote key={index}>
          <p dangerouslySetInnerHTML={{ __html: processInlineFormatting(quoteText) }} />
        </blockquote>
      )
    } else if (trimmed) {
      return (
        <p key={index} dangerouslySetInnerHTML={{ __html: processInlineFormatting(trimmed) }} />
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

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">MedAssist</Link>
            <span>•</span>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <span>•</span>
            <span className="text-gray-900">{post.category}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-gray-500 text-sm">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-gray-900 font-medium">{post.author}</div>
                <div className="text-gray-600 text-sm">
                  {post.date} • {post.readTime}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200" style={{borderRadius: '0.5rem'}}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200" style={{borderRadius: '0.5rem'}}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <article className="prose prose-lg prose-gray max-w-none">
            <div className="blog-content">
              {renderMarkdownContent(post.content)}
            </div>
          </article>
          
          {/* Call-to-Action */}
                     <div className="mt-16 bg-gray-50 border border-gray-200 p-8 text-center" style={{borderRadius: '1rem'}}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Practice with AI?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Experience how MedAssist can reduce your documentation time by 60% while improving patient care quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/demo"
                className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors"
                style={{borderRadius: '1rem'}}
              >
                Book a Demo
              </Link>
              <Link 
                href="/trial"
                className="bg-white text-gray-700 px-8 py-3 font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                style={{borderRadius: '1rem'}}
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
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.slug} className="bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors" style={{borderRadius: '1rem'}}>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {relatedPost.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${relatedPost.slug}`}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
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
              className="flex-1 px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{borderRadius: '1rem'}}
            />
            <button className="bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition-colors" style={{borderRadius: '1rem'}}>
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