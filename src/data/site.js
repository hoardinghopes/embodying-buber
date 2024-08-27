
const env = require("../data/env");

module.exports = {
  name: "Embodying Buber",
  description: "Helping the body to make sense of Martin Buber",
  domain: "embodying-buber.netlify.app",
  url: env.IS_DEV ? "https://localhost" : "https://embodying-buber.netlify.app",
  buildtime: new Date(),
  theme_color: "#22161A",
  author: {
    name: "James Knight",
    email: "james@jamesknightcoaching.com",
    twitterHandle: "hoardinghopes"
  },
  headerLinks: [
    {
      text: "All",
      url: "/all/",
      external: false
    },
    {
      text: "Contact",
      url: "/contact/",
      external: false
    },
    {
      text: "About",
      url: "/about/",
      external: false
    },
    {
      text: "Buber",
      url: "/about-buber/",
      external: false
    }
  ],
  footerLinks: [
    // {
    //   text: "RSS",
    //   url: "/feed.xml",
    //   external: true
    // },

    // {
    //   text: "Stats",
    //   url: "/stats/",
    //   external: false
    // }
  ],
  showFooterAttribution: false,
  stats: {
    clicky: {
      install: true,
      script: `<script>var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(101301338);</script>
      <script async src='https://static.getclicky.com/js'></script>
      <noscript><img alt='Clicky' width='1' height='1' src='https://in.getclicky.com/101301338ns.gif' style='position:absolute; left: -1000, top: -1000'/></noscript>`
    },
    umami: {
      install: true,
      script: "<!-- umami.io should be here-->"
    }
  }
};
