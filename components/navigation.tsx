'use client'

import { useState } from 'react'
import Link from 'next/link'
import { blogPosts } from '../app/blog/blog-data'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(false)
  
  const categories = Array.from(new Set(blogPosts.map(post => post.category)))

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MedAssist
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              
              {/* Blog Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsBlogMenuOpen(!isBlogMenuOpen)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  Blog
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isBlogMenuOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2">
                      <Link 
                        href="/blog" 
                        className="block text-gray-700 hover:text-blue-600 py-2 font-medium"
                        onClick={() => setIsBlogMenuOpen(false)}
                      >
                        All Articles
                      </Link>
                      <div className="border-t border-gray-100 my-2"></div>
                      <div className="grid grid-cols-1 gap-1">
                        {categories.map((category) => {
                          const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
                          const categoryPosts = blogPosts.filter(post => post.category === category)
                          
                          return (
                            <Link
                              key={category}
                              href={`/blog/category/${categorySlug}`}
                              className="flex items-center justify-between text-gray-600 hover:text-blue-600 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                              onClick={() => setIsBlogMenuOpen(false)}
                            >
                              <span className="text-sm">{category}</span>
                              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                {categoryPosts.length}
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/knowledge" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Knowledge
              </Link>
              
              <Link 
                href="/compliance/phipa" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Compliance
              </Link>
              
              <Link 
                href="/for/family-physicians" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                For Physicians
              </Link>
              
              <Link 
                href="/vs/uptodate" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Comparisons
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/demo"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Try Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              href="/blog" 
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            
            <Link 
              href="/knowledge" 
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Knowledge
            </Link>
            
            <Link 
              href="/compliance/phipa" 
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Compliance
            </Link>
            
            <Link 
              href="/for/family-physicians" 
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              For Physicians
            </Link>
            
            <Link 
              href="/vs/uptodate" 
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Comparisons
            </Link>
            
            <div className="pt-4">
              <Link 
                href="/demo"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 