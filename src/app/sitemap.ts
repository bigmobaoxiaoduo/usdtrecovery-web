import { MetadataRoute } from 'next'
import { zhBlogPosts, enBlogPosts } from '@/lib/blog'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.usdtrecovery.xyz'
  
  const routes = [
    '',
    '/about',
    '/blog',
    '/consult',
    '/privacy',
    '/terms',
  ]
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // 添加根路径（默认中文）
  sitemapEntries.push({
    url: `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })
  
  // 为每种语言生成路由
  const locales = ['zh', 'en']
  
  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    }
  }
  
  // 添加中文博客文章
  for (const post of zhBlogPosts) {
    sitemapEntries.push({
      url: `${baseUrl}/zh/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }
  
  // 添加英文博客文章
  for (const post of enBlogPosts) {
    sitemapEntries.push({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }
  
  return sitemapEntries
}
