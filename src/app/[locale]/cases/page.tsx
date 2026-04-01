import { initialCases, calculateStats } from '@/components/case-tracking/caseData';
import CaseTracker from '@/components/case-tracking/CaseTracker';

export default function CasesPage() {
  const cases = initialCases;
  const stats = calculateStats(cases);

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">案件追踪</h1>
          <p className="text-slate-400">实时追踪加密货币诈骗案件进展，公开透明的追回过程</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <CaseTracker cases={cases} stats={stats} />
        </div>

        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h3 className="font-bold text-blue-400 mb-2">📢 说明</h3>
          <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
            <li>为保护受害者隐私，案件信息已进行脱敏处理</li>
            <li>案件数据每日更新，确保信息时效性</li>
            <li>成功率统计基于已结案件计算</li>
            <li>点击案件可查看详细进展时间线</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
