type SectionHeadingProps = {
  eyebrow: string
  title: string
  text?: string
}

const SectionHeading = ({ eyebrow, title, text }: SectionHeadingProps) => (
  <div className="mx-auto max-w-3xl text-center">
    <p className="premium-kicker">{eyebrow}</p>
    <h2 className="mt-3 text-3xl font-extrabold text-stone-950 sm:text-4xl">{title}</h2>
    {text && <p className="mt-4 leading-7 text-stone-600">{text}</p>}
  </div>
)

export default SectionHeading
