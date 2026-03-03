import { Lightbulb, CheckCircle } from 'lucide-react'

interface TLDRProps {
  points: string[]
}

export default function TLDR({ points }: TLDRProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-xl p-6 mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-bold text-blue-400">TL;DR 核心要点</h3>
      </div>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <span className="text-slate-300 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
