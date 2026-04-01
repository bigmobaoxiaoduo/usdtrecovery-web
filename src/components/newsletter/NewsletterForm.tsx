'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage('订阅成功！请查收确认邮件。');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || '订阅失败，请稍后重试。');
      }
    } catch {
      setStatus('error');
      setMessage('网络错误，请稍后重试。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="输入您的邮箱"
          required
          className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? '订阅中...' : '订阅'}
        </button>
      </div>
      
      {status === 'success' && (
        <p className="text-green-400 text-sm">✅ {message}</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm">❌ {message}</p>
      )}
      
      <p className="text-xs text-slate-500">
        我们尊重您的隐私，不会向第三方分享您的邮箱。您可以随时退订。
      </p>
    </form>
  );
}

export function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border-y border-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 rounded-full px-4 py-2 mb-6">
          <span className="text-blue-400 text-sm font-medium">📧 安全资讯订阅</span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          订阅我们的安全资讯
        </h2>
        
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          获取最新的加密货币诈骗手法分析、安全防范建议和追回案例分享。
          每周精选内容，助您保护数字资产安全。
        </p>

        <div className="max-w-md mx-auto">
          <NewsletterForm />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            诈骗手法警示
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            安全防范指南
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            追回案例分享
          </div>
        </div>
      </div>
    </section>
  );
}
