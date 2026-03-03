import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { Calendar, ArrowRight } from 'lucide-react'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata = {
  title: '博客 | Web3安全知识、追回指南、成功案例',
  description: '专业的Web3安全知识、虚拟币追回指南、成功案例分析',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              安全
              <span className="gradient-text">知识库</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Web3安全科普、虚拟币追回指南、成功案例分析，
              帮助您保护数字资产安全。
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-sm text-blue-400 mb-3">
                  <span className="bg-blue-500/10 px-3 py-1 rounded-full">{post.category}</span>
                </div>

                <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>

                  <div className="flex items-center gap-1 text-sm text-blue-400 group-hover:gap-2 transition-all">
                    阅读更多
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
