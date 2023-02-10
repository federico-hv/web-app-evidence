module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
    "unused-imports"
  ],
  "rules": {
    "react/react-in-jsx-scope": 0,
    "unused-imports/no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "^_" }],
    "unused-imports/no-unused-imports": 1
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    },
    "react": {
      "version": "detect",
    },
  }
};