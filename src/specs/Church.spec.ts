export interface ChurchContact {
  name: string
  nameUk?: string
  phone?: string
}

export interface Church {
  id: string
  slug: string
  nameEn: string
  nameUk?: string
  photoUrl: string
  contacts?: ChurchContact[]
  address?: string
  website?: string
  mapsUrl?: string
  email?: string
}
