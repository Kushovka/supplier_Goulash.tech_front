import { useState } from 'react'
import { FaSeedling, FaTractor } from 'react-icons/fa6'
import { resolveMediaUrl } from '../api/equipment'

type EquipmentVisualProps = {
  image?: string
  title: string
  category: string
  className?: string
}

const categoryTone: Record<string, string> = {
  Tractors: 'from-emerald-950 via-emerald-800 to-lime-700',
  Combines: 'from-stone-950 via-red-900 to-amber-700',
  Sprayers: 'from-slate-900 via-emerald-900 to-cyan-800',
  Balers: 'from-stone-900 via-yellow-800 to-lime-800',
}

const EquipmentVisual = ({ image, title, category, className = '' }: EquipmentVisualProps) => {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const src = !failed ? resolveMediaUrl(image) : ''

  if (src) {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-stone-100 ${className}`}>
        {!loaded && <div className="absolute inset-0 animate-pulse bg-stone-200" />}
        <img
          className={`h-full w-full object-cover transition duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 40vw, 100vw"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      </div>
    )
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${
        categoryTone[category] ?? 'from-emerald-950 via-emerald-800 to-lime-700'
      } ${className}`}
      aria-label={title}
      role="img"
    >
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(135deg,rgba(255,255,255,.26)_1px,transparent_1px)] [background-size:24px_24px]" />
      <FaTractor className="relative z-10 text-7xl text-white/85 drop-shadow-lg" />
      <FaSeedling className="absolute bottom-6 right-8 text-4xl text-white/55" />
      <div className="absolute left-5 top-5 rounded-md bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
        {category}
      </div>
    </div>
  )
}

export default EquipmentVisual
