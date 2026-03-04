import Script from 'next/script'

export default function StructuredData() {
  // 网站基本信息
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'USDTRecovery',
    alternateName: ['虚拟币追回服务', 'Crypto Recovery Service'],
    url: 'https://www.usdtrecovery.xyz',
    description: '专业团队帮您追回被盗的USDT、ETH、BTC等加密货币。链上追踪+司法协助，357+成功案例。',
    inLanguage: ['zh-CN', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'USDTRecovery',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.usdtrecovery.xyz/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'USDTRecovery',
    alternateName: ['虚拟币追回服务', 'USDT Recovery Team', 'Crypto Recovery Experts'],
    url: 'https://www.usdtrecovery.xyz',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.usdtrecovery.xyz/logo.png',
      width: 512,
      height: 512,
    },
    description: '专业团队帮您追回被盗的USDT、ETH、BTC等加密货币。链上追踪+司法协助，357+成功案例，$35M+资产挽回。7×24小时服务，支持60+主流公链。',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: '客服咨询',
      availableLanguage: ['Chinese', 'English'],
      url: 'https://t.me/xi_ao_duo',
      contactOption: 'TollFree',
      areaServed: '全球',
    },
    sameAs: [
      'https://t.me/xi_ao_duo',
      'https://x.com/thechainsec',
    ],
    areaServed: {
      '@type': 'Place',
      name: '全球',
    },
    serviceType: '虚拟币追回服务',
    foundingDate: '2021',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '30+'
    },
    award: [
      '区块链安全认证 - 国际区块链安全联盟',
      '数字资产调查资质 - 全球数字资产调查协会',
    ]
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '虚拟币追回服务',
    alternateName: ['Crypto Recovery Service', 'USDT Recovery Service'],
    provider: {
      '@type': 'Organization',
      name: 'USDTRecovery',
    },
    description: '专业团队帮您追回被盗的USDT、ETH、BTC等加密货币。链上追踪+司法协助。',
    areaServed: {
      '@type': 'Place',
      name: '全球',
    },
    serviceType: '区块链安全服务',
    category: '数字资产安全',
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      url: 'https://www.usdtrecovery.xyz',
      priceCurrency: 'USD',
      lowPrice: '0',
      highPrice: '50000',
      offerCount: '4',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '357',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '追币服务套餐',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '免费咨询',
            description: '初步案件评估与资金追踪'
          },
          price: '0',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '基础服务',
            description: '链上追踪+交易所对接+报案材料'
          },
          price: '500',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '高级服务',
            description: '全链条追踪+司法协助+律师对接'
          },
          price: '2000',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'VIP定制',
            description: '专属团队+全球司法协作+全程跟进'
          },
          price: '5000',
          priceCurrency: 'USD'
        }
      ]
    }
  }

  // 扩展的FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'USDT被盗后能追回吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'USDT被盗后是有可能追回的。根据USDTRecovery团队过去三年处理的357+起案件数据统计，约25%的案件成功追回了全部或部分资金，其中在案发7天内采取行动的案件成功率高达40%以上。通过专业的链上追踪技术，可以追踪资金流向，锁定交易所账户，并配合司法手段进行冻结和追回。我们的团队已经成功帮助用户追回超过$35M的资产。',
        },
      },
      {
        '@type': 'Question',
        name: '虚拟币被盗报警有用吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '报警是有用的。虽然虚拟币案件较为复杂，但随着区块链分析技术的发展，警方可以追踪链上交易。数据显示，报警 + 专业协助的案件追回成功率达35%，远高于不报警的3%。我们建议同时寻求专业的链上分析团队协助，提供完整的证据链，包括交易哈希、资金流向图、钱包所有权证明等，以提高立案成功率和追回成功率。',
        },
      },
      {
        '@type': 'Question',
        name: '追回虚拟币需要多长时间？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '追回时间取决于案件复杂程度。简单的交易所冻结案件可能在3-7天内解决；涉及多链转移或混币服务的案件可能需要14-30天。我们会在2小时内响应您的咨询，并在评估后给出预估时间。案件响应速度是影响成功率的关键因素：0-2小时内行动，追回成功率约35-40%；2-6小时内行动，成功率约25-30%；6-24小时内行动，成功率约15-20%；超过7天，成功率骤降至5%以下。',
        },
      },
      {
        '@type': 'Question',
        name: '虚拟币被盗后第一时间应该做什么？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '发现虚拟币被盗后，黄金24小时内的行动至关重要：1. 立即检查其他资产，确认是否只有单一钱包受损；2. 断开可疑连接，撤销所有可疑dApp授权（使用Revoke.cash）；3. 保存关键证据：交易哈希、被盗金额和时间、攻击者钱包地址；4. 初步分析资金流向，使用区块链浏览器追踪；5. 寻求专业帮助，金额较大时应联系专业追回团队。',
        },
      },
      {
        '@type': 'Question',
        name: '你们支持哪些加密货币的追回？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'USDTRecovery团队支持150+主流公链的加密货币追回服务，包括但不限于：USDT（ERC20、TRC20、BEP20）、USDC、ETH、BTC、BNB、SOL、TRX、ARB、OP、AVAX、MATIC、Base链、Fantom等。无论您的资产是在以太坊、币安智能链、波场还是其他公链被盗，我们都能提供专业的链上分析和追踪服务。',
        },
      },
      {
        '@type': 'Question',
        name: '虚拟币追回服务的费用是多少？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '我们提供灵活的收费方案：1. 免费咨询（0元）：初步案件评估与资金追踪；2. 基础服务（$500）：链上追踪+交易所对接+报案材料准备；3. 高级服务（$2000）：全链条追踪+司法协助+律师对接；4. VIP定制（$5000+）：专属团队+全球司法协作+全程跟进。我们采用成功收费模式，部分费用与追回结果挂钩，具体方案会在评估后根据案件复杂程度确定。',
        },
      },
      {
        '@type': 'Question',
        name: '如何判断我的案件是否能追回？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '影响追回成功率的关键因素包括：1. 响应时间 - 越快行动成功率越高；2. 资金流向 - 资金是否进入中心化交易所是重要突破口；3. 涉案金额 - 大额案件更容易引起警方重视；4. 证据完整性 - 完整保存交易记录、截图等；5. 案件类型 - 钓鱼攻击、假交易所、授权盗刷等不同类型有不同特点。我们提供免费咨询，可以在评估后给出专业的可行性分析和成功概率预估。',
        },
      },
    ],
  }

  // 面包屑导航 Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: 'https://www.usdtrecovery.xyz'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '服务',
        item: 'https://www.usdtrecovery.xyz/services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: '博客',
        item: 'https://www.usdtrecovery.xyz/blog'
      }
    ]
  }

  // 本地商家 Schema (针对全球服务)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'USDTRecovery',
    description: '专业虚拟币被盗追回服务，链上追踪+司法协助',
    url: 'https://www.usdtrecovery.xyz',
    telephone: '+86-xxx-xxxx-xxxx',
    email: 'contact@usdtrecovery.com',
    image: 'https://www.usdtrecovery.xyz/logo.png',
    priceRange: '$-$$$$',
    areaServed: '全球',
    serviceType: '区块链资产追回',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    }
  }

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
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
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}
