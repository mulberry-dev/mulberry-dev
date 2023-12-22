const postcssPresetEnv = require("postcss-preset-env")

const nextConfig = {
  withPostcss: require("next-postcss"),

  postcssLoaderOptions: {
    ident: "postcss",
    plugins: [
      postcssPresetEnv({
        stage: 0,
        features: {
          "logical-properties-and-values": false,
          "prefers-color-scheme-query": false,
          "gap-properties": false,
          "custom-properties": false,
          "dir-pseudo-class": false,
          "focus-within-pseudo-class": false,
          "focus-visible-pseudo-class": false,
          "color-functional-notation": false,
        },
      }),
    ],
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
        port: "",
        pathname: "/**",
      },
      { protocol: "https", hostname: "i.ibb.co", port: "", pathname: "/**" },
      {
        protocol: "https",
        hostname: "thisissanti.dev",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "handlebarsjs.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.pngall.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sass-lang.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.cdnlogo.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.freepnglogos.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d33wubrfki0l68.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nodemailer.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static-00.iconduck.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "samherbert.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig
