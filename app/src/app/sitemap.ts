import { SITE_URL } from '@/lib/site'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
  ]
}
