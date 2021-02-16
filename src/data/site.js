module.exports = {
  name: "28 days",
  description: "Part of the 28-day challenge",
  url: "https://28-days.netlify.app",
  buildtime: new Date(),
  author: {
    name: "James Knight",
    email: "james@hoardinghopes.com",
    twitterHandle: "hoardinghopes"
  },
  defaultSocialImage: "/images/default-social-image.png",
  headerLinks: [
    {
      text: "",
      url: "",
      external: false
    }
  ],

  footerLinks: [
    {
      text: "RSS",
      url: "/feed.xml",
      external: true
    }
  ],
  showFooterAttribution: false,
  clickystats: {
    install: true,
    script: `<script>var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(101301338);</script>
      <script async src='//static.getclicky.com/js'></script>
      <noscript><img alt='Clicky' width='1' height='1' src='//in.getclicky.com/101301338ns.gif' style='position:absolute; left: -1000, top: -1000'/></noscript>`
  }
};
