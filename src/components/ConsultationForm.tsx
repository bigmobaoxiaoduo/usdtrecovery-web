'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X, Send, User, MessageSquare, Wallet, FileText, ChevronRight } from 'lucide-react'

export interface FormData {
  name: string
  contactType: 'telegram' | 'wechat' | 'email'
  contactValue: string
  stolenToken: string
  stolenAmount: string
  caseDescription: string
}

interface ConsultationFormProps {
  onClose: () => void
  onSubmit: (data: FormData) => void
  defaultPlan?: string
}

const contactTypeLabels = {
  telegram: 'Telegram',
  wechat: '微信',
  email: '邮箱'
}

const contactTypePlaceholders = {
  telegram: '@username 或 +86手机号',
  wechat: '微信号',
  email: 'example@email.com'
}

export default function ConsultationForm({ onClose, onSubmit, defaultPlan }: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      contactType: 'telegram',
      stolenToken: 'USDT',
    }
  })

  const contactType = watch('contactType')

  const handleFormSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    // 保存到 localStorage
    const submissions = JSON.parse(localStorage.getItem('consultation_submissions') || '[]')
    submissions.push({
      ...data,
      plan: defaultPlan,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString()
    })
    localStorage.setItem('consultation_submissions', JSON.stringify(submissions))
    
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    onSubmit(data)
  }

  if (isSuccess) {
    return <SuccessView onClose={onClose} formData={watch()} />
  }

  return (
    <div className="relative">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">免费咨询</h2>
          <p className="text-slate-300 text-sm mt-1">
            填写信息，专业团队将在2小时内联系您
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* 姓名 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            姓名 <span className="text-slate-400">(选填)</span>
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="怎么称呼您"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
          />
        </div>

        {/* 联系方式 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            联系方式 <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {(['telegram', 'wechat', 'email'] as const).map((type) => (
              <label
                key={type}
                className={`cursor-pointer text-center py-2 px-3 rounded-lg border transition-all text-sm ${
                  contactType === type
                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <input
                  type="radio"
                  value={type}
                  {...register('contactType')}
                  className="sr-only"
                />
                {contactTypeLabels[type]}
              </label>
            ))}
          </div>
          <input
            {...register('contactValue', { required: '请填写联系方式' })}
            type="text"
            placeholder={contactTypePlaceholders[contactType]}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
          />
          {errors.contactValue && (
            <p className="text-red-400 text-xs mt-1">{errors.contactValue.message}</p>
          )}
        </div>

        {/* 被盗币种和金额 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Wallet className="w-4 h-4 inline mr-2" />
              被盗币种 <span className="text-red-400">*</span>
            </label>
            <input
              {...register('stolenToken', { required: '请填写被盗币种' })}
              type="text"
              placeholder="如: USDT"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            {errors.stolenToken && (
              <p className="text-red-400 text-xs mt-1">{errors.stolenToken.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              涉案金额 <span className="text-red-400">*</span>
            </label>
            <input
              {...register('stolenAmount', { required: '请填写涉案金额' })}
              type="text"
              placeholder="如: 50000 USDT"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            {errors.stolenAmount && (
              <p className="text-red-400 text-xs mt-1">{errors.stolenAmount.message}</p>
            )}
          </div>
        </div>

        {/* 案件简述 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            案件简述 <span className="text-red-400">*</span>
          </label>
          <textarea
            {...register('caseDescription', { 
              required: '请简述案件情况',
              minLength: { value: 10, message: '请至少输入10个字符' }
            })}
            rows={4}
            placeholder="请简要描述案件经过，包括：
• 被盗时间
• 被盗方式（钓鱼网站、钱包被盗、交易所问题等）
• 交易哈希（如有）
• 已采取的措施"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
          />
          {errors.caseDescription && (
            <p className="text-red-400 text-xs mt-1">{errors.caseDescription.message}</p>
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
              提交中...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              提交咨询
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400">
          提交即表示您同意我们的服务条款和隐私政策
        </p>
      </form>
    </div>
  )
}

// 成功页面组件
function SuccessView({ onClose, formData }: { onClose: () => void; formData: FormData }) {
  const handleGoToTelegram = () => {
    const text = encodeURIComponent(
      `【咨询表单】\n` +
      `姓名: ${formData.name || '未填写'}\n` +
      `联系方式: ${formData.contactValue} (${contactTypeLabels[formData.contactType]})\n` +
      `被盗币种: ${formData.stolenToken}\n` +
      `涉案金额: ${formData.stolenAmount}\n` +
      `案件简述: ${formData.caseDescription.substring(0, 100)}${formData.caseDescription.length > 100 ? '...' : ''}`
    )
    window.open(`https://t.me/xi_ao_duo?text=${text}`, '_blank')
  }

  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">提交成功！</h2>
      <p className="text-slate-300 mb-6">
        我们已收到您的咨询信息，专业团队将在2小时内与您联系。
        <br />
        您也可以直接通过 Telegram 联系我们，获得更快响应。
      </p>

      <div className="space-y-3">
        <button
          onClick={handleGoToTelegram}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
          </svg>
          前往 Telegram 咨询
          <ChevronRight className="w-4 h-4" />
        </button>
        
        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
        >
          关闭窗口
        </button>
      </div>
    </div>
  )
}
