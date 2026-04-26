export interface NavItem {
  id: string
  labelEn: string
  labelUk: string
  href: string
  children?: NavItem[]
}
