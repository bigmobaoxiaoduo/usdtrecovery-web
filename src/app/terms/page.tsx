import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '服务条款 | USDTRecovery',
  description: 'USDTRecovery服务条款，了解我们的服务范围和责任限制。',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">服务条款</h1>
        
        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">1. 服务范围</h2>
            <p className="text-slate-400">我们提供以下服务：</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li>区块链资产追踪与分析</li>
              <li>司法协助与法律支持</li>
              <li>交易所沟通与资产冻结</li>
              <li>案件评估与咨询</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">2. 成功率说明</h2>
            <p className="text-slate-400">
              我们展示的成功率和案例数据基于历史案件统计，不代表对您案件的承诺。
              每个案件的具体情况不同，追回结果可能有所差异。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">3. 费用说明</h2>
            <p className="text-slate-400">
              具体服务费用根据案件复杂程度确定。
              部分服务采用&quot;成功收费&quot;模式，具体条款将在服务协议中明确。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">4. 责任限制</h2>
            <p className="text-slate-400">
              我们尽力提供专业服务，但不保证所有案件都能成功追回资产。
              客户应理解区块链资产的匿名性和不可逆性带来的挑战。
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
