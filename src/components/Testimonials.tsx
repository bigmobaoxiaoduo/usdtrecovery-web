'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface Testimonial {
  id: string
  content: string
  clientType: string
  caseType: string
  amount: string
  rating: number
}

// 中文评价数据
const testimonialsZh: Testimonial[] = [
  {
    id: '1',
    content: '在遭遇钓鱼攻击损失USDT后，我几乎绝望了。USDTRecovery团队在2小时内就响应了我的求助，通过专业的链上分析锁定了资金流向，最终帮我追回了大部分资产。整个过程专业、透明，让我重新建立了对加密安全的信心。',
    clientType: 'DeFi投资者',
    caseType: 'USDT钓鱼攻击',
    amount: '$128,000',
    rating: 5
  },
  {
    id: '2',
    content: 'OKX账户被冻结让我一度陷入困境，联系了多家机构都束手无策。USDTRecovery的法律团队凭借丰富的经验，在一周内就帮我解冻了账户。他们的跨境法律协作能力真的很强。',
    clientType: 'OTC商家',
    caseType: '交易所账户冻结',
    amount: '$85,000',
    rating: 5
  },
  {
    id: '3',
    content: '参与了一个DeFi项目，没想到项目方卷款跑路。USDTRecovery团队通过多维度追踪资金流向，协助警方成功抓获嫌疑人并追回了部分资产。虽然没能全部追回，但已经远超我的预期。',
    clientType: '量化交易员',
    caseType: '项目方跑路',
    amount: '$230,000',
    rating: 5
  },
  {
    id: '4',
    content: '被假客服诈骗后，我第一时间联系了USDTRecovery。他们的响应速度和专业程度让我印象深刻，通过技术手段成功冻结了骗子的部分资产。强烈推荐给所有需要数字资产安全服务的朋友。',
    clientType: '个人投资者',
    caseType: '假客服诈骗',
    amount: '$45,000',
    rating: 5
  },
  {
    id: '5',
    content: '出金时银行卡被冻结，多方咨询无果。USDTRecovery的法律顾问团队详细分析了案情，提供了专业的解冻方案，两周内解决了问题。专业的事还是要交给专业的团队。',
    clientType: '跨境贸易商',
    caseType: '银行卡冻结',
    amount: '$62,000',
    rating: 5
  }
]

// 英文评价数据
const testimonialsEn: Testimonial[] = [
  {
    id: '1',
    content: 'After losing USDT to a phishing attack, I was devastated. The USDTRecovery team responded to my request within 2 hours, tracked the fund flow through professional on-chain analysis, and eventually helped me recover most of my assets. The entire process was professional and transparent, restoring my confidence in crypto security.',
    clientType: 'DeFi Investor',
    caseType: 'USDT Phishing',
    amount: '$128,000',
    rating: 5
  },
  {
    id: '2',
    content: 'My OKX account was frozen and I was in a difficult situation. I contacted multiple agencies with no success. USDTRecovery\'s legal team, with their extensive experience, helped me unfreeze my account within a week. Their cross-border legal collaboration capabilities are truly impressive.',
    clientType: 'OTC Merchant',
    caseType: 'Exchange Account Frozen',
    amount: '$85,000',
    rating: 5
  },
  {
    id: '3',
    content: 'I participated in a DeFi project that turned out to be a rug pull. The USDTRecovery team tracked the fund flows multi-dimensionally, assisted the police in arresting the suspects, and recovered partial assets. Although not all funds were recovered, it far exceeded my expectations.',
    clientType: 'Quantitative Trader',
    caseType: 'Rug Pull Scam',
    amount: '$230,000',
    rating: 5
  },
  {
    id: '4',
    content: 'After being scammed by fake customer service, I contacted USDTRecovery immediately. Their response speed and professionalism impressed me. They successfully froze part of the scammer\'s assets through technical means. Highly recommended to anyone needing digital asset security services.',
    clientType: 'Individual Investor',
    caseType: 'Fake Customer Service Scam',
    amount: '$45,000',
    rating: 5
  },
  {
    id: '5',
    content: 'My bank card was frozen during withdrawal, and multiple consultations yielded no results. USDTRecovery\'s legal advisory team analyzed the case in detail, provided a professional unfreezing solution, and resolved the issue within two weeks. Professional matters should be left to professional teams.',
    clientType: 'Cross-border Trader',
    caseType: 'Bank Card Frozen',
    amount: '$62,000',
    rating: 5
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const { t, locale } = useTranslation()
  const testimonials = locale === 'zh' ? testimonialsZh : testimonialsEn

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('testimonials.title')}</h2>
          <p className="text-slate-400">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-blue-400/50" />
                <StarRating rating={testimonial.rating} />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">{testimonial.clientType}</span>
                  <span className="text-sm font-semibold text-green-400">{testimonial.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                    {testimonial.caseType}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.slice(3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-blue-400/50" />
                <StarRating rating={testimonial.rating} />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">{testimonial.clientType}</span>
                  <span className="text-sm font-semibold text-green-400">{testimonial.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                    {testimonial.caseType}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialsCompact() {
  const { locale } = useTranslation()
  const testimonials = locale === 'zh' ? testimonialsZh : testimonialsEn

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.slice(0, 3).map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-1 mb-4">
            <StarRating rating={testimonial.rating} />
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-4">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          <div className="pt-4 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{testimonial.clientType}</span>
              <span className="text-sm font-semibold text-green-400">{testimonial.amount}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default TestimonialsSection
