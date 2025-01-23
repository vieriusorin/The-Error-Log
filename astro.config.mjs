// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import * as dotenv from "dotenv";

import tailwindcss from "@tailwindcss/vite";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwindcss()],
});
