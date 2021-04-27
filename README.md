# 28-days

28-days is a month-long writing project I took part in (via https://nesslabs.com).

The code project behind the writing project is becoming an experimental bed for new technologies (well, new to me).

The project started life as a clone of [Elventy Duo](https://eleventyduo.netlify.app).


## To-dos
- create /offline/ page from what's in the cache?
- ~~implement offline site via serviceworker~~
- ~~update serviceworker via build pipe so that it references the bundled css and js files (i.e. /assets/main.css doesn't exist on live site)~~
- ~~create stats graph as part of site build, to deliver statically~~
- PWA?
- update 404 to email me with news of 404 pages that folk are seeking


## License

This project is licensed under the MIT License.

Isn't Jamstack beautiful?

## Technologies
- 11ty static site generator
- netlify server
- github SCM
- webpack asset-bundler
- node
- pnpm

## TODOs
- get Obsidian image assets into the right public directory (/assets/images/? /static/images/? /images/?)
- clean up `bundledcss` and `bundledjs` shortcodes for head and body