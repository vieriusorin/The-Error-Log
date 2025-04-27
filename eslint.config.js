// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";
import prettierConfig from "eslint-plugin-prettier/recommended";
import * as mdx from "eslint-plugin-mdx";

export default tseslint.config(
  // Global ignores
  {
    ignores: ["node_modules/", "dist/"],
  },

  // Base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,

  // Astro files
  {
    files: ["**/*.astro"],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      globals: {
        // Define Astro component script globals if needed
        // Example: node: true, browser: true
      },
      parser: astroPlugin.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
    },
    rules: {
      ...astroPlugin.configs["flat/recommended"].rules,
      // Override/add specific Astro rules here
    },
  },

  // MDX files
  {
    files: ["**/*.mdx"],
    ...mdx.configs.flat,
    rules: {
      ...mdx.configs.flat.rules,
      // Override/add specific MDX rules here
    },
  },

  // TypeScript/JavaScript files (excluding Astro/MDX)
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      // Add other JS/TS specific rules here
    },
  }
);
