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
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Blog</h1>
          
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-8 mb-12">
            {categoriesWithCounts.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`text-sm font-medium transition-colors pb-2 border-b-2 ${
                  selectedCategory === category.slug
                    ? 'text-gray-900 border-gray-900'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          {filteredPosts.length > 0 && (
            <div className="lg:col-span-2">
              <article className="group">
                <Link href={`/blog/${filteredPosts[0].slug}`} className="block">
                  {/* Large Gradient Hero */}
                  <div 
                    className="aspect-[16/9] rounded-2xl mb-6 flex items-center justify-center"
                    style={{ background: gradients[0] }}
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4 leading-tight">
                    {filteredPosts[0].title}
                  </h2>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                    <span className="font-medium">{filteredPosts[0].category}</span>
                    <span>{filteredPosts[0].date}</span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                </Link>
              </article>
            </div>
          )}

          {/* Side Articles */}
          <div className="space-y-8">
            {filteredPosts.slice(1, 4).map((post, index) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex gap-4">
                    {/* Small Gradient Thumbnail */}
                    <div 
                      className="w-24 h-24 rounded-xl flex-shrink-0"
                      style={{ background: gradients[(index + 1) % gradients.length] }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span className="font-medium">{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* More Articles Section */}
        {filteredPosts.length > 4 && (
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(4).map((post, index) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Gradient Thumbnail */}
                    <div 
                      className="aspect-[4/3] rounded-xl mb-4"
                      style={{ background: gradients[(index + 4) % gradients.length] }}
                    />
                    
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="font-medium">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            {/* <div className="text-gray-400 text-6xl mb-4">📝</div> */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">We're working on new content for this category.</p>
          </div>
        )}

        {/* Back to Blog */}
        <div className="text-center mt-16">
          <Link 
            href="/blog"
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            ← Back to Blog Home
          </Link>
        </div>
      </div>
    </div>
  )
} 