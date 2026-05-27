import js from "@eslint/js";
import globals from "globals";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";

import tseslint from "typescript-eslint";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    plugins: {
      react,
      "react-hooks": reactHooks,
      prettier,
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
    },

    settings: {
      react: {
        version: "detect",
      },

      typescript: {
        project: "./tsconfig.json",
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,

        page: "readonly",
        document: "readonly",
        context: "readonly",
        JSX: "readonly",
        APP_ENV: "readonly",
      },
    },
  },

  // ===== TypeScript override =====
  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },

    rules: {
      "react/prop-types": "off",

      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off",

      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-unused-expressions": "off",

      "import/no-unresolved": "error",
    },
  },
]);
