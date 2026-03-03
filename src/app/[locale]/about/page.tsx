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

const stats = [
  { label: '完结案例', value: '357+', icon: Shield },
  { label: '挽回资产', value: '$35M+', icon: Award },
  { label: '挽回率', value: '57%', icon: CheckCircle },
  { label: '合作机构', value: '500+', icon: Globe },
]

const teamFeatures = [
  {
    icon: Users,
    title: '链上分析专家',
    desc: '覆盖 150+ 主流公链的资深分析师团队'
  },
  {
    icon: Scale,
    title: '司法专家',
    desc: '具备丰富虚拟币案件经验的法律团队'
  },
  {
    icon: Shield,
    title: '安全顾问',
    desc: '前交易所安全负责人、白帽黑客'
  },
]

const coreTeam = [
  {
    role: '首席链上分析师',
    experience: '10年+ 网络安全经验',
    expertise: '区块链追踪、智能合约安全审计',
    background: '前知名安全公司高级研究员'
  },
  {
    role: '首席法律顾问',
    experience: '8年+ 法律从业经验',
    expertise: '跨境法律协作、数字资产维权',
    background: '专注区块链法律领域资深律师'
  },
  {
    role: '技术总监',
    experience: '12年+ 技术开发经验',
    expertise: '公链开发、DeFi协议分析',
    background: '前头部交易所技术负责人'
  },
  {
    role: '司法协作总监',
    experience: '15年+ 司法工作经验',
    expertise: '国际司法合作、案件协调',
    background: '丰富的跨境案件处理经验'
  }
]

const milestones = [
  {
    year: '2021',
    title: '团队成立',
    desc: '由资深链上分析师和司法专家组成核心团队，专注数字资产安全领域'
  },
  {
    year: '2022',
    title: '业务扩展',
    desc: '服务范围扩展至全球，与50+交易所建立司法合作关系'
  },
  {
    year: '2023',
    title: '技术突破',
    desc: '自研链上分析系统上线，追踪能力覆盖150+主流公链'
  },
  {
    year: '2024',
    title: '行业领先',
    desc: '累计服务357+案例，挽回资产超$35M，成为行业领先的资产追回服务商'
  },
  {
    year: '2025',
    title: '持续创新',
    desc: '建立全球司法协作网络，持续为客户提供更优质的服务'
  }
]

const mediaMentions = [
  { name: '区块链日报', type: '行业媒体', date: '2024.03' },
  { name: 'Web3周刊', type: '行业媒体', date: '2024.06' },
  { name: '数字资产安全杂志', type: '专业期刊', date: '2024.09' },
  { name: '加密资产保护协会', type: '行业协会', date: '2024.12' }
]

const certifications = [
  { name: '区块链安全认证', issuer: '国际区块链安全联盟' },
  { name: '数字资产调查资质', issuer: '全球数字资产调查协会' },
  { name: '反洗钱合规认证', issuer: '国际反洗钱组织' }
]

const partnerCompanies = [
  { name: 'Chainalysis', type: '链上分析' },
  { name: '慢雾科技', type: '安全审计' },
  { name: '知道创宇', type: '网络安全' },
  { name: 'CertiK', type: '智能合约审计' },
  { name: '派盾科技', type: '安全服务' },
  { name: 'TokenInsight', type: '数据分析' }
]

export default function AboutPage() {
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
              关于
              <span className="gradient-text">我们</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              链上分析与司法协作专家团队，最快 5 分钟启动紧急冻结响应机制，
              定制专属数字资产追回方案。
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
              <h2 className="text-3xl font-bold mb-4">公司简介</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed">
                  USDTRecovery 是一家专注于数字资产安全与追回的综合性服务机构。
                  我们整合了区块链技术、网络安全、法律合规等多领域的专业资源，
                  为全球用户提供高效、可靠的资产保护解决方案。
                </p>
                <p className="text-slate-400 leading-relaxed">
                  自2021年成立以来，我们始终坚持u0026ldquo;专业、高效、保密u0026rdquo;的服务理念，
                  已成功帮助数百位客户挽回数字资产损失。我们的服务覆盖BTC、ETH、USDT等
                  150+主流公链，与全球500+交易所、钱包建立司法合作关系。
                </p>
                <p className="text-slate-400 leading-relaxed">
                  无论是个人用户遭遇钓鱼攻击，还是机构面临复杂的DeFi安全事件，
                  我们都能提供从链上分析、证据固定到司法协作的全流程服务。
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  核心数据
                </h3>
                <div className="space-y-4">
                  {[
                    { label: '成立时间', value: '2021年' },
                    { label: '服务范围', value: '全球' },
                    { label: '团队规模', value: '30+ 专业人员' },
                    { label: '服务时长', value: '7×24 小时' },
                    { label: '客户满意度', value: '98%+' },
                    { label: '案件成功率', value: '57%' }
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
              <h2 className="text-3xl font-bold mb-6">专业团队</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                专业的事交给专业的团队，我们整合 Crypto 行业资源与专业知识，
                融入工匠精神，节约时间，对症下药。
              </p>
              <p className="text-slate-400 leading-relaxed">
                汇聚行业最资深的链上分析师、司法专家及律师，作为唯一的综合方案提供商，
                我们专注解决最棘手的问题。无论您的资产是在复杂的 DeFi 协议中被盗，
                还是遭遇了精心设计的钓鱼攻击，我们都能为您提供专业的分析与追回方案。
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
              <h2 className="text-3xl font-bold mb-4">核心团队</h2>
              <p className="text-slate-400">资深专家团队，为您的资产安全保驾护航</p>
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
                        <span className="text-slate-500">专长：</span>{member.expertise}
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
                发展历程
              </h2>
              <p className="text-slate-400">从初创到行业领先，我们一步一个脚印</p>
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
            <h2 className="text-3xl font-bold text-center mb-10">核心优势</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                '链上分析能力覆盖 150+ 主流公链',
                '全球 500 家 DEX/CEX/Wallet 司法合作',
                '最快 5 分钟启动紧急冻结',
                '司法语言解析链上交易并生成可视化报告',
                '7×24 小时全天候服务',
                '案件进展实时同步，全程透明',
              ].map((item, index) => (
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
              <h2 className="text-3xl font-bold mb-4">信任背书</h2>
              <p className="text-slate-400">媒体报道与行业认证</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Media Mentions */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-blue-400" />
                  媒体报道
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
                  行业认证
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
              <h2 className="text-3xl font-bold mb-4">客户评价</h2>
              <p className="text-slate-400">来自真实客户的声音（隐私信息已脱敏）</p>
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
              <h2 className="text-3xl font-bold mb-4">合作伙伴</h2>
              <p className="text-slate-400 mb-8">与全球领先的区块链安全机构建立深度合作关系</p>
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
              <h2 className="text-3xl font-bold mb-4">联系我们</h2>
              <p className="text-slate-400">7×24小时全天候为您服务</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">紧急热线</h3>
                <p className="text-slate-400 text-sm">Telegram: @xi_ao_duo</p>
                <p className="text-slate-500 text-xs mt-1">平均响应时间：2小时内</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">商务合作</h3>
                <p className="text-slate-400 text-sm">contact@usdtrecovery.com</p>
                <p className="text-slate-500 text-xs mt-1">工作日：24小时内回复</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">服务范围</h3>
                <p className="text-slate-400 text-sm">全球服务</p>
                <p className="text-slate-500 text-xs mt-1">覆盖150+国家和地区</p>
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
                立即免费咨询
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
