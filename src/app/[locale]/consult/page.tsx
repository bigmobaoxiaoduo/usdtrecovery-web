'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Clock, Shield, Users } from 'lucide-react'
import Logo from '@/components/Logo'
import { useTranslation } from '@/hooks/useTranslation'

interface FormData {
  name: string
  contactType: 'telegram' | 'wechat' | 'email'
  contactValue: string
  stolenToken: string
  stolenAmount: string
  caseDescription: string
}

export default function ConsultPage() {
  const router = useRouter()
  const { isEn } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactType: 'telegram',
    contactValue: '',
    stolenToken: 'USDT',
    stolenAmount: '',
    caseDescription: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const contactTypeLabels = {
    telegram: 'Telegram',
    wechat: isEn ? 'WeChat' : '微信',
    email: isEn ? 'Email' : '邮箱'
  }

  const contactTypePlaceholders = {
    telegram: isEn ? '@username or phone' : '@username 或 +86手机号',
    wechat: isEn ? 'WeChat ID' : '微信号',
    email: 'example@email.com'
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // 保存到 localStorage
    const submissions = JSON.parse(localStorage.getItem('consultation_submissions') || '[]')
    submissions.push({
      ...formData,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString()
    })
    localStorage.setItem('consultation_submissions', JSON.stringify(submissions))
    
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // 清除该字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleGoToTelegram = () => {
    const text = encodeURIComponent(
      isEn 
        ? `[Consultation Form]\nName: ${formData.name || 'Not provided'}\nContact: ${formData.contactValue} (${contactTypeLabels[formData.contactType]})\nToken: ${formData.stolenToken}\nAmount: ${formData.stolenAmount}\nDescription: ${formData.caseDescription.substring(0, 100)}${formData.caseDescription.length > 100 ? '...' : ''}`
        : `【咨询表单】\n姓名: ${formData.name || '未填写'}\n联系方式: ${formData.contactValue} (${contactTypeLabels[formData.contactType]})\n被盗币种: ${formData.stolenToken}\n涉案金额: ${formData.stolenAmount}\n案件简述: ${formData.caseDescription.substring(0, 100)}${formData.caseDescription.length > 100 ? '...' : ''}`
    )
    window.open(`https://t.me/xi_ao_duo?text=${text}`, '_blank')
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
                ? 'We have received your inquiry. Our professional team will contact you within 2 hours. You can also reach us directly via Telegram for faster response.'
                : '我们已收到您的咨询信息，专业团队将在2小时内与您联系。您也可以直接通过 Telegram 联系我们，获得更快响应。'
              }
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-white mb-4">{isEn ? 'Information Submitted' : '您提交的信息'}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">{isEn ? 'Name' : '姓名'}</span>
                  <span className="text-white">{formData.name || (isEn ? 'Not provided' : '未填写')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isEn ? 'Contact' : '联系方式'}</span>
                  <span className="text-white">{contactTypeLabels[formData.contactType]}: {formData.contactValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isEn ? 'Token' : '被盗币种'}</span>
                  <span className="text-white">{formData.stolenToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isEn ? 'Amount' : '涉案金额'}</span>
                  <span className="text-white">{formData.stolenAmount}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleGoToTelegram}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                {isEn ? 'Contact via Telegram' : '前往 Telegram 咨询'}
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                {isEn ? 'Back to Home' : '返回首页'}
              </button>
            </div>
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
                    ? 'Fill in the information below, and our professional team will contact you within 2 hours to assess your case recovery potential.'
                    : '填写以下信息，我们的专业团队将在2小时内与您联系，评估您的案件追回可能性。'
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 姓名 */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {isEn ? 'Name' : '姓名'} <span className="text-slate-500">{isEn ? '(Optional)' : '(选填)'}</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder={isEn ? 'How should we address you?' : '怎么称呼您'}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  {/* 联系方式 */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {isEn ? 'Contact' : '联系方式'} <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {(['telegram', 'wechat', 'email'] as const).map((type) => (
                        <label
                          key={type}
                          className={`cursor-pointer text-center py-2 px-3 rounded-lg border transition-all text-sm ${
                            formData.contactType === type
                              ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                              : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          <input
                            type="radio"
                            value={type}
                            checked={formData.contactType === type}
                            onChange={() => handleChange('contactType', type)}
                            className="sr-only"
                          />
                          {contactTypeLabels[type]}
                        </label>
                      ))}
                    </div>
                    <input
                      type="text"
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
                        value={formData.stolenAmount}
                        onChange={(e) => handleChange('stolenAmount', e.target.value)}
                        placeholder={isEn ? 'e.g. 50000 USDT' : '如: 50000 USDT'}
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
                      value={formData.caseDescription}
                      onChange={(e) => handleChange('caseDescription', e.target.value)}
                      rows={5}
                      placeholder={isEn 
                        ? `Please briefly describe the case, including:
• Time of theft
• Method (phishing, wallet hack, exchange issue, etc.)
• Transaction hash (if available)
• Measures already taken`
                        : `请简要描述案件经过，包括：
• 被盗时间
• 被盗方式（钓鱼网站、钱包被盗、交易所问题等）
• 交易哈希（如有）
• 已采取的措施`
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
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {isEn ? 'Submitting...' : '提交中...'}
                      </>
                    ) : (
                      isEn ? 'Submit Inquiry' : '提交咨询'
                    )}
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
