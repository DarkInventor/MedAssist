import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '../../blog-data'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.category
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const categoryPosts = blogPosts.filter(post => 
    post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  )

  if (categoryPosts.length === 0) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    }
  }

  return {
    title: `${categoryName} - MedAssist Blog | AI Healthcare Insights`,
    description: `Read the latest ${categoryName.toLowerCase()} articles from MedAssist. Expert insights on AI in healthcare, clinic automation, and medical technology in Canada.`,
    keywords: `${categoryName.toLowerCase()}, AI healthcare, medical AI, Canadian healthcare, ${categoryName.toLowerCase()} articles`,
    openGraph: {
      title: `${categoryName} - MedAssist Blog`,
      description: `Latest ${categoryName.toLowerCase()} articles and insights from MedAssist.`,
      url: `https://medassist.ai/blog/category/${categorySlug}`,
    },
    alternates: {
      canonical: `/blog/category/${categorySlug}`,
    }
  }
}

export async function generateStaticParams() {
  const categories = Array.from(new Set(blogPosts.map(post => post.category)))
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category
  const categoryPosts = blogPosts.filter(post => 
    post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  )

  if (categoryPosts.length === 0) {
    notFound()
  }

  const categoryName = categoryPosts[0].category
  const allCategories = Array.from(new Set(blogPosts.map(post => post.category)))

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
              <span className="text-gray-900">{categoryName}</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {categoryName}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''} about {categoryName.toLowerCase()}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Category Navigation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allCategories.map((category) => {
              const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
              const postsInCategory = blogPosts.filter(post => post.category === category)
              const isActive = category === categoryName
              
              return (
                <Link 
                  key={category}
                  href={`/blog/category/${categorySlug}`}
                  className={`border rounded-xl p-4 text-center transition-all ${
                    isActive 
                      ? 'border-blue-300 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
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
                  <p className="text-xs text-gray-500">{postsInCategory.length} articles</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map((post) => (
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

        {/* Back to Blog */}
        <div className="text-center mb-16">
          <Link 
            href="/blog"
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            ← Back to All Articles
          </Link>
        </div>

        {/* Newsletter Signup */}
        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated on {categoryName}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest {categoryName.toLowerCase()} insights and updates delivered to your inbox.
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
            "name": `${categoryName} - MedAssist Blog`,
            "description": `Latest ${categoryName.toLowerCase()} articles from MedAssist`,
            "url": `https://medassist.ai/blog/category/${categorySlug}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": categoryPosts.map((post, index) => ({
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