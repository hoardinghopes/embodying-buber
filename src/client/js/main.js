/* eslint no-undef: "error" */
/* eslint-disable no-continue */
/* eslint-env browser */

import Alpine from "alpinejs";
window.Alpine = Alpine;

import "./form"

window.setUp = () => {
  return {
    darkMode: false,
    init() {
      if (window.localStorage.getItem("site-theme") === "dark") {
        this.darkMode = true;
      }
      this.$refs.switch.classList.toggle("hidden");
    },

    toggle() {
      this.darkMode = !this.darkMode;
      window.localStorage.setItem("site-theme", this.darkMode ? 'dark' : 'light');
    }
  }
};

Alpine.start();
