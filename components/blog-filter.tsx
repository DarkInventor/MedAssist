'use client'

import { useState } from 'react'

interface BlogFilterProps {
  categories: string[]
}

export default function BlogFilter({ categories }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const allCategories = ['All', ...categories]

  return (
    <section className="mb-12">
      <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '1rem'}}>
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Search */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{borderRadius: '1rem'}}
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
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{borderRadius: '1rem'}}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-500">
            <span className="font-medium">24</span> articles found
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
    </section>
  )
} 