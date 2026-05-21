import { FaCircleCheck, FaEnvelope, FaLocationDot, FaPhoneVolume, FaTruckFast, FaWrench } from 'react-icons/fa6'
import LeadForm from '../components/LeadForm'
import { PageFade, Reveal } from '../components/motion'
import SectionHeading from '../components/SectionHeading'

type InfoPageProps = {
  variant: 'service' | 'delivery' | 'warranty' | 'contacts'
}

const content = {
  service: {
    eyebrow: 'Service Department',
    title: 'Service support for seasonal readiness',
    text: 'Preventive maintenance, diagnostics, inspections, and repair coordination for tractors, combines, sprayers, and hay equipment.',
    icon: FaWrench,
    points: ['Pre-season inspections', 'Hydraulic and drivetrain diagnostics', 'Wear part checks', 'Field-readiness reports'],
  },
  delivery: {
    eyebrow: 'Delivery',
    title: 'Transport planning for agricultural equipment',
    text: 'We coordinate regional and long-haul delivery with realistic timing, route planning, and equipment prep before loading.',
    icon: FaTruckFast,
    points: ['Oversize load coordination', 'Dealer pickup scheduling', 'Delivery status updates', 'Machine handoff checklist'],
  },
  warranty: {
    eyebrow: 'Warranty',
    title: 'Clear coverage information before purchase',
    text: 'Listings are inspected before sale, and our team explains available coverage, service records, and post-sale support options.',
    icon: FaCircleCheck,
    points: ['Inspection disclosure', 'Coverage guidance', 'Service history review', 'Support after delivery'],
  },
  contacts: {
    eyebrow: 'Contact',
    title: 'Speak with the equipment team',
    text: 'Reach sales, service, or delivery coordination. Send a request and we will route it to the right department.',
    icon: FaPhoneVolume,
    points: ['Sales quotes', 'Trade-in questions', 'Service scheduling', 'Delivery estimates'],
  },
}

const InfoPage = ({ variant }: InfoPageProps) => {
  const data = content[variant]
  const Icon = data.icon

  return (
    <PageFade>
      <section className="border-b border-stone-200/80 bg-white/75 backdrop-blur">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
          <div>
            <p className="premium-kicker">{data.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-extrabold text-stone-950 sm:text-5xl">{data.title}</h1>
            <p className="mt-5 text-lg leading-8 text-stone-600">{data.text}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {data.points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-md border border-emerald-100 bg-emerald-50/80 px-4 py-3 font-semibold text-stone-800 shadow-sm">
                  <FaCircleCheck className="text-emerald-800" /> {point}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-xl border border-emerald-900/40 bg-gradient-to-br from-emerald-950 via-emerald-900 to-lime-700 p-8 text-white shadow-[0_24px_70px_rgba(6,78,59,0.18)]">
            <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(135deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:28px_28px]" />
            <Icon className="relative z-10 text-8xl drop-shadow-lg" />
            <div className="relative z-10 mt-20 max-w-md">
              <p className="text-sm font-semibold uppercase tracking-wide text-lime-100">AgroPrime Process</p>
              <p className="mt-2 text-3xl font-extrabold">Practical support from quote to field.</p>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dealer Support"
          title="Built for working farms"
          text="Every request is routed through one lead workflow so sales, service, delivery, and warranty questions can be handled consistently."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            <ContactBlock icon={<FaPhoneVolume />} title="Phone" text="(555) 019-8400" />
            <ContactBlock icon={<FaEnvelope />} title="Email" text="sales@fieldworks-agro.example" />
            <ContactBlock icon={<FaLocationDot />} title="Location" text="1280 Harvest Line, Grand Island, NE" />
          </div>
          <LeadForm leadType={variant === 'contacts' ? 'contact' : variant} title="Send a Request" />
        </div>
      </section>
      </Reveal>
    </PageFade>
  )
}

type ContactBlockProps = {
  icon: React.ReactNode
  title: string
  text: string
}

const ContactBlock = ({ icon, title, text }: ContactBlockProps) => (
  <div className="premium-card premium-card-hover p-6">
    <div className="text-2xl text-emerald-800">{icon}</div>
    <h2 className="mt-4 text-xl font-extrabold text-stone-950">{title}</h2>
    <p className="mt-2 leading-7 text-stone-600">{text}</p>
  </div>
)

export default InfoPage
