import { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '../blog-data'
import BlogFilter from '../../../components/blog-filter'

export const metadata: Metadata = {
  title: 'All Articles - MedAssist Blog | Complete Archive',
  description: 'Browse all articles from the MedAssist blog. Expert insights on AI in healthcare, clinic automation, PHIPA compliance, and medical technology in Canada.',
  keywords: 'all blog articles, AI healthcare archive, medical AI articles, Canadian healthcare blog, complete blog archive',
  openGraph: {
    title: 'All Articles - MedAssist Blog',
    description: 'Complete archive of all MedAssist blog articles and insights.',
    url: 'https://medassist.ai/blog/all',
  },
  alternates: {
    canonical: '/blog/all',
  }
}

export default function AllPostsPage() {
  const categories = Array.from(new Set(blogPosts.map(post => post.category)))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-blue-600">MedAssist</Link>
              <span>•</span>
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <span>•</span>
              <span className="text-gray-900">All Articles</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              All Articles
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Browse our complete collection of {blogPosts.length} articles on AI in healthcare
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filter and Search */}
        <BlogFilter categories={categories} />

        {/* Articles Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-50 text-blue-900 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Quick Links */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
              const categoryPosts = blogPosts.filter(post => post.category === category)
              
              return (
                <Link 
                  key={category}
                  href={`/blog/category/${categorySlug}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="text-2xl mb-2">
                    {category === 'AI & Technology' && '🤖'}
                    {category === 'Healthcare Compliance' && '🔒'}
                    {category === 'Clinical Practice' && '🩺'}
                    {category === 'Practice Management' && '📊'}
                    {category === 'Research & Innovation' && '🔬'}
                    {category === 'Industry Insights' && '📈'}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{category}</h3>
                  <p className="text-xs text-gray-500">{categoryPosts.length} articles</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Back to Blog */}
        <div className="text-center mb-16">
          <Link 
            href="/blog"
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            ← Back to Blog Home
          </Link>
        </div>

        {/* Newsletter Signup */}
        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Never Miss an Article
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get notified when we publish new articles on AI in healthcare, compliance updates, and medical technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
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
            "@type": "CollectionPage",
            "name": "All Articles - MedAssist Blog",
            "description": "Complete archive of all MedAssist blog articles",
            "url": "https://medassist.ai/blog/all",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": blogPosts.map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "BlogPosting",
                  "headline": post.title,
                  "description": post.excerpt,
                  "url": `https://medassist.ai/blog/${post.slug}`,
                  "datePublished": post.publishDate,
                  "author": {
                    "@type": "Person",
                    "name": post.author
                  }
                }
              }))
            }
          })
        }}
      />
    </div>
  )
} 