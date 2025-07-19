import { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '../blog-data'
import AllPostsClient from './all-posts-client'

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
  return (
    <>
      <AllPostsClient blogPosts={blogPosts} />
      
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
    </>
  )
} 