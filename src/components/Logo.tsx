import { Shield } from 'lucide-react'

export default function Logo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { icon: 20, text: 'text-lg' },
    default: { icon: 24, text: 'text-xl' },
    large: { icon: 32, text: 'text-2xl' },
  }
  
  const { icon, text } = sizes[size]
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Shield className={`w-${icon === 20 ? '5' : icon === 24 ? '6' : '8'} h-${icon === 20 ? '5' : icon === 24 ? '6' : '8'} text-blue-500`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-xs">₿</span>
        </div>
      </div>
      <span className={`${text} font-bold gradient-text`}>USDTRecovery</span>
    </div>
  )
}
