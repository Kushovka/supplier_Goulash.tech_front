import axios, { AxiosError } from 'axios'
import type {
  ApiValidationError,
  EquipmentDetail,
  EquipmentFilters,
  EquipmentListResponse,
  EquipmentQuery,
  LeadPayload,
  LeadResponse,
} from '../types/equipment'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8001',
  headers: {
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
})

const cleanParams = (query: EquipmentQuery) =>
  Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== ''),
  )

export const getEquipment = async (query: EquipmentQuery = {}) => {
  const { data } = await api.get<EquipmentListResponse>('/equipment', {
    params: cleanParams({
      page: 1,
      page_size: 12,
      ...query,
    }),
  })

  return data
}

export const getEquipmentFilters = async () => {
  const { data } = await api.get<EquipmentFilters>('/equipment/filters')

  return data
}

export const getEquipmentDetail = async (slug: string) => {
  const { data } = await api.get<EquipmentDetail>(`/equipment/${encodeURIComponent(slug)}`)

  return data
}

export const createLead = async (payload: LeadPayload) => {
  const { data } = await api.post<LeadResponse>('/leads', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return data
}

export const resolveMediaUrl = (path?: string) => {
  if (!path) {
    return ''
  }

  if (path.startsWith('http')) {
    return path
  }

  return `${api.defaults.baseURL}${path}`
}

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiValidationError | undefined
    const validationMessage = data?.detail?.[0]?.msg

    return validationMessage ?? error.message ?? fallback
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
