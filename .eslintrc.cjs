module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:prettier/recommended",
        "prettier",
    ],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: "module",
    },
    plugins: ["import", "unused-imports", "simple-import-sort", "prettier"],
    rules: {
        "import/no-cycle": "error",
        "import/no-unresolved": "error",
        "import/default": "error",
        "import/namespace": "error",
        "import/first": "error",
        "import/newline-after-import": "error", // 최종 import와 본문 사이의 공백 추가
        "unused-imports/no-unused-imports": "error", // 미사용 import 자동 제거
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
    ignorePatterns: ["node_modules/**", "dist/**", "src/index.js"],
};
