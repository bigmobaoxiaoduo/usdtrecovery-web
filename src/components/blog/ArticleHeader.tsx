import { Calendar, Clock, User } from 'lucide-react'

interface ArticleHeaderProps {
  title: string
  excerpt: string
  date: string
  category: string
  readTime: number
  author: {
    name: string
    title: string
    avatar?: string
  }
  tags?: string[]
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'security-guides': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'case-studies': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'technical-analysis': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  'industry-news': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  'recovery-tutorials': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
}

const categoryLabels: Record<string, string> = {
  'security-guides': '安全指南',
  'case-studies': '案例分析',
  'technical-analysis': '技术解析',
  'industry-news': '行业动态',
  'recovery-tutorials': '追币教程',
}

export default function ArticleHeader({
  title,
  excerpt,
  date,
  category,
  readTime,
  author,
  tags = [],
}: ArticleHeaderProps) {
  const colors = categoryColors[category] || categoryColors['security-guides']
  const categoryLabel = categoryLabels[category] || category

  return (
    <header className="mb-10">
      {/* Category & Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className={`${colors.bg} ${colors.text} ${colors.border} border px-4 py-1.5 rounded-full text-sm font-medium`}>
          {categoryLabel}
        </span>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Calendar className="w-4 h-4" />
          {date}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="w-4 h-4" />
          {readTime} 分钟阅读
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
        {title}
      </h1>

      {/* Excerpt */}
      <p className="text-xl text-slate-400 leading-relaxed mb-8">
        {excerpt}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 py-6 border-y border-slate-800">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
          {author.avatar ? (
            <img 
              src={author.avatar} 
              alt={`${author.name} - 文章作者头像`} 
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            author.name.charAt(0)
          )}
        </div>
        <div>
          <div className="font-semibold text-white">{author.name}</div>
          <div className="text-sm text-slate-400">{author.title}</div>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-slate-800/50 text-slate-400 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}
