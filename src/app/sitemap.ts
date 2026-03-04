import { MetadataRoute } from 'next'

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
  
  return sitemapEntries
}
