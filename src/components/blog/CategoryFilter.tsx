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

import { useTranslation } from '@/hooks/useTranslation'

const getCategories = (isEn: boolean): Category[] => [
  { id: 'all', label: isEn ? 'All' : '全部', color: 'bg-slate-600' },
  { id: 'security-guides', label: isEn ? 'Security Guides' : '安全防护', color: 'bg-emerald-500' },
  { id: 'case-studies', label: isEn ? 'Case Studies' : '追回案例', color: 'bg-cyan-500' },
  { id: 'recovery-tutorials', label: isEn ? 'Recovery Tutorials' : '追币指南', color: 'bg-rose-500' },
  { id: 'technical-analysis', label: isEn ? 'Technical Analysis' : '技术解析', color: 'bg-violet-500' },
  { id: 'industry-news', label: isEn ? 'Industry News' : '行业动态', color: 'bg-amber-500' },
]

export default function CategoryFilter({ activeCategory, onCategoryChange, counts }: CategoryFilterProps) {
  const { isEn } = useTranslation()
  const categories = getCategories(isEn)
  
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
