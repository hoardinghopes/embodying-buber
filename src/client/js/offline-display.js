/* eslint no-undef: "error" */
/* eslint-disable no-console */
/* eslint-env browser */

const he = require("he");

function init() {
  return {
    getPosts() {
      fetch("/posts.json")
        .then((response) => response.json())
        .then((response) => {
          this.results = response.posts;
        })
        .catch((err) => console.log(err));
    },
    getPost(input) {
      console.log(input);
      fetch(input)
        .then((response) => response.json())
        .then((response) => {
          this.post = response;
          this.post.content = he.decode(this.post.content);
          this.showPost = true;
          this.showSideBar = false;
        })
        .catch((err) => console.log(err));
    },
    showList() {
      this.showSideBar = true;
      this.showPost = false;
    },
    results: [],
    showPost: false,
    post: {
      title: "",
      content: "",
      published: ""
    },
    showSideBar: false
  };
}
window.init = init;
