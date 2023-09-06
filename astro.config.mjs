import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";

import solidJs from "@astrojs/solid-js";
import { serverPlugin } from "./lib/serverPlugin";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), solidJs()],
    output: "server",
    adapter: netlify(),
});
