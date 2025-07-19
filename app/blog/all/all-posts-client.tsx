'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BlogPost } from '../blog-data'

interface AllPostsClientProps {
  blogPosts: BlogPost[]
}

const categories = [
  { name: 'All', slug: 'all', count: 0 }, // Will be calculated
  { name: 'Clinic Technology', slug: 'clinic-technology', count: 0 },
  { name: 'Documentation', slug: 'documentation', count: 0 },
  { name: 'Business Analysis', slug: 'business-analysis', count: 0 },
  { name: 'AI Integration', slug: 'ai-integration', count: 0 },
  { name: 'Patient Care', slug: 'patient-care', count: 0 },
  { name: 'Compliance', slug: 'compliance', count: 0 },
  { name: 'Product Updates', slug: 'product-updates', count: 0 }
]

// CSS gradients like main blog page
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #91a7ff 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff8a80 0%, #ea4c89 100%)',
  'linear-gradient(135deg, #8fd3f4 0%, #84fab0 100%)',
  'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
]

export default function AllPostsClient({ blogPosts }: AllPostsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  // Calculate category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.slug === 'all' 
      ? blogPosts.length 
      : blogPosts.filter(p => p.category === cat.name).length
  }))

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(blogPosts)
    } else {
      const category = categoriesWithCounts.find(c => c.slug === selectedCategory)
      if (category) {
        setFilteredPosts(blogPosts.filter(post => post.category === category.name))
      }
    }
  }, [selectedCategory, blogPosts])

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-40 w-64 h-screen bg-white z-10">
        <div className="flex flex-col h-full">
          {/* Logo/Header Space */}
          {/* <div className="h-20 flex items-center justify-center border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          </div> */}
          
          {/* Navigation Menu */}
          <div className="flex-1 p-6 py-20">
            <nav className="space-y-1">
              {categoriesWithCounts.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`group w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center justify-between ${
                    selectedCategory === category.slug
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{category.name}</span>
                  <svg 
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area with Left Margin */}
      <div className="ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <span>•</span>
              <span className="text-gray-900">All Articles</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory === 'all' ? 'All Articles' : categoriesWithCounts.find(c => c.slug === selectedCategory)?.name}
            </h1>
            <p className="text-gray-600">
              {selectedCategory === 'all' 
                ? `Browse our complete collection of ${blogPosts.length} articles on AI in healthcare`
                : `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} about ${categoriesWithCounts.find(c => c.slug === selectedCategory)?.name.toLowerCase()}`
              }
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.map((post, index) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Gradient Thumbnail */}
                  <div 
                    className="aspect-[4/3] rounded-xl mb-4"
                    style={{ background: gradients[index % gradients.length] }}
                  />
                  
                  {/* Post Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">We're working on new content for this category.</p>
            </div>
          )}

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
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-2xl p-8 text-center">
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
      </div>
    </div>
  )
} 