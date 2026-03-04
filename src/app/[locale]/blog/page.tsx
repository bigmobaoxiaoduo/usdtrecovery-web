import { Metadata } from 'next'
import BlogContent from './BlogContent'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || 'zh'
  
  if (locale === 'en') {
    return {
      title: 'Blog | Web3 Security Knowledge, Recovery Guides, Success Cases',
      description: 'Professional Web3 security knowledge, crypto recovery guides, success case analysis to help you protect your digital assets.',
    }
  }
  
  return {
    title: '博客 | Web3安全知识、追回指南、成功案例',
    description: '专业的Web3安全知识、虚拟币追回指南、成功案例分析，帮助您保护数字资产安全。',
  }
}

export default function BlogPage({ params }: Props) {
  return <BlogContent locale={params.locale} />
}
