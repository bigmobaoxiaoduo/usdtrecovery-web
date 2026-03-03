import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 支持的语言
const locales = ['zh', 'en']
const defaultLocale = 'zh'

// 语言匹配规则
const localeMappings: Record<string, string> = {
  'zh': 'zh',
  'zh-CN': 'zh',
  'zh-TW': 'zh',
  'zh-HK': 'zh',
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'en-CA': 'en',
  'en-AU': 'en',
  // 其他语言默认英语
}

function getLocaleFromHeader(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  
  if (!acceptLanguage) return defaultLocale
  
  // 解析 Accept-Language header
  const languages = acceptLanguage.split(',').map(lang => {
    const [code, quality = '1'] = lang.trim().split(';q=')
    return { code: code.trim(), quality: parseFloat(quality) }
  })
  
  // 按质量排序
  languages.sort((a, b) => b.quality - a.quality)
  
  // 查找匹配的语言
  for (const { code } of languages) {
    // 检查完全匹配
    if (localeMappings[code]) {
      return localeMappings[code]
    }
    
    // 检查前缀匹配 (如 "en-US" -> "en")
    const prefix = code.split('-')[0]
    if (locales.includes(prefix)) {
      // 中文前缀返回中文，其他返回英文
      if (prefix === 'zh') return 'zh'
      if (prefix === 'en') return 'en'
    }
  }
  
  // 默认英语（非中文用户）
  return 'en'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) {
    // 已有语言前缀，不做处理
    return NextResponse.next()
  }
  
  // 检查是否是静态资源
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // 检测用户语言
  const locale = getLocaleFromHeader(request)
  
  // 重定向到对应语言版本
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // 匹配所有路径，除了静态资源和API
    '/((?!_next|api|images|favicon|.*\\.).*)',
  ],
}