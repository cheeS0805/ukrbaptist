export type GarageCategory = 'report' | 'resolution' | 'ministry' | 'history' | 'youth'

export interface GarageItem {
  id: string
  slug: string
  titleEn: string
  titleUk?: string
  titleRu?: string;
  thumbnailUrl?: string
  thumbnailUrlUk?: string
  category: GarageCategory
  publishedAt: string
  publishedAtUk?: string
  contentEn?: string
  contentUk?: string
  contentRu?: string
  contentFull?: string
  contentFullUk?: string
  images?: string[]
  imagesUk?: string[]
  pdfUrl?: string
  pdfLabel?: string
  youtubeIds?: string[]
  youtubeIdsUk?: string[]
  externalUrl?: string
  externalUrlUk?: string
}
