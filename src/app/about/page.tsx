'use client'

import { motion } from 'framer-motion'
import { Shield, Users, Scale, Globe, CheckCircle, Award } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
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
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Team Description */}
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
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
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

        {/* Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl p-8 md:p-12 border border-blue-500/20"
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

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-bold mb-8">合作伙伴</h2>
          <p className="text-slate-400 mb-8">我们的团队曾在以下类型的企业或单位就职</p>
          
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {['知名交易所', '安全公司', '律所', '审计机构', '区块链项目'].map((partner) => (
              <div
                key={partner}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-6 py-4 text-slate-400"
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
