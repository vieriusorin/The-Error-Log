// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import * as dotenv from "dotenv";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  output: "server",
  // @ts-ignore
  integrations: [react(), mdx(), sitemap(), tailwindcss()],
});
