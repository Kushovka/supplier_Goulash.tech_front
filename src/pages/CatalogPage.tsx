import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaFilter, FaRotateLeft } from 'react-icons/fa6'
import { getApiErrorMessage, getEquipment, getEquipmentFilters } from '../api/equipment'
import EquipmentCard from '../components/EquipmentCard'
import { PageFade, Reveal } from '../components/motion'
import { EquipmentCardSkeleton } from '../components/Skeleton'
import type { Equipment, EquipmentFilters, EquipmentQuery } from '../types/equipment'
import { formatPrice } from '../utils/format'

type CatalogForm = {
  category: string
  brand: string
  year: string
  condition: string
  price_min: string
  price_max: string
}

const emptyQuery: CatalogForm = {
  category: '',
  brand: '',
  year: '',
  condition: '',
  price_min: '',
  price_max: '',
}

const pageSize = 12

const CatalogPage = () => {
  const [items, setItems] = useState<Equipment[]>([])
  const [filters, setFilters] = useState<EquipmentFilters | null>(null)
  const [query, setQuery] = useState<CatalogForm>(emptyQuery)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const catalogTopRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    getEquipmentFilters().then(setFilters).catch(() => setFilters(null))
  }, [])

  useEffect(() => {
    const params = toApiQuery(query, page)

    getEquipment(params)
      .then((data) => {
        setItems(data.items)
        setTotal(data.total)
        setError(null)
      })
      .catch((requestError: unknown) => {
        setItems([])
        setTotal(0)
        setError(getApiErrorMessage(requestError, 'Could not load equipment from backend.'))
      })
      .finally(() => setLoading(false))
  }, [page, query])

  const activeCount = useMemo(
    () => Object.values(query).filter((value) => value !== undefined && value !== '').length,
    [query],
  )

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const update = (field: keyof CatalogForm) => (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setLoading(true)
    setPage(1)
    setQuery((current) => ({ ...current, [field]: event.target.value }))
  }

  const scrollToCatalogTop = () => {
    catalogTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageFade>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="premium-shell rounded-xl p-7">
      <div className="flex flex-col justify-between gap-5 border-b border-stone-200/80 pb-7 md:flex-row md:items-end">
        <div>
          <p className="premium-kicker">Equipment Inventory</p>
          <h1 className="mt-3 text-4xl font-extrabold text-stone-950">Farm machinery catalog</h1>
          <p className="mt-3 max-w-2xl leading-7 text-stone-600">
            Filter by machine type, brand, year, condition, and price range. Every listing is wired to the live backend inventory.
          </p>
        </div>
        <div className="rounded-md border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-stone-700 shadow-sm">
          {total} machines found
        </div>
      </div>

      <div ref={catalogTopRef} className="mt-8 grid scroll-mt-28 gap-7 lg:grid-cols-[320px_1fr]">
        <Reveal>
        <aside className="premium-card h-fit p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-stone-950">
              <FaFilter className="text-emerald-800" /> Filters
            </h2>
            {activeCount > 0 && (
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-50"
                onClick={() => {
                  setLoading(true)
                  setPage(1)
                  setQuery(emptyQuery)
                }}
              >
                <FaRotateLeft /> Reset
              </button>
            )}
          </div>

          <div className="mt-5 grid gap-4">
            <FilterSelect label="Category" value={query.category} onChange={update('category')} options={filters?.categories ?? []} />
            <FilterSelect label="Brand" value={query.brand} onChange={update('brand')} options={filters?.brands ?? []} />
            <FilterSelect label="Year" value={query.year} onChange={update('year')} options={(filters?.years ?? []).map(String)} />
            <FilterSelect label="Condition" value={query.condition} onChange={update('condition')} options={filters?.conditions ?? []} />
            <label className="block text-sm font-bold text-stone-700">
              Min Price
              <input
                type="number"
                min="0"
                value={query.price_min}
                onChange={update('price_min')}
                placeholder={filters?.price_min ? formatPrice(filters.price_min) : '$0'}
                className="premium-input"
              />
            </label>
            <label className="block text-sm font-bold text-stone-700">
              Max Price
              <input
                type="number"
                min="0"
                value={query.price_max}
                onChange={update('price_max')}
                placeholder={filters?.price_max ? formatPrice(filters.price_max) : '$500,000'}
                className="premium-input"
              />
            </label>
          </div>
        </aside>
        </Reveal>

        <div>
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <EquipmentCardSkeleton key={index} />
              ))}
            </div>
          )}
          {!loading && error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-5 font-bold text-red-800 shadow-sm">
              {error}
            </div>
          )}
          {!loading && items.length === 0 && (
            <div className="premium-card p-8 text-center">
              <h2 className="text-2xl font-extrabold text-stone-950">No machines found</h2>
              <p className="mt-2 text-stone-600">Try another category, brand, or price range.</p>
            </div>
          )}
          {!loading && (
            <motion.div
              className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {items.map((item) => (
                <EquipmentCard key={item.id} item={item} />
              ))}
            </motion.div>
          )}
          {!loading && totalPages > 1 && (
            <div className="premium-card mt-8 flex flex-col items-center justify-between gap-4 p-4 sm:flex-row">
              <p className="text-sm font-bold text-stone-600">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => {
                    setLoading(true)
                    scrollToCatalogTop()
                    setPage((current) => Math.max(1, current - 1))
                  }}
                >
                  <FaChevronLeft /> Previous
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => {
                    setLoading(true)
                    scrollToCatalogTop()
                    setPage((current) => Math.min(totalPages, current + 1))
                  }}
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
    </PageFade>
  )
}

type FilterSelectProps = {
  label: string
  value?: string
  options: string[]
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const FilterSelect = ({ label, value, options, onChange }: FilterSelectProps) => (
  <label className="block text-sm font-bold text-stone-700">
    {label}
    <select
      value={value}
      onChange={onChange}
      className="premium-input bg-white"
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
)

export default CatalogPage

const toApiQuery = (query: CatalogForm, page: number): EquipmentQuery => ({
  page,
  page_size: pageSize,
  category: query.category || undefined,
  brand: query.brand || undefined,
  year: query.year ? Number(query.year) : undefined,
  condition: query.condition || undefined,
  price_min: query.price_min ? Number(query.price_min) : undefined,
  price_max: query.price_max ? Number(query.price_max) : undefined,
})
