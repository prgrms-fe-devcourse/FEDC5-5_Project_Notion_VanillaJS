module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["airbnb-base", "prettier"],
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": ["off"],
    "class-methods-use-this": "warn",
    "no-param-reassign": ["error", { props: false }],
    "no-underscore-dangle": "allow"
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  }
}
