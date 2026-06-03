import axios from 'axios';
import type {
  SearchFilters,
  SupplierAiResponse,
  SupplierFilterOptions,
  SupplierResult,
} from '../types/equipment';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8001',
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
  timeout: 30000,
});

export const fetchSuppliers = async (filters: SearchFilters) => {
  const response = await api.get<SupplierResult[]>('/suppliers', {
    params: {
      query: filters.query,
      category: filters.category,
      city: filters.city,
      min_volume_kg: filters.minVolumeKg,
      certificates_only: filters.certificatesOnly,
    },
  });

  return response.data;
};

export const fetchSupplierFilters = async () => {
  const response = await api.get<SupplierFilterOptions>('/suppliers/filters');

  return response.data;
};

export const analyzeSupplier = async (supplierId: number, filters: SearchFilters) => {
  const response = await api.post<SupplierAiResponse>(
    `/suppliers/${supplierId}/ai-analysis`,
    {
      city: filters.city,
      minVolumeKg: filters.minVolumeKg,
    },
  );

  return response.data;
};
