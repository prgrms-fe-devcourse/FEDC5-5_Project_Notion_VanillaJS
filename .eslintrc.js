module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'prettier'],
  rules: {
    'max-depth': ['error', 2],
    'max-lines-per-function': ['error', 500],
    'operator-linebreak': ['error', 'before'],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'import/extensions': ['error', 'ignorePackages'],
    'no-param-reassign': ['error', { props: false }], // 속성 재할당을 제외한 변수 재할당 제한
    'no-alert': 'off',
    'consistent-return': 'off', // 일관된 타입을 반환하지 않아도 되도록 함
    'no-console': 'off',
  },
};
