'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // 处理锚点链接点击
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      if (!isHomePage) {
        // 如果不在首页，跳转到首页并带上锚点
        e.preventDefault()
        window.location.href = '/' + href
      }
      // 如果在首页，正常锚点行为
      setIsMenuOpen(false)
    }
  }

  // 阻止滚动穿透
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: '/', label: '首页', isPage: true },
    { href: '/blog', label: '博客', isPage: true },
  ]

  const footerLinks = [
    { href: '/privacy', label: '隐私政策' },
    { href: '/terms', label: '服务条款' },
    { href: 'https://t.me/xi_ao_duo', label: 'Telegram', external: true },
    { href: 'https://x.com/thechainsec', label: 'Twitter/X', external: true },
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Shield className="w-6 h-6 text-blue-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">₿</span>
                </div>
              </div>
              <span className="text-xl font-bold gradient-text group-hover:opacity-90 transition-opacity">
                USDTRecovery
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => !link.isPage && handleAnchorClick(e, link.href)}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={isHomePage ? '#contact' : '/#contact'}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                立即咨询
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-slate-950 border-b border-slate-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => !link.isPage && handleAnchorClick(e, link.href)}
                    className="block py-3 px-4 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={isHomePage ? '#contact' : '/#contact'}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-center mt-4"
                >
                  立即咨询
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 USDTRecovery. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-slate-500">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="hover:text-slate-300 transition-colors py-2 px-2 md:px-0 min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
