import {
  FiAward,
  FiCheckCircle,
  FiCpu,
  FiMapPin,
  FiPhone,
  FiRefreshCw,
  FiTruck,
} from 'react-icons/fi';
import type { ReactNode } from 'react';
import type { Supplier } from '../types/equipment';
import { formatKg, formatPrice } from '../utils/format';

type SupplierCardProps = {
  aiComment: string | null;
  index: number;
  isAnalyzing: boolean;
  isSelected: boolean;
  score: number;
  supplier: Supplier;
  onAnalyze: () => void;
  onToggle: () => void;
};

const SupplierCard = ({
  aiComment,
  index,
  isAnalyzing,
  isSelected,
  score,
  supplier,
  onAnalyze,
  onToggle,
}: SupplierCardProps) => (
  <article className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {index === 0 && (
            <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">
              Рекомендуем первым
            </span>
          )}
          <span className="rounded bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700">
            {supplier.category}
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-bold">{supplier.name}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
          {supplier.notes}
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-2 md:w-56">
        <ScoreBadge value={score} />
        <button
          className={`h-12 rounded-md border px-3 text-sm font-semibold transition ${
            isSelected
              ? 'border-zinc-950 bg-zinc-950 text-white'
              : 'border-zinc-300 bg-white text-zinc-950 hover:border-emerald-700'
          }`}
          onClick={onToggle}
          type="button"
        >
          {isSelected ? 'Убрать' : 'Сравнить'}
        </button>
      </div>
    </div>

    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Fact
        icon={<FiMapPin />}
        label="Регион"
        value={`${supplier.city}, ${supplier.region}`}
      />
      <Fact icon={<FiAward />} label="Мин. заказ" value={formatKg(supplier.minOrderKg)} />
      <Fact
        icon={<FiCheckCircle />}
        label="Цена"
        value={`от ${formatPrice(supplier.priceFromRub)}/кг`}
      />
      <Fact icon={<FiTruck />} label="Доставка" value={supplier.delivery} />
    </div>

    <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="min-w-0">
          {aiComment ||
            'AI-анализ еще не проведен. Нажмите кнопку, чтобы сформировать рекомендацию через Ollama.'}
        </p>
        <button
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-emerald-700 bg-white px-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isAnalyzing}
          onClick={onAnalyze}
          type="button"
        >
          {isAnalyzing ? (
            <FiRefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <FiCpu className="h-4 w-4" />
          )}
          {isAnalyzing ? 'Анализируем' : 'Провести AI-анализ'}
        </button>
      </div>
    </div>

    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
      <span className="inline-flex items-center gap-2">
        <FiPhone className="h-4 w-4" />
        {supplier.phone}
      </span>
      <span>{supplier.website}</span>
      <span>{supplier.certificates ? 'Документы есть' : 'Документы уточнить'}</span>
    </div>
  </article>
);

type ScoreBadgeProps = {
  value: number;
};

const ScoreBadge = ({ value }: ScoreBadgeProps) => (
  <div className="flex h-12 flex-col justify-center rounded-md bg-[#123c2d] px-3 text-white">
    <span className="text-lg font-bold leading-none">{value}/10</span>
    <span className="text-xs text-emerald-100">рейтинг</span>
  </div>
);

type FactProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

const Fact = ({ icon, label, value }: FactProps) => (
  <div className="flex min-h-20 gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3">
    <span className="mt-1 text-emerald-700">{icon}</span>
    <span>
      <span className="block text-xs font-semibold uppercase text-zinc-500">{label}</span>
      <span className="mt-1 block text-sm font-semibold leading-5 text-zinc-900">{value}</span>
    </span>
  </div>
);

export default SupplierCard;
