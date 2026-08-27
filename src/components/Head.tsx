import { COPYRIGHT_NAME } from "@/data/site"

const Head = () => {
  return (
    <>
      <link
        rel="shortcut icon"
        href="https://cdn-icons-png.flaticon.com/512/7914/7914802.png"
        type="image"
      />
      <meta
        name="keywords"
        content="Developer, web, wordpress, app, ecommerce, SEO, ux,ui, css, JavaScript, Santiago, Morera, dev, Full Stack, Node.js, React.js, Next.js, Nest.js, TypeScript"
      />
      <meta name="copyright" content={COPYRIGHT_NAME} />
      <meta
        property="og:image"
        content="https://i.ibb.co/BwtSfMG/Captura-de-pantalla-2023-09-24-161329.png"
      />
    </>
  )
}

export default Head
