/* eslint no-undef: "error" */
/* eslint-disable no-continue */
/* eslint-env browser */
/* global isDev */

require("alpinejs");
const switcher = require("./theme-switcher");
const offline = require("./save-to-offline");
const previews = require("./link-previews");

function setUp() {
  const links = document.querySelectorAll("a");
  let link = null;

  for (let i = 0; i < links.length; i += 1) {
    link = links[i];
    /* footnote links live within <sup> elements */
    if (link.parentNode.nodeName === "SUP") {
      continue;
    }
    /* footnotes (which have a return link) have "footnote-backref" class */
    if (link.classList.contains("footnote-backref")) {
      continue;
    }
    /* <a href="xxx"><em>link text</em></a> means we have to give the href to the <em> as it will be the event target */
    link.setAttribute(
      "x-on:click.prevent",
      `$dispatch('flash','${link.href}')`
    );
  }

  switcher();
  previews();
  if (!isDev) {
    offline();
  }

  return { show: false };
}
window.setUp = setUp;

function changePage(e) {
  setTimeout(() => {
    window.location.href = e.detail;
  }, 450);
}
window.changePage = changePage;
