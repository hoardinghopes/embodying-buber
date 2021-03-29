const he = require("he");

window.init = function () {
  return {
    getPosts: function () {
      fetch("/posts.json")
        .then((response) => response.json())
        .then((response) => {
          this.results = response.posts;
        })
        .catch((err) => console.log(err));
    },
    getPost: function (input) {
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
    showList: function () {
      this.showSideBar = true;
      this.showPost = false;
    },
    results: [],
    showPost: false,
    post: {
      title: "",
      content: "",
      published: "",
    },
    showSideBar: false,
  };
};
