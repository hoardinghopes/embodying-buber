---
date: 2021-08-10
title: Content Security Policy
tags: [content security policy, csp, js, css]
status: seedling
---

I got here from [there](https://sia.codes/posts/render-blocking-resources/)

I was prompted to run our site against [WebPageTest](https://www.webpagetest.org) today, to see how well it performed. The results were pleasing __and__ there was still room for improvement, so I set to work.

| Security Score | First Byte Time | Keep-alive enabled | compress transfer | compress images | Cache static content |
| F | A | A | A | B | F |

```
<IfModule mod_headers.c>
  Header set X-XSS-Protection "1; mode=block"
  Header always append X-Frame-Options SAMEORIGIN
  Header set X-Content-Type-Options nosniff
  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"
  Header set Content-Security-Policy: "default-src 'self' *.freetobook.com *.cookiebot.com  *.googletagmanager.com *.google-analytics.com *.youtube.com *.ytimg.com hooks.zapier.com 'unsafe-inline' 'unsafe-eval'; img-src 'self' static.freetobook.com data:; font-src 'self' data:; "


# One year for image and video files
    <filesMatch ".(flv|gif|ico|jpg|jpeg|mp4|mpeg|png|svg|swf|webp|avif|webmanifest)$">
        Header set Cache-Control "max-age=31536000, public"
    </filesMatch>

    # One month for JavaScript and PDF files
    <filesMatch ".(js|pdf)$">
        Header set Cache-Control "max-age=2592000, public"
    </filesMatch>

    # One week for CSS files
    <filesMatch ".(css)$">
        Header set Cache-Control "max-age=604800, public"
    </filesMatch>
</IfModule>
```

| A+ | A | A | A | A | D |

The _cache static content_ score of _D_ is frustrating and something I'll just have to live with. The offending assets are not served from my server and, because they come from third-party systems, need to do their own tracking.

## Content Security Policy
My site is served through Litespeed, which takes in .htaccess instructions just like Apache's httpd server.

The site has HTML, CSS, Javascript from its own domain. It also links to other domains which want to ```eval()``` their scripts, import fonts and images. There is a form that posts to a different domain. There are widgets that create iframes.

#### default-src
The first thing I learned: there's a fall-back setting, so if I don't explicitly declare a particular type of setting, the policy will follow the ```default-src``` directive.

I ended up with the following:
```
default-src 'self' *.freetobook.com *.cookiebot.com  *.googletagmanager.com *.google-analytics.com *.youtube.com *.ytimg.com hooks.zapier.com 'unsafe-inline' 'unsafe-eval';
```

- `self` allows content from this domain, i.e. I can link to my own images and scripts
- `unsafe-inline` allows code in script tags, rather than just in linked scripts
- `unsafe-eval` allows unsafe javascript call such as `eval()`

### Fetch directives
_Fetch directives_ control the locations from which resources may be loaded. There are plenty of specific directives. `default-src` is the fallback for all of them.

I ended up using `img-src` and `font-src` because they had limited requirements. I left everything under `default-src` so I wasn't having to write domains out repeatedly under different directives.

To be clear, I wanted to control:
- images
- styles
- scripts
- iframes
- fonts

The functionality on the site comes from:
- `achaneich.co.uk` - my code
- `cookiebot.com` - which produces my cookie consent and cookie report functions
- `freetobook.com` - which provides a booking widget
- `hooks.zapier.com` - is where the contact form posts to
- there are several videos on the site, all embedded from `youtube.com` (which requires `ytimg.com`)
- there should be analytics on the site (`google-analytics.com` etc.)

Freetobook and cookiebot provide styles, scripts, images, iframes, even fonts, so it seems best to lump them under `default-src` rather than write out domains multiple times

I wanted to get more specific about the form: `form-action hooks.zapier.com` but that didn't appear to work happily, whereas it does when the domain is added to `default-src`


