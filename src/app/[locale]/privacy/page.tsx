import { Metadata } from 'next'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: '隐私政策 | USDTRecovery',
  description: 'USDTRecovery隐私保护政策，我们严格保护客户隐私和案件信息。',
}

export default function PrivacyPage() {
  return (
    <Layout>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          <h1 className="text-3xl font-bold mb-8 mt-4">隐私政策</h1>
          
          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">1. 信息收集</h2>
              <p>我们可能收集以下信息：</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                <li>联系方式（Telegram、邮箱等）</li>
                <li>案件相关信息（钱包地址、交易记录等）</li>
                <li>沟通记录</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">2. 信息使用</h2>
              <p className="text-slate-400">我们使用您的信息仅用于：</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                <li>评估案件追回可能性</li>
                <li>提供追回服务</li>
                <li>与您沟通案件进展</li>
                <li>法律程序所需</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">3. 信息保护</h2>
              <p className="text-slate-400">
                我们采用行业标准的加密技术保护您的信息安全。
                所有案件信息严格保密，未经您的同意不会向第三方透露。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">4. 联系我们</h2>
              <p className="text-slate-400">
                如有隐私相关问题，请通过{' '}
                <a 
                  href="https://t.me/xi_ao_duo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Telegram
                </a>
                {' '}联系我们。
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  )
}
