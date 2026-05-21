import { Link } from 'react-router'
import { FaGaugeHigh, FaLocationDot, FaRegCalendar } from 'react-icons/fa6'
import type { Equipment } from '../types/equipment'
import { formatNumber, formatPrice } from '../utils/format'
import EquipmentVisual from './EquipmentVisual'
import { motion } from 'framer-motion'

type EquipmentCardProps = {
  item: Equipment
}

const EquipmentCard = ({ item }: EquipmentCardProps) => (
  <motion.article
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    className="premium-card premium-card-hover group flex h-full flex-col overflow-hidden"
  >
    <Link to={`/equipment/${item.slug}`} className="flex h-full flex-col">
    <span className="block aspect-[4/3] overflow-hidden">
      <EquipmentVisual
        image={item.images[0]}
        title={item.title}
        category={item.category}
        className="transition duration-500"
      />
    </span>
    <div className="flex flex-1 flex-col p-6">
      <div className="flex min-h-24 items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
            {item.condition} / {item.category}
          </p>
          <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-snug text-stone-950">{item.title}</h3>
        </div>
        <p className="shrink-0 pt-6 text-right text-lg font-extrabold text-emerald-900">{formatPrice(item.price)}</p>
      </div>
      <p className="mt-5 min-h-12 line-clamp-2 text-sm leading-6 text-stone-600">{item.short_description}</p>
      <div className="mt-5 grid grid-cols-3 gap-3 text-xs font-semibold text-stone-600">
        <span className="flex items-center gap-1.5">
          <FaRegCalendar className="text-emerald-800" /> {item.year}
        </span>
        <span className="flex items-center gap-1.5">
          <FaGaugeHigh className="text-emerald-800" />
          {item.engine_hours ? `${formatNumber(item.engine_hours)} h` : 'N/A'}
        </span>
        <span className="flex items-center gap-1.5">
          <FaLocationDot className="text-emerald-800" /> {item.location.split(',')[0]}
        </span>
      </div>
      <span className="premium-button mt-5 w-full px-4 py-3 text-sm">
        View Equipment
      </span>
    </div>
    </Link>
  </motion.article>
)

export default EquipmentCard
