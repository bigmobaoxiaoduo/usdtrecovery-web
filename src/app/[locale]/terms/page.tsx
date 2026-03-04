'use client'

import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'
import { useTranslation } from '@/hooks/useTranslation'

export default function TermsPage() {
  const { isEn } = useTranslation()
  
  const sections = isEn ? [
    {
      title: '1. Service Scope',
      content: 'We provide the following services:',
      items: ['Blockchain asset tracking and analysis', 'Legal assistance and support', 'Exchange communication and asset freezing', 'Case evaluation and consultation']
    },
    {
      title: '2. Success Rate Disclaimer',
      content: 'The success rates and case data we display are based on historical case statistics and do not represent a guarantee for your specific case. Each case has unique circumstances, and recovery results may vary.'
    },
    {
      title: '3. Fee Structure',
      content: 'Service fees are determined based on case complexity. Some services use a "success fee" model; specific terms will be specified in the service agreement.'
    },
    {
      title: '4. Liability Limitations',
      content: 'We strive to provide professional services but do not guarantee successful asset recovery for all cases. Clients should understand the challenges posed by the anonymity and irreversibility of blockchain assets.'
    },
    {
      title: '5. Contact Us',
      content: 'For any questions, please contact us via Telegram.'
    }
  ] : [
    {
      title: '1. 服务范围',
      content: '我们提供以下服务：',
      items: ['区块链资产追踪与分析', '司法协助与法律支持', '交易所沟通与资产冻结', '案件评估与咨询']
    },
    {
      title: '2. 成功率说明',
      content: '我们展示的成功率和案例数据基于历史案件统计，不代表对您案件的承诺。每个案件的具体情况不同，追回结果可能有所差异。'
    },
    {
      title: '3. 费用说明',
      content: '具体服务费用根据案件复杂程度确定。部分服务采用"成功收费"模式，具体条款将在服务协议中明确。'
    },
    {
      title: '4. 责任限制',
      content: '我们尽力提供专业服务，但不保证所有案件都能成功追回资产。客户应理解区块链资产的匿名性和不可逆性带来的挑战。'
    },
    {
      title: '5. 联系我们',
      content: '如有任何问题，请通过 Telegram 联系我们。'
    }
  ]

  return (
    <Layout>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          <h1 className="text-3xl font-bold mb-8 mt-4">{isEn ? 'Terms of Service' : '服务条款'}</h1>
          
          <div className="space-y-6 text-slate-300">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-semibold mb-4 text-white">{section.title}</h2>
                <p className={section.items ? '' : 'text-slate-400'}>{section.content}</p>
                {section.items && (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}
