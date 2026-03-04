import { Metadata } from 'next'
import ConsultContent from './ConsultContent'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || 'zh'
  
  if (locale === 'en') {
    return {
      title: 'Free Consultation | USDTRecovery - Crypto Recovery Assessment',
      description: 'Get a free consultation for your stolen crypto assets. Our experts will assess your case recovery potential within 2 hours. 357+ successful cases.',
    }
  }
  
  return {
    title: '免费咨询 | USDTRecovery - 虚拟币追回评估',
    description: '免费获取虚拟币被盗案件评估。我们的专家将在2小时内评估您的案件追回可能性。357+成功案例，专业团队为您服务。',
  }
}

export default function ConsultPage({ params }: Props) {
  return <ConsultContent />
}
