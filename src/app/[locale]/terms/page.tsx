import { Metadata } from 'next'
import TermsContent from './TermsContent'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || 'zh'
  
  if (locale === 'en') {
    return {
      title: 'Terms of Service | USDTRecovery - Service Agreement',
      description: 'Read USDTRecovery\'s Terms of Service. Learn about our service scope, fee structure, and liability limitations for crypto asset recovery services.',
    }
  }
  
  return {
    title: '服务条款 | USDTRecovery - 服务协议',
    description: '阅读USDTRecovery的服务条款。了解我们的服务范围、费用结构和虚拟币追回服务的责任限制。',
  }
}

export default function TermsPage({ params }: Props) {
  return <TermsContent />
}
