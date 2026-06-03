export type SupplierCategory =
  | 'Мясо'
  | 'Овощи'
  | 'Упаковка'
  | 'Молочка'
  | 'Бакалея';

export type Supplier = {
  id: number;
  name: string;
  category: SupplierCategory;
  city: string;
  region: string;
  minOrderKg: number;
  priceFromRub: number;
  certificates: boolean;
  delivery: 'По городу' | 'Межгород' | 'Самовывоз' | 'По городу и области';
  phone: string;
  website: string;
  notes: string;
};

export type SearchFilters = {
  query: string;
  category: 'Все' | SupplierCategory;
  city: 'Все' | string;
  minVolumeKg: number;
  certificatesOnly: boolean;
};

export type SupplierScore = {
  value: number;
  reasons: string[];
};

export type SupplierResult = {
  supplier: Supplier;
  score: SupplierScore;
  aiComment: string | null;
};

export type SupplierFilterOptions = {
  categories: SupplierCategory[];
  cities: string[];
  volumesKg: number[];
};

export type SupplierAiResponse = {
  supplierId: number;
  aiComment: string;
};
