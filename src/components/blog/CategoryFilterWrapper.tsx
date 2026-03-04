'use client'

import { useState } from 'react'
import { BlogPost } from '@/lib/blog'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import CategoryFilter from './CategoryFilter'
import { useTranslation } from '@/hooks/useTranslation'

interface CategoryFilterWrapperProps {
  posts: BlogPost[]
  categoryCounts: Record<string, number>
}

const categoryLabels: Record<string, string> = {
  'security-guides': '安全指南',
  'case-studies': '案例分析',
  'technical-analysis': '技术解析',
  'industry-news': '行业动态',
  'recovery-tutorials': '追币教程',
  'DeFi安全': 'DeFi安全',
  '防骗指南': '防骗指南',
  '安全防护': '安全防护',
  '报警指南': '报警指南',
  '追回案例': '追回案例',
  '追币指南': '追币指南',
  '安全科普': '安全科普',
  '成功案例': '成功案例',
  '解冻指南': '解冻指南',
}

const categoryColors: Record<string, string> = {
  'security-guides': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'case-studies': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'technical-analysis': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'industry-news': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'recovery-tutorials': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'DeFi安全': 'bg-red-500/10 text-red-400 border-red-500/20',
  '防骗指南': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  '安全防护': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  '报警指南': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  '追回案例': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  '追币指南': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  '安全科普': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  '成功案例': 'bg-green-500/10 text-green-400 border-green-500/20',
  '解冻指南': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

// 计算阅读时间
function calculateReadTime(content: string): number {
  const wordsPerMinute = 300
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default function CategoryFilterWrapper({ posts, categoryCounts }: CategoryFilterWrapperProps) {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = activeCategory
    ? posts.filter(post => post.category === activeCategory)
    : posts

  const featuredPost = posts[0]
  const regularPosts = filteredPosts.filter(post => post.slug !== featuredPost?.slug)

  return (
    <>
      {/* Category Filter */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        counts={categoryCounts}
      />

      {/* Featured Post */}
      {!activeCategory && featuredPost && (
        <div className="mb-12">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`${categoryColors[featuredPost.category] || categoryColors['security-guides']} border px-3 py-1 rounded-full text-sm font-medium`}>
                    {categoryLabels[featuredPost.category] || featuredPost.category}
                  </span>
                  <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm font-medium">
                    {t('blog.featured')}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                  {featuredPost.title}
                </h2>
                
                <p className="text-slate-400 mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {calculateReadTime(featuredPost.content)} {t('blog.readTime')}
                  </div>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center min-h-[250px] overflow-hidden">
                {featuredPost.coverImage ? (
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-8xl">🛡️</div>
                )}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden hover:bg-slate-800/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {/* Card Cover Image */}
            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden border-b border-slate-700/50">
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">🛡️</span>
                </div>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
              {/* Category */}
              <div className="flex items-center gap-2 text-sm mb-3">
                <span className={`${categoryColors[post.category] || categoryColors['security-guides']} border px-2 py-0.5 rounded text-xs font-medium`}>
                  {categoryLabels[post.category] || post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {calculateReadTime(post.content)}{t('blog.readTimeShort')}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">{t('blog.noArticles')}</h3>
          <p className="text-slate-500">{t('blog.noArticlesDesc')}</p>
        </div>
      )}
    </>
  )
}
