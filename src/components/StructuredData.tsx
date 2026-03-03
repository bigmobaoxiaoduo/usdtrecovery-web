import Script from 'next/script'

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'USDTRecovery',
    alternateName: '虚拟币追回服务',
    url: 'https://usdtrecovery.xyz',
    logo: 'https://usdtrecovery.xyz/logo.png',
    description: '专业团队帮您追回被盗的USDT、ETH、BTC等加密货币。链上追踪+司法协助，357+成功案例。',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: '客服咨询',
      availableLanguage: ['Chinese', 'English'],
      url: 'https://t.me/xi_ao_duo',
    },
    sameAs: [
      'https://t.me/xi_ao_duo',
    ],
    areaServed: '全球',
    serviceType: '虚拟币追回服务',
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '虚拟币追回服务',
    provider: {
      '@type': 'Organization',
      name: 'USDTRecovery',
    },
    description: '专业团队帮您追回被盗的USDT、ETH、BTC等加密货币。链上追踪+司法协助。',
    areaServed: '全球',
    serviceType: '区块链安全服务',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: 'https://usdtrecovery.xyz',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'USDT被盗后能追回吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'USDT被盗后是有可能追回的。通过专业的链上追踪技术，可以追踪资金流向，锁定交易所账户，并配合司法手段进行冻结和追回。我们的团队已经成功帮助用户追回超过$35M的资产。',
        },
      },
      {
        '@type': 'Question',
        name: '虚拟币被盗报警有用吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '报警是有用的。虽然虚拟币案件较为复杂，但随着区块链分析技术的发展，警方可以追踪链上交易。我们建议同时寻求专业的链上分析团队协助，提供完整的证据链，提高追回成功率。',
        },
      },
      {
        '@type': 'Question',
        name: '追回虚拟币需要多长时间？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '追回时间取决于案件复杂程度。简单的交易所冻结案件可能在3-7天内解决；涉及多链转移或混币服务的案件可能需要14-30天。我们会在2小时内响应，并在评估后给出预估时间。',
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
