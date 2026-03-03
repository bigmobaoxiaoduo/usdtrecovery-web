interface TimelineItem {
  time: string
  title: string
  description: string
  status?: 'completed' | 'current' | 'pending'
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="my-8">
      <div className="relative">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 mb-6 last:mb-0">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${
                item.status === 'completed' ? 'bg-emerald-500' :
                item.status === 'current' ? 'bg-blue-500 animate-pulse' :
                'bg-slate-600'
              }`} />
              {index < items.length - 1 && (
                <div className="w-0.5 h-full bg-slate-700 mt-2" />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="text-sm text-blue-400 font-medium mb-1">{item.time}</div>
              <h4 className="text-white font-semibold mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface FlowchartStep {
  title: string
  description: string
  icon?: string
}

interface FlowchartProps {
  steps: FlowchartStep[]
}

export function Flowchart({ steps }: FlowchartProps) {
  return (
    <div className="my-8">
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                {step.icon && (
                  <span className="text-3xl">{step.icon}</span>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center my-2">
                <div className="text-slate-600 text-2xl">↓</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface FundFlowProps {
  steps: {
    from: string
    to: string
    amount: string
    method?: string
  }[]
}

export function FundFlow({ steps }: FundFlowProps) {
  return (
    <div className="my-8 bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-1 bg-slate-700/50 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">FROM</div>
              <div className="text-sm text-white font-mono truncate">{step.from}</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-amber-400 font-semibold">{step.amount}</div>
              <div className="text-slate-500">→</div>
              {step.method && (
                <div className="text-xs text-slate-500 mt-1">{step.method}</div>
              )}
            </div>
            
            <div className="flex-1 bg-slate-700/50 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">TO</div>
              <div className="text-sm text-white font-mono truncate">{step.to}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
