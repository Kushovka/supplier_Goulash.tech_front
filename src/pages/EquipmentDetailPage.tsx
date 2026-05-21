import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { FaArrowLeft, FaCircleCheck, FaGaugeHigh, FaHorseHead, FaLocationDot } from 'react-icons/fa6'
import { getEquipmentDetail } from '../api/equipment'
import EquipmentVisual from '../components/EquipmentVisual'
import LeadForm from '../components/LeadForm'
import { PageFade, Reveal } from '../components/motion'
import { DetailSkeleton } from '../components/Skeleton'
import type { EquipmentDetail } from '../types/equipment'
import { formatNumber, formatPrice } from '../utils/format'

const EquipmentDetailPage = () => {
  const { slug } = useParams()
  const [item, setItem] = useState<EquipmentDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      return
    }

    getEquipmentDetail(slug)
      .then(setItem)
      .catch(() => setItem(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <DetailSkeleton />
  }

  if (!item) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-stone-950">Machine not found</h1>
        <Link to="/catalog" className="mt-5 inline-flex rounded-md bg-emerald-800 px-5 py-3 font-bold text-white">
          Back to Inventory
        </Link>
      </section>
    )
  }

  return (
    <PageFade>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/catalog" className="inline-flex items-center gap-2 rounded-md bg-white/80 px-3 py-2 text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-stone-200 transition hover:bg-white hover:text-emerald-950">
        <FaArrowLeft /> Back to Inventory
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <Reveal>
        <div>
          <div className="premium-card overflow-hidden">
            <div className="h-[360px] sm:h-[500px]">
              <EquipmentVisual image={item.images[0]} title={item.title} category={item.category} />
            </div>
          </div>

          <div className="premium-card mt-8 p-7">
            <p className="premium-kicker">
              {item.condition} / {item.category}
            </p>
            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h1 className="text-4xl font-extrabold text-stone-950">{item.title}</h1>
                <p className="mt-3 text-lg leading-8 text-stone-600">{item.description}</p>
              </div>
              <p className="shrink-0 rounded-lg bg-emerald-50 px-4 py-3 text-3xl font-extrabold text-emerald-950 ring-1 ring-emerald-100">{formatPrice(item.price)}</p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Spec icon={<FaHorseHead />} label="Power" value={item.power_hp ? `${item.power_hp} hp` : 'N/A'} />
              <Spec icon={<FaGaugeHigh />} label="Hours" value={item.engine_hours ? `${formatNumber(item.engine_hours)} h` : 'N/A'} />
              <Spec icon={<FaLocationDot />} label="Location" value={item.location} />
              <Spec icon={<FaCircleCheck />} label="Year" value={String(item.year)} />
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-extrabold text-stone-950">Key Features</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-md border border-emerald-100 bg-emerald-50/80 px-4 py-3 font-semibold text-stone-800 shadow-sm">
                    <FaCircleCheck className="text-emerald-800" /> {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </Reveal>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <LeadForm equipmentId={item.id} title="Ask About This Machine" />
        </aside>
      </div>
    </section>
    </PageFade>
  )
}

type SpecProps = {
  icon: React.ReactNode
  label: string
  value: string
}

const Spec = ({ icon, label, value }: SpecProps) => (
  <div className="rounded-md border border-stone-200 bg-white/80 p-4 shadow-sm">
    <div className="text-xl text-emerald-800">{icon}</div>
    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
    <p className="mt-1 font-extrabold text-stone-950">{value}</p>
  </div>
)

export default EquipmentDetailPage
