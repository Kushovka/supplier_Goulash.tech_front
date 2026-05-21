import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircleCheck,
  FaShieldHalved,
  FaTractor,
  FaTruckFast,
} from 'react-icons/fa6'
import { getEquipment } from '../api/equipment'
import EquipmentVisual from '../components/EquipmentVisual'
import { PageFade, Reveal } from '../components/motion'
import SectionHeading from '../components/SectionHeading'
import { CarouselSkeleton } from '../components/Skeleton'
import type { Equipment } from '../types/equipment'
import { formatNumber, formatPrice } from '../utils/format'

const HomePage = () => {
  const [featured, setFeatured] = useState<Equipment[]>([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [loadingFeatured, setLoadingFeatured] = useState(true)

  useEffect(() => {
    getEquipment({ page: 1, page_size: 12 })
      .then((data) => setFeatured(data.items))
      .catch(() => setFeatured([]))
      .finally(() => setLoadingFeatured(false))
  }, [])

  const maxSlide = Math.max(0, featured.length - 1)

  const goToPrevious = () => {
    setActiveSlide((current) => (current <= 0 ? maxSlide : current - 1))
  }

  const goToNext = () => {
    setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1))
  }

  return (
    <PageFade>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#071711_0%,#173c2b_48%,#1c1917_100%)]">
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_20%_20%,rgba(190,242,100,.18),transparent_26rem),radial-gradient(circle_at_80%_40%,rgba(255,255,255,.10),transparent_24rem)]" />
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(135deg,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[length:34px_34px] opacity-40 lg:block" />
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_430px] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-lime-300">AgroPrime Equipment Used Inventory</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
              Dependable farm machinery for hard-working operations.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200/95">
              Browse inspected tractors, combines, sprayers, and hay equipment with clear pricing, dealer support, and delivery coordination.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/catalog"
                className="premium-button-gold gap-2 px-7 py-4"
              >
                Shop Inventory <FaArrowRight />
              </Link>
              <Link
                to="/contacts"
                className="inline-flex items-center justify-center rounded-md border border-white/35 bg-white/8 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/14"
              >
                Call Sales
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/10 p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-lime-200">Private Dealer Desk</p>
            <div className="mt-6 grid gap-4">
              {['Inspected listings', 'Transparent specifications', 'Trade-in conversations', 'Delivery planning'].map((item) => (
                <div key={item} className="flex items-center gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <FaCircleCheck className="text-lime-300" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reveal>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['Our Inventory', 'Explore pre-owned and demo agricultural equipment selected for real field work.', FaTractor, '/catalog'],
            ['Delivery', 'Coordinate regional or long-haul equipment transport with a clear handoff plan.', FaTruckFast, '/delivery'],
            ['Warranty', 'Review inspection notes, coverage options, and dealer support before purchase.', FaShieldHalved, '/warranty'],
          ].map(([title, text, Icon, to]) => (
            <Link
              key={title as string}
              to={to as string}
              className="premium-card premium-card-hover group overflow-hidden"
            >
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-800 to-lime-700">
                <Icon className="text-6xl text-white/90" />
              </div>
              <div className="p-7">
                <h2 className="text-2xl font-extrabold text-stone-950">{title as string}</h2>
                <p className="mt-3 min-h-20 leading-7 text-stone-600">{text as string}</p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-md bg-emerald-950 px-4 py-2 text-sm font-extrabold text-white transition group-hover:bg-emerald-800">
                  Go <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="bg-white/75 py-16 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Featured Inventory"
            title="Equipment available for review"
            text="Selected listings from the live inventory, ready for specification review, quote requests, and delivery planning."
          />
          {loadingFeatured ? (
            <CarouselSkeleton />
          ) : (
            <EquipmentCarousel
              activeSlide={activeSlide}
              items={featured}
              onNext={goToNext}
              onPrevious={goToPrevious}
              onSelect={setActiveSlide}
            />
          )}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="border-t border-stone-200/80 bg-stone-50/75 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="premium-card p-8">
            <h2 className="text-3xl font-extrabold text-stone-950">AgroPrime Equipment Dealer</h2>
            <div className="mt-5 space-y-4 leading-8 text-stone-700">
              <p>
                Looking for a reliable source for pre-owned agricultural equipment? AgroPrime Equipment focuses on practical machines for farms that need dependable horsepower, clear information, and responsive dealer support.
              </p>
              <p>
                Whether you are reviewing a row-crop tractor, a harvest-ready combine, a sprayer, or hay equipment, each listing is organized around the details that matter: condition, year, hours, horsepower, location, price, and key features.
              </p>
              <p>
                Our team can help with service questions, delivery coordination, warranty conversations, and next-step planning before you commit to a machine.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-900 bg-gradient-to-br from-emerald-950 to-stone-950 p-8 text-white shadow-[0_22px_70px_rgba(6,78,59,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-wide text-lime-300">Call Us</p>
            <p className="mt-3 text-3xl font-extrabold">(555) 019-8400</p>
            <p className="mt-4 leading-7 text-stone-200">
              Speak with sales about equipment availability, trade-ins, delivery windows, and inspection details.
            </p>
            <Link
              to="/contacts"
              className="premium-button-gold mt-6 gap-2"
            >
              Contact Us <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
      </Reveal>
    </PageFade>
  )
}

type EquipmentCarouselProps = {
  activeSlide: number
  items: Equipment[]
  onNext: () => void
  onPrevious: () => void
  onSelect: (index: number) => void
}

const EquipmentCarousel = ({ activeSlide, items, onNext, onPrevious, onSelect }: EquipmentCarouselProps) => {
  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-md border border-stone-200 bg-stone-50 p-8 text-center font-semibold text-stone-600">
        Featured equipment is not available right now.
      </div>
    )
  }

  return (
    <div className="mt-10">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-stone-600">
          Showing {activeSlide + 1} of {items.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPrevious}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-900 shadow-sm transition hover:bg-stone-100"
            aria-label="Previous equipment"
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-950 text-white shadow-sm transition hover:bg-emerald-800"
            aria-label="Next equipment"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md">
        <div
          className="flex items-stretch transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="flex min-w-full px-0 sm:px-1">
              <FeaturedListing item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(index)}
            className={`h-2.5 rounded-full transition ${
              activeSlide === index ? 'w-8 bg-emerald-900' : 'w-2.5 bg-stone-300 hover:bg-stone-400'
            }`}
            aria-label={`Show ${item.title}`}
          />
        ))}
      </div>
    </div>
  )
}

const FeaturedListing = ({ item }: { item: Equipment }) => (
  <article className="premium-card grid h-auto max-h-[650px] min-h-[320px] w-full overflow-hidden md:h-[360px] md:grid-cols-[minmax(400px,1.05fr)_minmax(380px,.95fr)]">
    <Link to={`/equipment/${item.slug}`} className="block h-56 overflow-hidden md:h-full">
      <EquipmentVisual
        image={item.images[0]}
        title={item.title}
        category={item.category}
        className="object-cover"
      />
    </Link>
    <div className="flex min-h-0 flex-col justify-center overflow-hidden p-5 sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
        {item.condition} / {item.category}
      </p>
      <h3 className="mt-2 line-clamp-2 text-2xl font-extrabold text-stone-950">{item.title}</h3>
      <div className="mt-4 grid gap-2 text-sm font-semibold text-stone-700 sm:grid-cols-2">
        <span>Year: {item.year}</span>
        <span>{item.engine_hours ? `Hours: ${formatNumber(item.engine_hours)}` : 'Hours: N/A'}</span>
        <span>{item.power_hp ? `Power: ${item.power_hp} hp` : `Brand: ${item.brand}`}</span>
        <span>{item.location}</span>
      </div>
      <p className="mt-4 line-clamp-2 leading-6 text-stone-600">{item.short_description}</p>
      <p className="mt-4 text-2xl font-extrabold text-emerald-900">Only {formatPrice(item.price)}</p>
      <Link
        to={`/equipment/${item.slug}`}
        className="premium-button mt-5 w-full px-5 py-2.5 text-sm sm:w-fit"
      >
        More Info
      </Link>
    </div>
  </article>
)

export default HomePage
