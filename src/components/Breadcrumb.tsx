'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { useMemo } from 'react'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent: boolean
}

interface BreadcrumbProps {
  /**
   * 自定义路径映射，用于覆盖默认的中文名称
   */
  customMapping?: Record<string, string>
  /**
   * 博客文章标题（用于动态面包屑）
   */
  blogTitle?: string
}

/**
 * 默认路径到中文名称的映射
 */
const defaultPathMapping: Record<string, string> = {
  '': '首页',
  'about': '关于我们',
  'blog': '博客',
  'terms': '服务条款',
  'privacy': '隐私政策',
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
      item: item.isCurrent ? undefined : `https://usdtrecovery.xyz${item.href}`,
    })),
  }
  return JSON.stringify(schema)
}

export default function Breadcrumb({ customMapping = {}, blogTitle }: BreadcrumbProps) {
  const pathname = usePathname()

  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    // 合并默认映射和自定义映射
    const pathMapping = { ...defaultPathMapping, ...customMapping }
    
    // 分割路径
    const pathSegments = pathname.split('/').filter(Boolean)
    
    // 生成面包屑项
    const items: BreadcrumbItem[] = []
    
    // 首页
    items.push({
      label: '首页',
      href: '/',
      isCurrent: pathname === '/',
    })

    // 如果不是首页，添加其他层级
    if (pathSegments.length > 0) {
      let currentPath = ''
      
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`
        const isLast = index === pathSegments.length - 1
        
        // 确定标签
        let label: string
        if (isLast && blogTitle && pathSegments[0] === 'blog' && pathSegments.length > 1) {
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
  }, [pathname, customMapping, blogTitle])

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
      <nav aria-label="面包屑导航" className="py-4">
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
