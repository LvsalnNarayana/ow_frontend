import perfectionist from "eslint-plugin-perfectionist";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";
import js from "@eslint/js";
import path from "path";

export default tseslint.config(
  // perfectionist.configs["recommended-line-length"],
  { ignores: ["dist"] },
  {
    rules: {
      ...reactHooks.configs.recommended.rules,

      //Perfectionist Lint
      "perfectionist/sort-objects": [
        "error",
        {
          customGroups: {
            id: "id",
          },
          partitionByComment: "^Part:.*",
          groups: ["id", "unknown"],
          type: "line-length",
          order: "asc",
        },
      ],
      "perfectionist/sort-named-imports": [
        "warn",
        {
          type: "line-length",
          order: "asc",
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          order: "asc",
          type: "line-length",
          newlinesBetween: 2,
          fallbackSort: { type: "unsorted" },
          ignoreCase: true,
          specialCharacters: "keep",
          partitionByComment: false,
          partitionByNewLine: false,
          // maxLineLength: null,
          groups: [
            { commentAbove: "Built-in" },
            "builtin",
            { commentAbove: "External" },
            "external",
            { commentAbove: "MUI" },
            "mui",
            { commentAbove: "Shared" },
            "shared",
            { commentAbove: "Pages" },
            "pages",
            { commentAbove: "Context" },
            "context",
            { commentAbove: "Internal" },
            "internal",
            { commentAbove: "Parent, Sibling, Index" },
            ["parent", "sibling", "index"],
          ],
          customGroups: [
            {
              groupName: "mui",
              elementNamePattern: ["^@mui", "^@emotion"],
            },
            {
              groupName: "pages",
              elementNamePattern: "^\\./src/pages/.+",
            },
            {
              groupName: "shared",
              elementNamePattern: "^\\.{1,2}(/\\.{2})*/shared/.+",
            },
            {
              groupName: "context",
              elementNamePattern: "^\\.{1,2}(/\\.{2})*/context/.+",
            },
          ],
          internalPattern: ["^~/.+", "^@/.+"],
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
    languageOptions: {
      parserOptions: {
        project: path.resolve("./tsconfig.eslint.json"), // 👈 add this
        tsconfigRootDir: import.meta.dirname, // 👈 makes relative paths work
      },
      globals: globals.browser,
      ecmaVersion: 2020,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin, // ✅ correct way
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
      perfectionist,
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["src/**/*.ts", "src/**/*.tsx"],
  },
  {
    files: ["src/**/*.tsx"],
    rules: {
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "const",
        },
        {
          blankLine: "always",
          prev: "*",
          next: "function",
        },
      ],
    },
  }
);
