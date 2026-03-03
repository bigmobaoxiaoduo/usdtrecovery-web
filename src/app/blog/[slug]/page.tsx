import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { Calendar, ArrowLeft } from 'lucide-react'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: `${post.title} | Web3Recovery`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回博客
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <p className="text-xl text-slate-400">{post.excerpt}</p>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-slate max-w-none">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8">
            {post.content.split('\n').map((line, index) => {
              const trimmed = line.trim()
              
              if (trimmed.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{trimmed.replace('## ', '')}</h2>
              }
              
              if (trimmed.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{trimmed.replace('### ', '')}</h3>
              }
              
              if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                return <p key={index} className="font-bold text-white my-4">{trimmed.replace(/\*\*/g, '')}</p>
              }
              
              if (trimmed.startsWith('- ')) {
                return <li key={index} className="ml-6 my-2 text-slate-300">{trimmed.replace('- ', '')}</li>
              }
              
              if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
                return <li key={index} className="ml-6 my-2 text-slate-300">{trimmed.replace(/^\d+\. /, '')}</li>
              }
              
              if (trimmed === '') {
                return <br key={index} />
              }
              
              return <p key={index} className="my-4 text-slate-300 leading-relaxed">{trimmed}</p>
            })}
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-xl p-8 border border-blue-500/20 text-center">
          <h3 className="text-2xl font-bold mb-4">需要帮助？</h3>
          <p className="text-slate-400 mb-6">
            如果您遭遇虚拟币被盗，欢迎联系我们进行免费咨询。
          </p>
          <a
            href="https://t.me/your_telegram"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Telegram 咨询
          </a>
        </div>
      </div>
    </div>
  )
}
