const isDev = process.env.APP_ENV === "development";

module.exports = {
  isDev: isDev,
  name: "28 days",
  description: "Part of the 28-day challenge",
  domain: "28-days.netlify.app",
  url: isDev ? "https://localhost" : "https://28-days.netlify.app",
  buildtime: new Date(),
  theme_color: "#22161A",
  author: {
    name: "James Knight",
    email: "james@hoardinghopes.com",
    twitterHandle: "hoardinghopes",
  },
  headerLinks: [
    {
      text: "Blog",
      url: "/blog/",
      external: false,
    },
    {
      text: "Notes",
      url: "/notes/",
      external: false,
    },
    {
      text: "Contact",
      url: "/contact/",
      external: false,
    },
    {
      text: "About",
      url: "/about/",
      external: false,
    },
  ],
  footerLinks: [
    {
      text: "RSS",
      url: "/feed.xml",
      external: true,
    },

    {
      text: "Stats",
      url: "/stats/",
      external: false,
    },
  ],
  showFooterAttribution: false,
  clickystats: {
    install: true,
    script: `<script>var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(101301338);</script>
      <script async src='https://static.getclicky.com/js'></script>
      <noscript><img alt='Clicky' width='1' height='1' src='https://in.getclicky.com/101301338ns.gif' style='position:absolute; left: -1000, top: -1000'/></noscript>`,
  },
};
