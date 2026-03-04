import { Metadata } from 'next'
import AboutContent from './AboutContent'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || 'zh'
  
  if (locale === 'en') {
    return {
      title: 'About Us | USDTRecovery - Professional Crypto Recovery Team',
      description: 'Learn about USDTRecovery\'s professional team of on-chain analysts and legal experts. 357+ successful cases, $35M+ assets recovered. 24/7 service.',
    }
  }
  
  return {
    title: '关于我们 | USDTRecovery - 专业虚拟币追回团队',
    description: '了解USDTRecovery的专业链上分析与司法协作团队。357+成功案例，$35M+资产挽回。7×24小时服务，支持60+主流公链。',
  }
}

export default function AboutPage({ params }: Props) {
  return <AboutContent />
}
