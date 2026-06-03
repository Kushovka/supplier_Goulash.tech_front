import { useEffect, useMemo, useState } from 'react';
import { FiAlertCircle, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { analyzeSupplier, fetchSupplierFilters, fetchSuppliers } from '../api/suppliers';
import ComparisonModal from '../components/ComparisonModal';
import Metric from '../components/Metric';
import SelectField from '../components/SelectField';
import StatusLine from '../components/StatusLine';
import SupplierCard from '../components/SupplierCard';
import type {
  SearchFilters,
  SupplierFilterOptions,
  SupplierResult,
} from '../types/equipment';

const initialFilters: SearchFilters = {
  query: '',
  category: 'Все',
  city: 'Все',
  minVolumeKg: 0,
  certificatesOnly: false,
};

const initialFilterOptions: SupplierFilterOptions = {
  categories: [],
  cities: [],
  volumesKg: [0, 50, 100, 150, 200],
};

const CatalogPage = () => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [filterOptions, setFilterOptions] =
    useState<SupplierFilterOptions>(initialFilterOptions);
  const [results, setResults] = useState<SupplierResult[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [analyzingIds, setAnalyzingIds] = useState<number[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadFilterOptions = async () => {
      try {
        const options = await fetchSupplierFilters();

        if (isActive) {
          setFilterOptions(options);
        }
      } catch {
        if (isActive) {
          setError('Backend недоступен. Проверьте, что API запущен на порту 8001.');
        }
      }
    };

    void loadFilterOptions();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadSuppliers = async () => {
      setIsLoading(true);
      setError('');
      setAnalyzingIds([]);

      try {
        const apiResults = await fetchSuppliers(filters);

        if (isActive) {
          setResults(apiResults);
        }
      } catch {
        if (isActive) {
          setResults([]);
          setError('Не удалось загрузить поставщиков с backend.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadSuppliers();

    return () => {
      isActive = false;
    };
  }, [filters]);

  const selectedSuppliers = useMemo(
    () =>
      selectedIds
        .map((id) => results.find((result) => result.supplier.id === id))
        .filter((result): result is SupplierResult => Boolean(result)),
    [results, selectedIds],
  );

  const toggleSupplier = (supplierId: number) => {
    setSelectedIds((current) =>
      current.includes(supplierId)
        ? current.filter((id) => id !== supplierId)
        : [...current, supplierId],
    );
  };

  const runAiAnalysis = async (supplierId: number) => {
    setAnalyzingIds((current) => [...current, supplierId]);

    try {
      const response = await analyzeSupplier(supplierId, filters);

      setResults((current) =>
        current.map((result) =>
          result.supplier.id === response.supplierId
            ? { ...result, aiComment: response.aiComment }
            : result,
        ),
      );
    } catch {
      setResults((current) =>
        current.map((result) =>
          result.supplier.id === supplierId
            ? {
                ...result,
                aiComment:
                  'Не удалось провести AI-анализ. Проверьте backend и Ollama.',
              }
            : result,
        ),
      );
    } finally {
      setAnalyzingIds((current) => current.filter((id) => id !== supplierId));
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f7f2] text-zinc-950">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Внутренний сервис закупок
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-normal sm:text-4xl">
                Подбор поставщиков для ресторанов
              </h1>
            </div>
            <div className="grid gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm sm:grid-cols-[1fr_auto]">
              <Metric label="В выдаче" value={results.length.toString()} />
              <button
                className="relative h-12 rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-950 hover:border-emerald-700"
                onClick={() => setIsComparisonOpen(true)}
                type="button"
              >
                Сравнение
                {selectedSuppliers.length > 0 && (
                  <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-700 px-1.5 text-xs font-bold text-white">
                    {selectedSuppliers.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="grid gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
              Что ищем
              <span className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3">
                <FiSearch className="h-4 w-4 text-zinc-500" />
                <input
                  className="h-11 w-full bg-transparent text-zinc-950 outline-none placeholder:text-zinc-400"
                  placeholder="мясо, овощи, упаковка"
                  value={filters.query}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, query: event.target.value }))
                  }
                />
              </span>
            </label>

            <SelectField
              label="Категория"
              value={filters.category}
              options={['Все', ...filterOptions.categories]}
              onChange={(value) =>
                setFilters((current) => ({
                  ...current,
                  category: value as SearchFilters['category'],
                }))
              }
            />

            <SelectField
              label="Город"
              value={filters.city}
              options={['Все', ...filterOptions.cities]}
              onChange={(value) => setFilters((current) => ({ ...current, city: value }))}
            />

            <SelectField
              label="Минимальный объем"
              value={filters.minVolumeKg.toString()}
              options={filterOptions.volumesKg.map((value) => value.toString())}
              onChange={(value) =>
                setFilters((current) => ({ ...current, minVolumeKg: Number(value) }))
              }
              suffix="кг"
              optionLabels={{ '0': 'Все' }}
            />

            <label className="flex min-h-[68px] items-end gap-2 text-sm font-medium text-zinc-700">
              <input
                type="checkbox"
                className="mb-3 h-5 w-5 accent-emerald-700"
                checked={filters.certificatesOnly}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    certificatesOnly: event.target.checked,
                  }))
                }
              />
              <span className="pb-3">Нужны сертификаты</span>
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4">
          {isLoading && (
            <StatusLine icon={<FiRefreshCw className="h-4 w-4 animate-spin" />}>
              Обновляем выдачу поставщиков
            </StatusLine>
          )}

          {error && (
            <StatusLine icon={<FiAlertCircle className="h-4 w-4" />}>{error}</StatusLine>
          )}

          {!isLoading && !error && results.length === 0 && (
            <StatusLine icon={<FiSearch className="h-4 w-4" />}>
              Поставщики по текущим фильтрам не найдены
            </StatusLine>
          )}

          {results.map(({ supplier, score, aiComment }, index) => (
            <SupplierCard
              key={supplier.id}
              aiComment={aiComment}
              index={index}
              isAnalyzing={analyzingIds.includes(supplier.id)}
              isSelected={selectedIds.includes(supplier.id)}
              score={score.value}
              supplier={supplier}
              onAnalyze={() => runAiAnalysis(supplier.id)}
              onToggle={() => toggleSupplier(supplier.id)}
            />
          ))}
        </div>
      </section>

      <ComparisonModal
        isOpen={isComparisonOpen}
        selectedSuppliers={selectedSuppliers}
        onClear={() => setSelectedIds([])}
        onClose={() => setIsComparisonOpen(false)}
      />
    </main>
  );
};

export default CatalogPage;
