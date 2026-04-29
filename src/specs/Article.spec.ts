export interface Article {
  id: string
  slug: string
  titleEn: string
  titleUk?: string
  excerptEn: string
  excerptUk?: string
  thumbnailUrl: string
  thumbnailUrlUk?: string
  publishedAt: string
  publishedAtUk?: string
  authorName?: string
  authorNameUk?: string
  authorRole?: string
  contentEn?: string
  contentUk?: string
  contentFull?: string
  contentFullUk?: string
  cardVariant?: 'text-only' | 'image-top' | 'thumbnail-left'
}
