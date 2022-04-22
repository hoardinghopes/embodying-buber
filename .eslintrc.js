module.exports = {
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "prettier/prettier": ["error"]
  }
};
