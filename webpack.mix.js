const mix = require("laravel-mix");
require("laravel-mix-versionhash");
// require("laravel-mix-clean");

mix.disableNotifications();

// mix.clean({
//   dry: false,
//   verbose: true,
//   //   // cleanStaleWebpackAssets: true,
//   cleanOnceBeforeBuildPatterns: ["assets/*"],
// });

mix.setPublicPath("_site");

mix.js("src/client/js/main.js", "_site/assets/main.js");
mix.css("src/client/css/main.css", "_site/assets/styles.css");

if (mix.inProduction()) mix.versionHash({ length: 10 });

