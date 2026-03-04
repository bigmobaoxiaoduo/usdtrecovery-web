import { User, Award, Shield } from 'lucide-react'

interface AuthorCardProps {
  name: string
  title: string
  avatar?: string
  bio?: string
  credentials?: string[]
}

export default function AuthorCard({
  name,
  title,
  avatar,
  bio,
  credentials = [],
}: AuthorCardProps) {
  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 my-10">
      <div className="flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
          {avatar ? (
            <img 
              src={avatar} 
              alt={`${name} - USDTRecovery专家头像`} 
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            name.charAt(0)
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-bold text-white">{name}</h4>
            <Shield className="w-4 h-4 text-blue-400" />
          </div>
          
          <div className="text-blue-400 text-sm font-medium mb-3">{title}</div>
          
          {bio && (
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{bio}</p>
          )}
          
          {credentials.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {credentials.map((credential, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs"
                >
                  <Award className="w-3 h-3" />
                  {credential}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
