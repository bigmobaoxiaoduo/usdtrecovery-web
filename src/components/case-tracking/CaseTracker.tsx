'use client';

import { useState } from 'react';
import { Case, CaseStats, statusConfig, typeConfig } from './caseData';

interface CaseTrackerProps {
  cases: Case[];
  stats: CaseStats;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function CaseTracker({ cases, stats }: CaseTrackerProps) {
  const [filter, setFilter] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(c => c.status === filter || c.type === filter);

  const featuredCases = cases.filter(c => c.featured);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="总案件数" 
          value={stats.totalCases} 
          suffix="起"
          color="blue"
        />
        <StatCard 
          title="涉及金额" 
          value={formatCurrency(stats.totalAmount)} 
          color="red"
        />
        <StatCard 
          title="已追回" 
          value={formatCurrency(stats.recoveredAmount)} 
          color="green"
        />
        <StatCard 
          title="成功率" 
          value={stats.recoveryRate} 
          suffix="%"
          color="purple"
        />
      </div>

      {/* Featured Cases */}
      {featuredCases.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-4 text-white">🔥 重点案件</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredCases.map(case_ => (
              <FeaturedCaseCard key={case_.id} case_={case_} onClick={() => setSelectedCase(case_)} />
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          全部
        </FilterButton>
        <FilterButton active={filter === 'investigating'} onClick={() => setFilter('investigating')}>
          调查中
        </FilterButton>
        <FilterButton active={filter === 'tracing'} onClick={() => setFilter('tracing')}>
          追踪中
        </FilterButton>
        <FilterButton active={filter === 'recovered'} onClick={() => setFilter('recovered')}>
          已追回
        </FilterButton>
      </div>

      {/* Cases Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3 text-left text-slate-300">案件编号</th>
              <th className="p-3 text-left text-slate-300">类型</th>
              <th className="p-3 text-left text-slate-300">金额</th>
              <th className="p-3 text-left text-slate-300">状态</th>
              <th className="p-3 text-left text-slate-300">日期</th>
              <th className="p-3 text-left text-slate-300">进度</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map(case_ => (
              <tr 
                key={case_.id} 
                className="border-b border-slate-700 hover:bg-slate-800/50 cursor-pointer transition-colors"
                onClick={() => setSelectedCase(case_)}
              >
                <td className="p-3 font-mono text-sm text-slate-400">{case_.id}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs bg-${typeConfig[case_.type].color}-500/20 text-${typeConfig[case_.type].color}-400`}>
                    {typeConfig[case_.type].label}
                  </span>
                </td>
                <td className="p-3 text-slate-300">{formatCurrency(case_.amount)} {case_.currency}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs bg-${statusConfig[case_.status].color}-500/20 text-${statusConfig[case_.status].color}-400`}>
                    {statusConfig[case_.status].icon} {statusConfig[case_.status].label}
                  </span>
                </td>
                <td className="p-3 text-sm text-slate-400">{formatDate(case_.date)}</td>
                <td className="p-3">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${case_.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{case_.progress}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <CaseDetailModal 
          case_={selectedCase} 
          onClose={() => setSelectedCase(null)} 
        />
      )}
    </div>
  );
}

function StatCard({ title, value, suffix = '', color }: { 
  title: string; 
  value: string | number; 
  suffix?: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    red: 'bg-red-500/10 border-red-500/30 text-red-400',
    green: 'bg-green-500/10 border-green-500/30 text-green-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <p className="text-sm text-slate-400 mb-1">{title}</p>
      <p className="text-2xl font-bold">
        {value}{suffix}
      </p>
    </div>
  );
}

function FilterButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? 'bg-blue-600 text-white' 
          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  );
}

function FeaturedCaseCard({ case_, onClick }: { case_: Case; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="p-4 border border-slate-700 rounded-lg hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer bg-slate-800/30"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-mono text-slate-500">{case_.id}</span>
        <span className={`px-2 py-1 rounded text-xs bg-${statusConfig[case_.status].color}-500/20 text-${statusConfig[case_.status].color}-400`}>
          {statusConfig[case_.status].label}
        </span>
      </div>
      <h4 className="font-bold mb-2 text-white">{case_.title}</h4>
      <p className="text-sm text-slate-400 mb-3 line-clamp-2">{case_.description}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg text-slate-200">{formatCurrency(case_.amount)} {case_.currency}</span>
        <span className="text-xs text-slate-500">{case_.progress}% 完成</span>
      </div>
    </div>
  );
}

function CaseDetailModal({ case_, onClose }: { case_: Case; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-slate-700">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-sm font-mono text-slate-500">{case_.id}</span>
              <h2 className="text-xl font-bold mt-1 text-white">{case_.title}</h2>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white">
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-sm text-slate-500">类型</span>
              <p className="font-medium text-slate-200">{typeConfig[case_.type].label}</p>
            </div>
            <div>
              <span className="text-sm text-slate-500">金额</span>
              <p className="font-medium text-slate-200">{formatCurrency(case_.amount)} {case_.currency}</p>
            </div>
            <div>
              <span className="text-sm text-slate-500">状态</span>
              <p className="font-medium text-slate-200">{statusConfig[case_.status].icon} {statusConfig[case_.status].label}</p>
            </div>
            <div>
              <span className="text-sm text-slate-500">日期</span>
              <p className="font-medium text-slate-200">{formatDate(case_.date)}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2 text-white">案件描述</h3>
            <p className="text-slate-300">{case_.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2 text-white">进度</h3>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${case_.progress}%` }}
              />
            </div>
            <p className="text-right text-sm text-slate-400 mt-1">{case_.progress}%</p>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-white">案件进展</h3>
            <div className="space-y-3">
              {case_.updates.map((update, index) => (
                <div key={update.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    {index < case_.updates.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-700 my-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs text-slate-500">{formatDate(update.date)}</p>
                    <p className="font-medium text-slate-200">{update.title}</p>
                    <p className="text-sm text-slate-400">{update.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
