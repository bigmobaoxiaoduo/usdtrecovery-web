'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Users, 
  Scale, 
  Globe, 
  CheckCircle, 
  Award, 
  Building2, 
  History, 
  TrendingUp,
  Newspaper,
  BadgeCheck,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import Layout from '@/components/Layout'
import { TestimonialsCompact } from '@/components/Testimonials'
import Breadcrumb from '@/components/Breadcrumb'
import { useTranslation } from '@/hooks/useTranslation'

export default function AboutContent() {
  const { isEn } = useTranslation()
  
  // 使用翻译数据或回退到硬编码
  const stats = [
    { label: isEn ? 'Cases Resolved' : '完结案例', value: '357+', icon: Shield },
    { label: isEn ? 'Assets Recovered' : '挽回资产', value: '$35M+', icon: Award },
    { label: isEn ? 'Recovery Rate' : '挽回率', value: '57%', icon: CheckCircle },
    { label: isEn ? 'Partner Orgs' : '合作机构', value: '500+', icon: Globe },
  ]

  const teamFeatures = [
    {
      icon: Users,
      title: isEn ? 'On-Chain Analysis Experts' : '链上分析专家',
      desc: isEn ? 'Senior analyst team covering 150+ major blockchains' : '覆盖 150+ 主流公链的资深分析师团队'
    },
    {
      icon: Scale,
      title: isEn ? 'Legal Experts' : '司法专家',
      desc: isEn ? 'Legal team with extensive virtual currency case experience' : '具备丰富虚拟币案件经验的法律团队'
    },
    {
      icon: Shield,
      title: isEn ? 'Security Advisors' : '安全顾问',
      desc: isEn ? 'Former exchange security leads and white-hat hackers' : '前交易所安全负责人、白帽黑客'
    },
  ]

  const coreTeam = [
    {
      role: isEn ? 'Chief On-Chain Analyst' : '首席链上分析师',
      experience: isEn ? '10+ years cybersecurity experience' : '10年+ 网络安全经验',
      expertise: isEn ? 'Blockchain tracking, smart contract security audit' : '区块链追踪、智能合约安全审计',
      background: isEn ? 'Former senior researcher at top security firm' : '前知名安全公司高级研究员'
    },
    {
      role: isEn ? 'Chief Legal Counsel' : '首席法律顾问',
      experience: isEn ? '8+ years legal practice experience' : '8年+ 法律从业经验',
      expertise: isEn ? 'Cross-border legal collaboration, digital asset rights protection' : '跨境法律协作、数字资产维权',
      background: isEn ? 'Senior lawyer focused on blockchain legal field' : '专注区块链法律领域资深律师'
    },
    {
      role: isEn ? 'Technical Director' : '技术总监',
      experience: isEn ? '12+ years tech development experience' : '12年+ 技术开发经验',
      expertise: isEn ? 'Public chain development, DeFi protocol analysis' : '公链开发、DeFi协议分析',
      background: isEn ? 'Former head of technology at top exchange' : '前头部交易所技术负责人'
    },
    {
      role: isEn ? 'Judicial Collaboration Director' : '司法协作总监',
      experience: isEn ? '15+ years judicial work experience' : '15年+ 司法工作经验',
      expertise: isEn ? 'International judicial cooperation, case coordination' : '国际司法合作、案件协调',
      background: isEn ? 'Rich experience in cross-border case handling' : '丰富的跨境案件处理经验'
    }
  ]

  const milestones = [
    {
      year: '2021',
      title: isEn ? 'Team Founded' : '团队成立',
      desc: isEn 
        ? 'Core team formed by senior on-chain analysts and legal experts, focusing on digital asset security'
        : '由资深链上分析师和司法专家组成核心团队，专注数字资产安全领域'
    },
    {
      year: '2022',
      title: isEn ? 'Business Expansion' : '业务扩展',
      desc: isEn
        ? 'Service scope expanded globally, established judicial partnerships with 50+ exchanges'
        : '服务范围扩展至全球，与50+交易所建立司法合作关系'
    },
    {
      year: '2023',
      title: isEn ? 'Technical Breakthrough' : '技术突破',
      desc: isEn
        ? 'Self-developed on-chain analysis system launched, tracking capability covering 150+ major blockchains'
        : '自研链上分析系统上线，追踪能力覆盖150+主流公链'
    },
    {
      year: '2024',
      title: isEn ? 'Industry Leader' : '行业领先',
      desc: isEn
        ? 'Accumulated 357+ cases served, recovered assets over $35M, becoming industry-leading asset recovery service provider'
        : '累计服务357+案例，挽回资产超$35M，成为行业领先的资产追回服务商'
    },
    {
      year: '2025',
      title: isEn ? 'Continuous Innovation' : '持续创新',
      desc: isEn
        ? 'Established global judicial collaboration network, continuously providing better services to clients'
        : '建立全球司法协作网络，持续为客户提供更优质的服务'
    }
  ]

  const mediaMentions = [
    { name: isEn ? 'Blockchain Daily' : '区块链日报', type: isEn ? 'Industry Media' : '行业媒体', date: '2024.03' },
    { name: isEn ? 'Web3 Weekly' : 'Web3周刊', type: isEn ? 'Industry Media' : '行业媒体', date: '2024.06' },
    { name: isEn ? 'Digital Asset Security Magazine' : '数字资产安全杂志', type: isEn ? 'Professional Journal' : '专业期刊', date: '2024.09' },
    { name: isEn ? 'Crypto Asset Protection Association' : '加密资产保护协会', type: isEn ? 'Industry Association' : '行业协会', date: '2024.12' }
  ]

  const certifications = [
    { name: isEn ? 'Blockchain Security Certification' : '区块链安全认证', issuer: isEn ? 'International Blockchain Security Alliance' : '国际区块链安全联盟' },
    { name: isEn ? 'Digital Asset Investigation Qualification' : '数字资产调查资质', issuer: isEn ? 'Global Digital Asset Investigation Association' : '全球数字资产调查协会' },
    { name: isEn ? 'Anti-Money Laundering Compliance Certification' : '反洗钱合规认证', issuer: isEn ? 'International Anti-Money Laundering Organization' : '国际反洗钱组织' }
  ]

  const partnerCompanies = [
    { name: 'Chainalysis', type: isEn ? 'On-Chain Analysis' : '链上分析' },
    { name: isEn ? 'SlowMist' : '慢雾科技', type: isEn ? 'Security Audit' : '安全审计' },
    { name: isEn ? 'KnownSec' : '知道创宇', type: isEn ? 'Cybersecurity' : '网络安全' },
    { name: 'CertiK', type: isEn ? 'Smart Contract Audit' : '智能合约审计' },
    { name: isEn ? 'PeckShield' : '派盾科技', type: isEn ? 'Security Services' : '安全服务' },
    { name: 'TokenInsight', type: isEn ? 'Data Analytics' : '数据分析' }
  ]
  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isEn ? 'About ' : '关于'}
              <span className="gradient-text">{isEn ? 'Us' : '我们'}</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {isEn 
                ? 'On-chain analysis and legal collaboration experts. Emergency freeze response in as fast as 5 minutes, with customized digital asset recovery solutions.'
                : '链上分析与司法协作专家团队，最快 5 分钟启动紧急冻结响应机制，定制专属数字资产追回方案。'
              }
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 text-center hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Company Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{isEn ? 'Company Profile' : '公司简介'}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed">
                  {isEn
                    ? 'USDTRecovery is a comprehensive service provider focused on digital asset security and recovery. We integrate professional resources across blockchain technology, cybersecurity, and legal compliance to provide efficient and reliable asset protection solutions globally.'
                    : 'USDTRecovery 是一家专注于数字资产安全与追回的综合性服务机构。我们整合了区块链技术、网络安全、法律合规等多领域的专业资源，为全球用户提供高效、可靠的资产保护解决方案。'
                  }
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {isEn
                    ? 'Since our establishment in 2021, we have adhered to the service philosophy of "Professional, Efficient, Confidential," successfully helping hundreds of clients recover digital asset losses. Our services cover 150+ major blockchains including BTC, ETH, and USDT, with judicial partnerships with 500+ global exchanges and wallets.'
                    : '自2021年成立以来，我们始终坚持"专业、高效、保密"的服务理念，已成功帮助数百位客户挽回数字资产损失。我们的服务覆盖BTC、ETH、USDT等150+主流公链，与全球500+交易所、钱包建立司法合作关系。'
                  }
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {isEn
                    ? 'Whether you\'re an individual user facing phishing attacks or an institution dealing with complex DeFi security incidents, we provide full-cycle services from on-chain analysis and evidence preservation to legal collaboration.'
                    : '无论是个人用户遭遇钓鱼攻击，还是机构面临复杂的DeFi安全事件，我们都能提供从链上分析、证据固定到司法协作的全流程服务。'
                  }
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  {isEn ? 'Key Metrics' : '核心数据'}
                </h3>
                <div className="space-y-4">
                  {[
                    { label: isEn ? 'Established' : '成立时间', value: '2021' },
                    { label: isEn ? 'Service Range' : '服务范围', value: isEn ? 'Global' : '全球' },
                    { label: isEn ? 'Team Size' : '团队规模', value: isEn ? '30+ Professionals' : '30+ 专业人员' },
                    { label: isEn ? 'Service Hours' : '服务时长', value: '7×24 ' + (isEn ? 'Hours' : '小时') },
                    { label: isEn ? 'Client Satisfaction' : '客户满意度', value: '98%+' },
                    { label: isEn ? 'Case Success Rate' : '案件成功率', value: '57%' }
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">{isEn ? 'Professional Team' : '专业团队'}</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                {isEn
                  ? 'Leave professional matters to professional teams. We integrate Crypto industry resources and expertise with craftsmanship to save time and provide targeted solutions.'
                  : '专业的事交给专业的团队，我们整合 Crypto 行业资源与专业知识，融入工匠精神，节约时间，对症下药。'
                }
              </p>
              <p className="text-slate-400 leading-relaxed">
                {isEn
                  ? 'Bringing together the industry\'s most experienced on-chain analysts, legal experts, and lawyers, as the only comprehensive solution provider, we focus on solving the toughest problems. Whether your assets were stolen from complex DeFi protocols or through sophisticated phishing attacks, we provide professional analysis and recovery solutions.'
                  : '汇聚行业最资深的链上分析师、司法专家及律师，作为唯一的综合方案提供商，我们专注解决最棘手的问题。无论您的资产是在复杂的 DeFi 协议中被盗，还是遭遇了精心设计的钓鱼攻击，我们都能为您提供专业的分析与追回方案。'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {teamFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                      <p className="text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Core Team */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{isEn ? 'Core Team' : '核心团队'}</h2>
              <p className="text-slate-400">{isEn ? 'Senior expert team safeguarding your asset security' : '资深专家团队，为您的资产安全保驾护航'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreTeam.map((member, index) => (
                <motion.div
                  key={member.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{member.role}</h3>
                      <p className="text-blue-400 text-sm mb-2">{member.experience}</p>
                      <p className="text-slate-400 text-sm mb-1">
                        <span className="text-slate-500">{isEn ? 'Expertise: ' : '专长：'}</span>{member.expertise}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {member.background}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <History className="w-6 h-6" />
                {isEn ? 'Milestones' : '发展历程'}
              </h2>
              <p className="text-slate-400">{isEn ? 'From startup to industry leader, one step at a time' : '从初创到行业领先，我们一步一个脚印'}</p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 md:-translate-x-1/2" />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900 md:-translate-x-1/2 z-10" />

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                        <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-slate-400 text-sm">{milestone.desc}</p>
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Core Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl p-8 md:p-12 border border-blue-500/20 mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-10">{isEn ? 'Core Advantages' : '核心优势'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(isEn ? [
                'On-chain analysis capability covering 150+ major blockchains',
                'Global 500 DEX/CEX/Wallet judicial partnerships',
                'Emergency freeze within 5 minutes',
                'Judicial language parsing on-chain transactions and generating visual reports',
                '7×24 hour round-the-clock service',
                'Real-time case progress updates, full transparency',
              ] : [
                '链上分析能力覆盖 150+ 主流公链',
                '全球 500 家 DEX/CEX/Wallet 司法合作',
                '最快 5 分钟启动紧急冻结',
                '司法语言解析链上交易并生成可视化报告',
                '7×24 小时全天候服务',
                '案件进展实时同步，全程透明',
              ]).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trust & Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{isEn ? 'Trust & Credentials' : '信任背书'}</h2>
              <p className="text-slate-400">{isEn ? 'Media coverage and industry certifications' : '媒体报道与行业认证'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Media Mentions */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-blue-400" />
                  {isEn ? 'Media Coverage' : '媒体报道'}
                </h3>
                <div className="space-y-4">
                  {mediaMentions.map((media, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
                      <div>
                        <p className="font-medium">{media.name}</p>
                        <p className="text-sm text-slate-500">{media.type}</p>
                      </div>
                      <span className="text-sm text-slate-400">{media.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-blue-400" />
                  {isEn ? 'Industry Certifications' : '行业认证'}
                </h3>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 py-3 border-b border-slate-700/50 last:border-0">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-slate-500">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{isEn ? 'Client Testimonials' : '客户评价'}</h2>
              <p className="text-slate-400">{isEn ? 'Voices from real clients (privacy information anonymized)' : '来自真实客户的声音（隐私信息已脱敏）'}</p>
            </div>
            <TestimonialsCompact />
          </div>

          {/* Partners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{isEn ? 'Partners' : '合作伙伴'}</h2>
              <p className="text-slate-400 mb-8">{isEn ? 'Deep partnerships with leading global blockchain security organizations' : '与全球领先的区块链安全机构建立深度合作关系'}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {partnerCompanies.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 text-center hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-slate-700/50 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">{partner.name}</p>
                  <p className="text-xs text-slate-500">{partner.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl p-8 md:p-12 border border-blue-500/20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{isEn ? 'Contact Us' : '联系我们'}</h2>
              <p className="text-slate-400">{isEn ? '24/7 round-the-clock service for you' : '7×24小时全天候为您服务'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">{isEn ? 'Emergency Hotline' : '紧急热线'}</h3>
                <p className="text-slate-400 text-sm">Telegram: @xi_ao_duo</p>
                <p className="text-slate-500 text-xs mt-1">{isEn ? 'Avg response time: within 2 hours' : '平均响应时间：2小时内'}</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">{isEn ? 'Business Cooperation' : '商务合作'}</h3>
                <p className="text-slate-400 text-sm">contact@usdtrecovery.com</p>
                <p className="text-slate-500 text-xs mt-1">{isEn ? 'Business days: reply within 24 hours' : '工作日：24小时内回复'}</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">{isEn ? 'Service Coverage' : '服务范围'}</h3>
                <p className="text-slate-400 text-sm">{isEn ? 'Global Service' : '全球服务'}</p>
                <p className="text-slate-500 text-xs mt-1">{isEn ? 'Covering 150+ countries and regions' : '覆盖150+国家和地区'}</p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://t.me/xi_ao_duo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                <TrendingUp className="w-5 h-5" />
                {isEn ? 'Free Consultation' : '立即免费咨询'}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
