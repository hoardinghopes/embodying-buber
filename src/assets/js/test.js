const he = require("he");

window.init = function () {
  return {
    getPosts: function () {
      fetch("/posts.json")
        .then((response) => response.json())
        .then((response) => {
          console.log(response.posts[0]);
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
        })
        .catch((err) => console.log(err));
    },
    results: [],
    showPost: false,
    post: null,
  };
};
