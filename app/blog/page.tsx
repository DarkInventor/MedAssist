import { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from './blog-data'

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
  alternates: {
    canonical: 'https://medassist.ai/blog'
  }
}

export default function BlogIndex() {
  const featuredPost = blogPosts[0]
  const recentPosts = blogPosts.slice(1, 7)
  const categories = Array.from(new Set(blogPosts.map(post => post.category)))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-4xl mx-auto px-6 mt-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Expert insights on AI in healthcare, clinic automation, and the future of medical technology in Canada
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Featured Post */}
       

        {/* Recent Posts */}
        <section className="mb-20">
          <div className="space-y-12">
            {recentPosts.map((post) => (
              <article key={post.slug} className="border-b border-gray-100 pb-12 last:border-b-0">
                <div className="mb-4">
                  <span className="text-blue-600 text-sm font-medium">
                    {post.category}
                  </span> 
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  <Link href={`/blog/${post.slug}`} className="hover:text-gray-700 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 pt-12 border-t border-gray-100 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Get the latest insights on AI in healthcare delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
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