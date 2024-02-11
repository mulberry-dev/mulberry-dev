import Script from "next/script"

const GoogleTag = () => (
  <>
    <Script
      async
      src='https://www.googletagmanager.com/gtag/js?id=G-HP85BC1BKY'
    ></Script>
    <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HP85BC1BKY');
      `}
    </script>
  </>
)

export default GoogleTag
