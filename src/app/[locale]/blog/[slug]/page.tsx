import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { Calendar, ArrowLeft } from 'lucide-react'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

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
