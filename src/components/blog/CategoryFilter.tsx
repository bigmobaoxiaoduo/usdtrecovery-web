interface CategoryFilterProps {
  activeCategory: string | null
  onCategoryChange: (category: string | null) => void
  counts: Record<string, number>
}

interface Category {
  id: string
  label: string
  color: string
}

const categories: Category[] = [
  { id: 'all', label: '全部', color: 'bg-slate-600' },
  { id: 'DeFi安全', label: 'DeFi安全', color: 'bg-red-500' },
  { id: '防骗指南', label: '防骗指南', color: 'bg-orange-500' },
  { id: '安全防护', label: '安全防护', color: 'bg-emerald-500' },
  { id: '报警指南', label: '报警指南', color: 'bg-blue-500' },
  { id: '追回案例', label: '追回案例', color: 'bg-cyan-500' },
  { id: '追币指南', label: '追币指南', color: 'bg-rose-500' },
  { id: '安全科普', label: '安全科普', color: 'bg-violet-500' },
  { id: '成功案例', label: '成功案例', color: 'bg-green-500' },
  { id: '解冻指南', label: '解冻指南', color: 'bg-amber-500' },
]

export default function CategoryFilter({ activeCategory, onCategoryChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id || (cat.id === 'all' && !activeCategory)
        const count = cat.id === 'all' 
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : counts[cat.id] || 0
        
        // 如果分类没有文章，不显示（除了"全部"）
        if (cat.id !== 'all' && count === 0) return null
        
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id === 'all' ? null : cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive
                ? `${cat.color} text-white`
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`text-xs ${isActive ? 'bg-white/20' : 'bg-slate-700'} px-2 py-0.5 rounded-full`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
