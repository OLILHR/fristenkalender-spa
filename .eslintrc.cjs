module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"],
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: {
          ts: "@typescript-eslint/parser",
          js: "espree",
          typescript: "@typescript-eslint/parser",
        },
      },
    },
  ],
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error"
  },
}