import { SITE_NAME, SITE_URL } from "@/data/site"

const Head = () => {
  return (
    <>
      <link
        rel="shortcut icon"
        href="https://cdn-icons-png.flaticon.com/512/7914/7914802.png"
        type="image"
      />
      <title>{`${SITE_NAME} | Web Programmer`}</title>
      <meta
        name="description"
        content="Programmer who loves code and technology, committed to developing specialized and scalable technology in new projects."
      />
      <meta
        name="keywords"
        content="Developer, web, wordpress, app, ecommerce, SEO, ux,ui, css, JavaScript, Santiago, Morera, dev, Full Stack, Node.js, React.js, Next.js, Nest.js, TypeScript"
      />
      <meta name="copyright" content="Mulberry Software" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={SITE_NAME} />
      <meta
        property="og:description"
        content="Full Stack Developer JavaScript/TypeScript"
      />
      <meta property="og:url" content={SITE_URL} />
      <meta
        property="og:image"
        content="https://i.ibb.co/BwtSfMG/Captura-de-pantalla-2023-09-24-161329.png"
      />
    </>
  )
}

export default Head
