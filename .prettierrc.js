module.exports = {
  trailingComma: "none",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  overrides: [
    {
      files: "*.css",
      options: {
        parser: "css"
      }
    },
    {
      files: "pages/**/*.md",
      options: {
        parser: "markdown"
      }
    },
    {
      files: "*.js",
      options: {
        parser: "babel"
      }
    }
  ]
};
