/* eslint-disable func-names */
/* eslint-env browser */

function init() {
  // https://mwichary.medium.com/dark-theme-in-a-day-3518dde2955a
  function changeTheme(theme) {
    const el = document.documentElement;
    el.classList.add("color-theme-in-transition");
    el.setAttribute("data-theme", theme);
    window.localStorage.setItem("site-theme", theme);
    window.setTimeout(function () {
      el.classList.remove("color-theme-in-transition");
    }, 1000);
  }

  // 0. if the theme-switcher element doesn't exist, go no further
  if (!document.getElementById("dark")) {
    return;
  }

  // 1. get the previous value as already stored locally
  const siteTheme = window.localStorage.getItem("site-theme");

  // 2. use it to set the toggle
  if (siteTheme === "dark") {
    document.getElementById("dark").checked = true;
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.getElementById("light").checked = true;
  }

  // 3. well, if we've got this far, we'd better display the toggle
  document.querySelector(".theme-switch").style.display = "block";

  // 4. set up the toggle
  document.body.addEventListener("change", function (e) {
    // just in case something else triggered "change"
    if (e.target.id === "dark" || e.target.id === "light") {
      changeTheme(e.target.id);
    }
  });
}

module.exports = init;
