import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { BlogPost } from '@/lib/blog'

interface RelatedArticlesProps {
  articles: BlogPost[]
  currentSlug: string
}

export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  const relatedPosts = articles
    .filter(post => post.slug !== currentSlug)
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <div className="mt-16 pt-12 border-t border-slate-800">
      <h3 className="text-2xl font-bold mb-8">相关文章推荐</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/50 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-2 text-sm text-blue-400 mb-3">
              <span className="bg-blue-500/10 px-2 py-0.5 rounded text-xs">
                {post.category}
              </span>
            </div>
            
            <h4 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h4>
            
            <p className="text-sm text-slate-400 line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3 h-3" />
                {post.date}
              </div>
              <span className="text-blue-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                阅读
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
