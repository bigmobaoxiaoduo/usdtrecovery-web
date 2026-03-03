import { BlogCategory } from '@/lib/blog'

interface CategoryFilterProps {
  activeCategory: string | null
  onCategoryChange: (category: string | null) => void
  counts: Record<string, number>
}

const categories: { id: BlogCategory | 'all'; label: string; color: string }[] = [
  { id: 'all', label: '全部', color: 'bg-slate-600' },
  { id: 'security-guides', label: '安全指南', color: 'bg-emerald-500' },
  { id: 'case-studies', label: '案例分析', color: 'bg-blue-500' },
  { id: 'technical-analysis', label: '技术解析', color: 'bg-purple-500' },
  { id: 'industry-news', label: '行业动态', color: 'bg-amber-500' },
  { id: 'recovery-tutorials', label: '追币教程', color: 'bg-rose-500' },
]

export default function CategoryFilter({ activeCategory, onCategoryChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id || (cat.id === 'all' && !activeCategory)
        const count = cat.id === 'all' 
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : counts[cat.id] || 0
        
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
