const SectionKicker = ({
  kicker,
  title
}: {
  kicker: string
  title: string
}) => (
  <header className="section-kicker">
    <p>{kicker}</p>
    <h2>{title}</h2>
  </header>
)

export default SectionKicker
