import { Metadata } from 'next'
import PrivacyContent from './PrivacyContent'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || 'zh'
  
  if (locale === 'en') {
    return {
      title: 'Privacy Policy | USDTRecovery - Data Protection',
      description: 'Learn how USDTRecovery protects your personal information and case data. We employ industry-standard encryption and strict confidentiality protocols.',
    }
  }
  
  return {
    title: '隐私政策 | USDTRecovery - 数据保护',
    description: '了解USDTRecovery如何保护您的个人信息和案件数据。我们采用行业标准加密技术和严格的保密协议。',
  }
}

export default function PrivacyPage({ params }: Props) {
  return <PrivacyContent />
}
