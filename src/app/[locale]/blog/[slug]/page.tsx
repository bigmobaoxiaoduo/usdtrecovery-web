import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedArticles from '@/components/blog/RelatedArticles'

interface Props {
  params: {
    slug: string
    locale: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const locales = ['zh', 'en']
  const paths: { slug: string; locale: string }[] = []
  
  for (const locale of locales) {
    for (const post of posts) {
      paths.push({ slug: post.slug, locale })
    }
  }
  
  return paths
}

export function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: params.locale === 'en' ? 'Article Not Found' : '文章未找到',
    }
  }

  return {
    title: `${post.title} | Web3Recovery`,
    description: post.excerpt,
  }
}

// 计算阅读时间
function calculateReadTime(content: string): number {
  const wordsPerMinute = 300
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// 分类颜色映射
const categoryColors: Record<string, string> = {
  'DeFi安全': 'bg-red-500/10 text-red-400 border-red-500/20',
  '防骗指南': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  '安全防护': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  '报警指南': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  '追回案例': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  '追币指南': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  '安全科普': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  '成功案例': 'bg-green-500/10 text-green-400 border-green-500/20',
  '解冻指南': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'DeFi Security': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Anti-Scam Guide': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Security Protection': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Police Report Guide': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Recovery Cases': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Recovery Guide': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'Security Education': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Blockchain Investigation': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug, params.locale as 'zh' | 'en')
  const allPosts = getAllPosts(params.locale as 'zh' | 'en')

  if (!post) {
    notFound()
  }

  const readTime = calculateReadTime(post.content)
  const categoryColor = categoryColors[post.category] || 'bg-blue-500/10 text-blue-400 border-blue-500/20'

  // Parse content to render with enhanced components
  const renderContent = (content: string) => {
    const sections = content.split('\n## ').filter(Boolean)
    
    return sections.map((section, sectionIndex) => {
      const lines = section.split('\n')
      const title = lines[0].replace(/^## /, '').trim()
      const contentLines = lines.slice(1)
      
      return (
        <div key={sectionIndex} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
          
          {contentLines.map((line, lineIndex) => {
            const trimmed = line.trim()
            
            // Skip empty lines
            if (!trimmed) return null
            
            // Subheading
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={lineIndex} className="text-xl font-semibold mt-8 mb-4 text-slate-200">
                  {trimmed.replace('### ', '')}
                </h3>
              )
            }
            
            // Table
            if (trimmed.startsWith('|')) {
              return null // Tables are handled separately
            }
            
            // Blockquote/callout
            if (trimmed.startsWith('> ')) {
              return (
                <blockquote key={lineIndex} className="border-l-4 border-blue-500 pl-4 my-6 text-slate-300 italic">
                  {trimmed.replace('> ', '')}
                </blockquote>
              )
            }
            
            // List item with emoji
            if (trimmed.match(/^[🟢🟡🔴✅❌📊📋📍📞⏰🏦💰📢💻👤🛡️📱🔐🔍📰💸⚠️]/)) {
              return (
                <div key={lineIndex} className="flex items-start gap-3 my-3 p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-xl">{trimmed.match(/^[🟢🟡🔴✅❌📊📋📍📞⏰🏦💰📢💻👤🛡️📱🔐🔍📰💸⚠️]/)?.[0]}</span>
                  <span className="text-slate-300">{trimmed.substring(2)}</span>
                </div>
              )
            }
            
            // Regular list item
            if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
              return (
                <li key={lineIndex} className="ml-6 my-2 text-slate-300 leading-relaxed">
                  {trimmed.replace(/^[-•] /, '')}
                </li>
              )
            }
            
            // Numbered list
            if (trimmed.match(/^\d+\.\s/)) {
              const match = trimmed.match(/^(\d+)\.\s/)
              const num = match ? match[1] : ''
              const text = trimmed.replace(/^\d+\.\s/, '')
              return (
                <div key={lineIndex} className="flex gap-3 my-3">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {num}
                  </span>
                  <span className="text-slate-300">{text}</span>
                </div>
              )
            }
            
            // Bold text (check if entire line is bold)
            if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
              return (
                <p key={lineIndex} className="font-bold text-white my-4">
                  {trimmed.replace(/\*\*/g, '')}
                </p>
              )
            }
            
            // Regular paragraph
            return (
              <p key={lineIndex} className="my-4 text-slate-300 leading-relaxed">
                {trimmed.replace(/\*\*/g, '').replace(/`/g, '')}
              </p>
            )
          })}
        </div>
      )
    })
  }

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb blogTitle={post.title} />

          {/* Back Link */}
          <Link
            href={`/${params.locale}/blog`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {params.locale === 'en' ? 'Back to Blog' : '返回博客'}
          </Link>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-10">
              <img
                src={post.coverImage}
                alt={`${post.title} - 博客文章封面图`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-10">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`${categoryColor} border px-4 py-1.5 rounded-full text-sm font-medium`}>
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                {readTime} {params.locale === 'en' ? 'min read' : '分钟阅读'}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Keywords */}
            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800">
                <Tag className="w-4 h-4 text-slate-500 mr-1" />
                {post.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-slate-800/50 text-slate-400 px-3 py-1 rounded-full text-sm"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <article className="prose prose-invert prose-slate max-w-none">
            {/* Main Content */}
            <div className="bg-slate-800/20 border border-slate-700/30 rounded-2xl p-8 md:p-10">
              {renderContent(post.content)}
            </div>

            {/* Related Articles */}
            <RelatedArticles articles={allPosts} currentSlug={post.slug} />
          </article>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-xl p-8 border border-blue-500/20 text-center">
            <h3 className="text-2xl font-bold mb-4">{params.locale === 'en' ? 'Need Help?' : '需要帮助？'}</h3>
            <p className="text-slate-400 mb-6">
              {params.locale === 'en' 
                ? 'If your crypto assets have been stolen, contact us for a free consultation.'
                : '如果您遭遇虚拟币被盗，欢迎联系我们进行免费咨询。'}
            </p>
            <a
              href="https://t.me/xi_ao_duo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              Telegram {params.locale === 'en' ? 'Consult' : '咨询'}
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
