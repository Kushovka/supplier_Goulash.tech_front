import { FiX } from 'react-icons/fi';
import type { ReactNode } from 'react';
import type { SupplierResult } from '../types/equipment';
import { formatKg, formatPrice } from '../utils/format';

type ComparisonModalProps = {
  isOpen: boolean;
  selectedSuppliers: SupplierResult[];
  onClear: () => void;
  onClose: () => void;
};

const ComparisonModal = ({
  isOpen,
  selectedSuppliers,
  onClear,
  onClose,
}: ComparisonModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
    >
      <div className="w-full max-w-4xl rounded-md border border-zinc-200 bg-white p-4 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="comparison-title" className="text-xl font-bold">
              Сравнение
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Выбрано поставщиков: {selectedSuppliers.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedSuppliers.length > 0 && (
              <button
                className="h-9 rounded-md border border-zinc-200 px-3 text-sm font-semibold text-zinc-600 hover:border-zinc-400"
                onClick={onClear}
                type="button"
              >
                Очистить
              </button>
            )}
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:border-zinc-400"
              onClick={onClose}
              title="Закрыть сравнение"
              type="button"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>

        {selectedSuppliers.length === 0 ? (
          <p className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
            Выберите поставщиков в карточках, чтобы сравнить цену, минимальный
            заказ, документы, доставку и рейтинг.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-zinc-200 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="py-2 pr-3">Название</th>
                  <th className="py-2 pr-3">Город</th>
                  <th className="py-2 pr-3">Цена</th>
                  <th className="py-2 pr-3">Мин.</th>
                  <th className="py-2 pr-3">Док.</th>
                  <th className="py-2 pr-3">Доставка</th>
                  <th className="py-2 pr-3">Рейтинг</th>
                </tr>
              </thead>
              <tbody>
                {selectedSuppliers.map(({ supplier, score }) => (
                  <tr key={supplier.id} className="border-b border-zinc-100">
                    <td className="py-3 pr-3 font-semibold">{supplier.name}</td>
                    <td className="py-3 pr-3 text-zinc-600">{supplier.city}</td>
                    <td className="py-3 pr-3">
                      <ComparePill tone={supplier.priceFromRub <= 120 ? 'good' : 'neutral'}>
                        {formatPrice(supplier.priceFromRub)}
                      </ComparePill>
                    </td>
                    <td className="py-3 pr-3">
                      <ComparePill tone={supplier.minOrderKg <= 100 ? 'good' : 'bad'}>
                        {formatKg(supplier.minOrderKg)}
                      </ComparePill>
                    </td>
                    <td className="py-3 pr-3">
                      <ComparePill tone={supplier.certificates ? 'good' : 'bad'}>
                        {supplier.certificates ? 'Есть' : 'Нет'}
                      </ComparePill>
                    </td>
                    <td className="py-3 pr-3">
                      <ComparePill tone={supplier.delivery === 'Самовывоз' ? 'bad' : 'good'}>
                        {supplier.delivery}
                      </ComparePill>
                    </td>
                    <td className="py-3 pr-3">
                      <ComparePill tone={score.value >= 8 ? 'good' : score.value >= 6 ? 'neutral' : 'bad'}>
                        {score.value}/10
                      </ComparePill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

type ComparePillProps = {
  children: ReactNode;
  tone: 'good' | 'neutral' | 'bad';
};

const comparePillStyles: Record<ComparePillProps['tone'], string> = {
  good: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  neutral: 'border-amber-200 bg-amber-50 text-amber-800',
  bad: 'border-red-200 bg-red-50 text-red-800',
};

const ComparePill = ({ children, tone }: ComparePillProps) => (
  <span
    className={`inline-flex min-h-7 items-center rounded-md border px-2 py-1 text-xs font-semibold leading-4 ${comparePillStyles[tone]}`}
  >
    {children}
  </span>
);

export default ComparisonModal;
