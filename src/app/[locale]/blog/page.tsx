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

const categoryLabels: Record<BlogCategory, string> = {
  'security-guides': '安全指南',
  'case-studies': '案例分析',
  'technical-analysis': '技术解析',
  'industry-news': '行业动态',
  'recovery-tutorials': '追币教程',
}

const categoryColors: Record<BlogCategory, string> = {
  'security-guides': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'case-studies': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'technical-analysis': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'industry-news': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'recovery-tutorials': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const categoryCounts = getCategoryCounts()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = activeCategory
    ? allPosts.filter(post => post.category === activeCategory)
    : allPosts

  const featuredPost = allPosts.find(post => post.featured) || allPosts[0]
  const regularPosts = filteredPosts.filter(post => post.slug !== featuredPost?.slug)

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
                      <span className={`${categoryColors[featuredPost.category]} border px-3 py-1 rounded-full text-sm font-medium`}>
                        {categoryLabels[featuredPost.category]}
                      </span>
                      {featuredPost.featured && (
                        <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm font-medium">
                          精选
                        </span>
                      )}
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
                        {featuredPost.readTime} 分钟阅读
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center min-h-[250px]">
                    <div className="text-8xl">🛡️</div>
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
                {/* Card Image Placeholder */}
                <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-slate-700/50">
                  <span className="text-5xl">
                    {post.category === 'security-guides' && '🔐'}
                    {post.category === 'case-studies' && '📊'}
                    {post.category === 'technical-analysis' && '🔍'}
                    {post.category === 'industry-news' && '📰'}
                    {post.category === 'recovery-tutorials' && '💰'}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Category */}
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <span className={`${categoryColors[post.category]} border px-2 py-0.5 rounded text-xs font-medium`}>
                      {categoryLabels[post.category]}
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
                        {post.readTime}分钟
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
              <h3 className="text-xl font-semibold text-slate-300 mb-2">暂无文章</h3>
              <p className="text-slate-500">该分类下暂时没有文章</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
