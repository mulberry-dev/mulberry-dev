// components/GoogleTag.js
import Head from "next/head"
import Script from "next/script"

const GoogleTag = () => (
  <Head>
    {/* Google tag (gtag.js) */}
    <script
      async
      src='https://www.googletagmanager.com/gtag/js?id=G-HP85BC1BKY'
    ></script>
    <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HP85BC1BKY');
      `}
    </script>
  </Head>
)

export default GoogleTag
