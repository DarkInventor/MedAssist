'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { blogPosts } from './blog-data'

const categories = [
  { name: 'All', slug: 'all', count: blogPosts.length },
  { name: 'Clinic Technology', slug: 'clinic-technology', count: blogPosts.filter(p => p.category === 'Clinic Technology').length },
  { name: 'Documentation', slug: 'documentation', count: blogPosts.filter(p => p.category === 'Documentation').length },
  { name: 'Business Analysis', slug: 'business-analysis', count: blogPosts.filter(p => p.category === 'Business Analysis').length },
  { name: 'AI Integration', slug: 'ai-integration', count: blogPosts.filter(p => p.category === 'AI Integration').length },
  { name: 'Patient Care', slug: 'patient-care', count: blogPosts.filter(p => p.category === 'Patient Care').length },
  { name: 'Compliance', slug: 'compliance', count: blogPosts.filter(p => p.category === 'Compliance').length },
  { name: 'Product Updates', slug: 'product-updates', count: blogPosts.filter(p => p.category === 'Product Updates').length }
]

// CSS gradients like OpenAI
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

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(blogPosts)
    } else {
      const category = categories.find(c => c.slug === selectedCategory)
      if (category) {
        setFilteredPosts(blogPosts.filter(post => post.category === category.name))
      }
    }
  }, [selectedCategory])

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-white border-gray-100 flex flex-col pb-40">
        <div className="flex-1 flex flex-col justify-center mb-20 p-6">
         
          {/* Navigation Menu */}
          <nav className="space-y-1">
            {categories.map((category) => (
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

      {/* Main Content Area */}
      <div className="flex-1 max-w-[72%] mx-auto">
        {/* Blog Posts Grid */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900">Latest news</h2>
            <Link href="/blog/all" className="text-sm text-gray-600 hover:text-gray-900">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPosts.slice(0, 6).map((post, index) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex gap-4">
                    {/* Gradient Thumbnail */}
                    <div 
                      className="w-24 h-24 rounded-lg flex-shrink-0"
                      style={{ background: gradients[index % gradients.length] }}
                    />
                    
                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Stories Section */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Stories</h2>
              <Link href="/blog/stories" className="text-sm text-gray-600 hover:text-gray-900">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(6, 9).map((post, index) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Large Gradient Thumbnail */}
                    <div 
                      className="aspect-[4/3] rounded-xl mb-4"
                      style={{ background: gradients[(index + 6) % gradients.length] }}
                    />
                    
                    {/* Post Content */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 