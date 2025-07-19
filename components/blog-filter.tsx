'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { blogPosts } from '../app/blog/blog-data'

interface BlogFilterProps {
  categories: string[]
  showResults?: boolean
}

export default function BlogFilter({ categories, showResults = true }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const allCategories = ['All', ...categories]

  useEffect(() => {
    let filtered = blogPosts

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(post => post.category === activeCategory)
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    setFilteredPosts(filtered)
  }, [activeCategory, searchTerm])

  return (
    <section className="mb-12">
      <div className="bg-white border border-gray-200 p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Search */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-xl ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-500">
            <span className="font-medium">{filteredPosts.length}</span> articles found
          </div>
        </div>

        {/* Active Filters */}
        {(activeCategory !== 'All' || searchTerm) && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Filters:</span>
            {activeCategory !== 'All' && (
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {activeCategory}
                <button 
                  onClick={() => setActiveCategory('All')}
                  className="ml-1 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                "{searchTerm}"
                <button 
                  onClick={() => setSearchTerm('')}
                  className="ml-1 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            <button 
              onClick={() => {
                setActiveCategory('All')
                setSearchTerm('')
              }}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Filtered Results */}
      {showResults && (
        <div className="mt-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <button 
                onClick={() => {
                  setActiveCategory('All')
                  setSearchTerm('')
                }}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
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
          )}
        </div>
      )}
    </section>
  )
} 