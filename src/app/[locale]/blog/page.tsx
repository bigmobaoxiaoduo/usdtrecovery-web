import Link from 'next/link'
import { getAllPosts, getCategoryCounts, BlogCategory } from '@/lib/blog'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'
import CategoryFilterWrapper from '@/components/blog/CategoryFilterWrapper'

export const metadata = {
  title: '博客 | Web3安全知识、追回指南、成功案例',
  description: '专业的Web3安全知识、虚拟币追回指南、成功案例分析，帮助您保护数字资产安全。',
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const categoryCounts = getCategoryCounts()

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              安全
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">知识库</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Web3安全科普、虚拟币追回指南、成功案例分析，
              帮助您保护数字资产安全。
            </p>
          </div>

          {/* Category Filter & Posts */}
          <CategoryFilterWrapper posts={allPosts} categoryCounts={categoryCounts} />
        </div>
      </div>
    </Layout>
  )
}
