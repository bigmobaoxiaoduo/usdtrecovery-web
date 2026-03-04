'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent: boolean
}

interface BreadcrumbProps {
  /**
   * 自定义路径映射，用于覆盖默认的名称
   */
  customMapping?: Record<string, string>
  /**
   * 博客文章标题（用于动态面包屑）
   */
  blogTitle?: string
}

/**
 * 生成 BreadcrumbList 结构化数据的 JSON-LD
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.isCurrent ? undefined : `https://www.usdtrecovery.xyz${item.href}`,
    })),
  }
  return JSON.stringify(schema)
}

export default function Breadcrumb({ customMapping = {}, blogTitle }: BreadcrumbProps) {
  const pathname = usePathname()
  const { isEn } = useTranslation()

  // 翻译文本
  const texts = {
    home: isEn ? 'Home' : '首页',
    about: isEn ? 'About Us' : '关于我们',
    blog: isEn ? 'Blog' : '博客',
    terms: isEn ? 'Terms of Service' : '服务条款',
    privacy: isEn ? 'Privacy Policy' : '隐私政策',
    consult: isEn ? 'Consult' : '咨询',
  }

  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    // 路径到名称的映射
    const pathMapping: Record<string, string> = {
      '': texts.home,
      'about': texts.about,
      'blog': texts.blog,
      'terms': texts.terms,
      'privacy': texts.privacy,
      'consult': texts.consult,
      ...customMapping
    }
    
    // 分割路径
    const pathSegments = pathname.split('/').filter(Boolean)
    
    // 生成面包屑项（跳过语言代码 zh/en）
    const items: BreadcrumbItem[] = []
    
    // 首页 - 使用当前语言的首页链接
    const firstSegment = pathSegments[0]
    const isLocalePath = firstSegment === 'zh' || firstSegment === 'en'
    const homeHref = isLocalePath ? `/${firstSegment}` : '/'
    
    items.push({
      label: texts.home,
      href: homeHref,
      isCurrent: pathname === '/' || pathname === '/zh' || pathname === '/en',
    })

    // 如果不是首页，添加其他层级
    if (pathSegments.length > 0) {
      let currentPath = ''
      
      pathSegments.forEach((segment, index) => {
        // 跳过语言代码
        if (segment === 'zh' || segment === 'en') {
          currentPath += `/${segment}`
          return
        }
        
        currentPath += `/${segment}`
        const isLast = index === pathSegments.length - 1
        
        // 确定标签
        let label: string
        if (isLast && blogTitle && segment !== 'blog') {
          // 如果是博客文章详情页，使用传入的标题
          label = blogTitle
        } else {
          label = pathMapping[segment] || segment
        }
        
        items.push({
          label,
          href: currentPath,
          isCurrent: isLast,
        })
      })
    }

    return items
  }, [pathname, customMapping, blogTitle, texts])

  // 生成结构化数据
  const schemaData = generateBreadcrumbSchema(breadcrumbItems)

  // 如果只有首页，不显示面包屑
  if (breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaData }}
      />
      
      {/* 面包屑导航 UI */}
      <nav aria-label={isEn ? 'Breadcrumb' : '面包屑导航'} className="py-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-slate-600 mx-2 flex-shrink-0" />
              )}
              
              {item.isCurrent ? (
                // 当前页面（不可点击）
                <span 
                  className="text-slate-500 font-medium truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]"
                  aria-current="page"
                >
                  {index === 0 && (
                    <Home className="w-4 h-4 inline-block mr-1 -mt-0.5" />
                  )}
                  {item.label}
                </span>
              ) : (
                // 可点击链接
                <Link
                  href={item.href}
                  className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  {index === 0 && (
                    <Home className="w-4 h-4 inline-block mr-1 -mt-0.5 group-hover:text-blue-400 transition-colors" />
                  )}
                  <span className="group-hover:text-blue-400 transition-colors">
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
