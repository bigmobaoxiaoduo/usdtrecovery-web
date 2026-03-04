'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Clock, Shield, Users } from 'lucide-react'
import Logo from '@/components/Logo'
import { useTranslation } from '@/hooks/useTranslation'

// Formsubmit.co 配置 - 无需注册，直接发送到你的邮箱
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/807110848@qq.com'

export default function ConsultContent() {
  const router = useRouter()
  const { isEn, locale } = useTranslation()
  const [isSuccess, setIsSuccess] = useState(false)
  
  useEffect(() => {
    // 在客户端检测 URL 参数
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setIsSuccess(params.get('success') === 'true')
    }
  }, [])
  
  const [formData, setFormData] = useState({
    name: '',
    contactType: 'telegram',
    contactValue: '',
    stolenToken: 'USDT',
    stolenAmount: '',
    caseDescription: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const contactTypeLabels: Record<string, string> = {
    telegram: 'Telegram',
    wechat: isEn ? 'WeChat' : '微信',
    email: isEn ? 'Email' : '邮箱'
  }

  const contactTypePlaceholders: Record<string, string> = {
    telegram: isEn ? '@username or phone' : '@username 或 +86手机号',
    wechat: isEn ? 'WeChat ID' : '微信号',
    email: 'example@email.com'
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.contactValue.trim()) {
      newErrors.contactValue = isEn ? 'Please enter contact information' : '请填写联系方式'
    }
    if (!formData.stolenToken.trim()) {
      newErrors.stolenToken = isEn ? 'Please enter token type' : '请填写被盗币种'
    }
    if (!formData.stolenAmount.trim()) {
      newErrors.stolenAmount = isEn ? 'Please enter amount' : '请填写涉案金额'
    }
    if (!formData.caseDescription.trim()) {
      newErrors.caseDescription = isEn ? 'Please describe your case' : '请简述案件情况'
    } else if (formData.caseDescription.length < 10) {
      newErrors.caseDescription = isEn ? 'Please enter at least 10 characters' : '请至少输入10个字符'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (!validateForm()) {
      e.preventDefault()
    }
    // 如果验证通过，让表单正常提交到 Formsubmit.co
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-slate-950">
        <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={() => router.push('/')}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {isEn ? 'Back to Home' : '返回首页'}
              </button>
            </div>
          </div>
        </nav>

        <div className="pt-32 pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">{isEn ? 'Submitted Successfully!' : '提交成功！'}</h1>
            <p className="text-xl text-slate-400 mb-8">
              {isEn 
                ? 'We have received your inquiry. Our professional team will contact you within 2 hours.'
                : '我们已收到您的咨询信息，专业团队将在2小时内与您联系。'
              }
            </p>

            <button
              onClick={() => router.push('/')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              {isEn ? 'Back to Home' : '返回首页'}
            </button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={() => router.push('/')}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {isEn ? 'Back to Home' : '返回首页'}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            {/* 左侧信息 */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-32"
              >
                <h1 className="text-3xl font-bold text-white mb-4">{isEn ? 'Free Consultation' : '免费咨询'}</h1>
                <p className="text-slate-400 mb-8">
                  {isEn 
                    ? 'Fill in the information below, and our professional team will contact you within 2 hours.'
                    : '填写以下信息，我们的专业团队将在2小时内与您联系。'
                  }
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>{isEn ? 'Response within 2 hours' : '2小时内响应'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span>{isEn ? 'Strictly confidential' : '严格保密'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span>{isEn ? 'Professional team' : '专业团队'}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
                  <p className="text-sm text-slate-400">
                    <span className="text-white font-semibold">357+</span> {isEn ? 'Success Cases · ' : '成功案例 · '}
                    <span className="text-white font-semibold">$35M+</span> {isEn ? 'Assets Recovered' : '资产挽回'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 右侧表单 */}
            <div className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
              >
                <form 
                  action={FORMSUBMIT_ENDPOINT}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Formsubmit.co 配置参数 */}
                  <input type="hidden" name="_subject" value={isEn ? '[USDTRecovery] New Consultation' : '【USDTRecovery】新咨询表单'} />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value={`https://www.usdtrecovery.xyz/${locale}/consult?success=true`} />

                  {/* 姓名 */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {isEn ? 'Name' : '姓名'} <span className="text-slate-500">{isEn ? '(Optional)' : '(选填)'}</span>
                    </label>
                    <input
                      type="text"
                      name="姓名"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder={isEn ? 'How should we address you?' : '怎么称呼您'}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  {/* 联系方式 */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {isEn ? 'Contact Type' : '联系方式类型'} <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="联系方式类型"
                      value={formData.contactType}
                      onChange={(e) => handleChange('contactType', e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all mb-2"
                    >
                      <option value="telegram">Telegram</option>
                      <option value="wechat">{isEn ? 'WeChat' : '微信'}</option>
                      <option value="email">{isEn ? 'Email' : '邮箱'}</option>
                    </select>
                    <input
                      type="text"
                      name="联系方式"
                      value={formData.contactValue}
                      onChange={(e) => handleChange('contactValue', e.target.value)}
                      placeholder={contactTypePlaceholders[formData.contactType]}
                      className={`w-full bg-slate-800/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all ${
                        errors.contactValue ? 'border-red-500/50' : 'border-slate-700'
                      }`}
                    />
                    {errors.contactValue && (
                      <p className="text-red-400 text-xs mt-1">{errors.contactValue}</p>
                    )}
                  </div>

                  {/* 被盗币种和金额 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {isEn ? 'Token Type' : '被盗币种'} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="被盗币种"
                        value={formData.stolenToken}
                        onChange={(e) => handleChange('stolenToken', e.target.value)}
                        placeholder={isEn ? 'e.g. USDT' : '如: USDT'}
                        className={`w-full bg-slate-800/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all ${
                          errors.stolenToken ? 'border-red-500/50' : 'border-slate-700'
                        }`}
                      />
                      {errors.stolenToken && (
                        <p className="text-red-400 text-xs mt-1">{errors.stolenToken}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {isEn ? 'Amount' : '涉案金额'} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="涉案金额"
                        value={formData.stolenAmount}
                        onChange={(e) => handleChange('stolenAmount', e.target.value)}
                        placeholder={isEn ? 'e.g. 50000' : '如: 50000'}
                        className={`w-full bg-slate-800/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all ${
                          errors.stolenAmount ? 'border-red-500/50' : 'border-slate-700'
                        }`}
                      />
                      {errors.stolenAmount && (
                        <p className="text-red-400 text-xs mt-1">{errors.stolenAmount}</p>
                      )}
                    </div>
                  </div>

                  {/* 案件简述 */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {isEn ? 'Case Description' : '案件简述'} <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="案件描述"
                      value={formData.caseDescription}
                      onChange={(e) => handleChange('caseDescription', e.target.value)}
                      rows={5}
                      placeholder={isEn 
                        ? `Please briefly describe the case, including:\n• Time of theft\n• Method (phishing, wallet hack, etc.)\n• Transaction hash (if any)`
                        : `请简要描述案件经过，包括：\n• 被盗时间\n• 被盗方式（钓鱼网站、钱包被盗等）\n• 交易哈希（如有）`
                      }
                      className={`w-full bg-slate-800/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none ${
                        errors.caseDescription ? 'border-red-500/50' : 'border-slate-700'
                      }`}
                    />
                    {errors.caseDescription && (
                      <p className="text-red-400 text-xs mt-1">{errors.caseDescription}</p>
                    )}
                  </div>

                  {/* 提交按钮 */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    {isEn ? 'Submit Inquiry' : '提交咨询'}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    {isEn 
                      ? 'By submitting, you agree to our Terms of Service and Privacy Policy'
                      : '提交即表示您同意我们的服务条款和隐私政策'
                    }
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
