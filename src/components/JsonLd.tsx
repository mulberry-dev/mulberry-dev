const JsonLd = ({ data }: { data: object | object[] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

export default JsonLd
