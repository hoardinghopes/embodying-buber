"use strict";
require("alpinejs");

const switcher = require("./theme-switcher");
const offline = require("./offline");

window.setUp = function () {
  let links = document.querySelectorAll("a");
  let link = null;

  for (let i = 0; i < links.length; i++) {
    link = links[i];
    /*footnote links live within <sup> elements*/
    if (link.parentNode.nodeName == "SUP") {
      continue;
    }
    /*footnotes (which have a return link) have "footnote-backref" class*/
    if (link.classList.contains("footnote-backref")) {
      continue;
    }
    /*<a href="xxx"><em>link text</em></a> means we have to give the href to the <em> as it will be the event target*/
    link.setAttribute(
      "x-on:click.prevent",
      `$dispatch('flash','${link.href}')`
    );
  }

  switcher();
  offline();

  return { show: false };
};

window.changePage = function (e) {
  setTimeout(() => (location.href = e.detail), 450);
};
