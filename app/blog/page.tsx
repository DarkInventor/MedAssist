import { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from './blog-data'
import BlogFilter from '@/components/blog-filter'

export const metadata: Metadata = {
  title: 'Blog - MedAssist | AI Healthcare Insights for Canadian Physicians',
  description: 'Expert insights on AI in healthcare, clinic automation, PHIPA compliance, and the future of medical technology in Canada. Read the latest from MedAssist.',
  keywords: 'AI healthcare blog, medical AI insights, clinic automation, PHIPA compliance, Canadian healthcare technology, physiotherapy AI, medical documentation',
  openGraph: {
    title: 'MedAssist Blog - AI Healthcare Insights',
    description: 'Expert insights on AI in healthcare, clinic automation, and medical technology.',
    url: 'https://medassist.ai/blog',
    images: [{ url: '/og-blog.jpg', width: 1200, height: 630 }],
  },
  canonical: 'https://medassist.ai/blog'
}

export default function BlogIndex() {
  const featuredPost = blogPosts[0]
  const recentPosts = blogPosts.slice(1, 7)
  const categories = Array.from(new Set(blogPosts.map(post => post.category)))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              MedAssist Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights on AI in healthcare, clinic automation, and the future of medical technology in Canada
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Post */}
        <section className="mb-16">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden" style={{borderRadius: '1rem'}}>
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                <span className="text-gray-500 text-sm">
                  {featuredPost.category}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-3xl">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm">{featuredPost.author}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">{featuredPost.date}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">{featuredPost.readTime}</span>
                </div>
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition-colors"
                  style={{borderRadius: '1rem'}}
                >
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Component */}
        <BlogFilter categories={categories} />

        {/* Recent Posts Grid */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Posts</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.slug} className="bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors" style={{borderRadius: '1rem'}}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-gray-500 text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-100 text-gray-700 px-8 py-3 font-medium hover:bg-gray-200 transition-colors" style={{borderRadius: '1rem'}}>
            Load More Posts
          </button>
        </div>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-gray-50 border border-gray-200 p-8 md:p-12 text-center" style={{borderRadius: '1rem'}}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with MedAssist
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest insights on AI in healthcare, product updates, and exclusive content delivered to your inbox.
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
        </section>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "MedAssist Blog",
            "description": "Expert insights on AI in healthcare, clinic automation, and medical technology in Canada",
            "url": "https://medassist.ai/blog",
            "publisher": {
              "@type": "Organization",
              "name": "MedAssist",
              "url": "https://medassist.ai"
            },
            "blogPost": blogPosts.slice(0, 10).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `https://medassist.ai/blog/${post.slug}`,
              "datePublished": post.publishDate,
              "author": {
                "@type": "Person",
                "name": post.author
              }
            }))
          })
        }}
      />
    </div>
  )
} 