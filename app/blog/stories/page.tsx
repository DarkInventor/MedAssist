import { Metadata } from 'next'
import StoriesClient from './stories-client'
import { blogPosts } from '../blog-data'

export const metadata: Metadata = {
  title: 'Stories - MedAssist Blog | Healthcare Innovation Stories',
  description: 'Read inspiring stories about AI transformation in healthcare practices. Real case studies and success stories from Canadian medical professionals using MedAssist.',
  keywords: 'healthcare stories, AI success stories, medical practice transformation, Canadian healthcare innovation, MedAssist case studies',
  openGraph: {
    title: 'Stories - MedAssist Blog | Healthcare Innovation Stories',
    description: 'Read inspiring stories about AI transformation in healthcare practices.',
    type: 'website',
  }
}

export default function StoriesPage() {
  return <StoriesClient blogPosts={blogPosts} />
} 