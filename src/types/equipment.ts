export type Equipment = {
  slug: string
  title: string
  category: string
  brand: string
  model: string
  year: number
  condition: string
  price: number
  engine_hours: number | null
  power_hp: number | null
  location: string
  short_description: string
  images: string[]
  features: string[]
  id: string
}

export type EquipmentDetail = Equipment & {
  description: string
  created_at: string
}

export type EquipmentListResponse = {
  items: Equipment[]
  total: number
  page: number
  page_size: number
}

export type EquipmentFilters = {
  categories: string[]
  brands: string[]
  years: number[]
  conditions: string[]
  price_min: number | null
  price_max: number | null
}

export type EquipmentQuery = {
  page?: number
  page_size?: number
  category?: string
  brand?: string
  year?: number
  condition?: string
  price_min?: number
  price_max?: number
}

export type LeadPayload = {
  equipment_id?: string | null
  lead_type?: string
  customer_name: string
  phone: string
  email?: string | null
  message?: string | null
}

export type LeadResponse = Required<LeadPayload> & {
  id: string
  created_at: string
}

export type ApiValidationError = {
  detail?: Array<{
    loc: Array<string | number>
    msg: string
    type: string
  }>
}
