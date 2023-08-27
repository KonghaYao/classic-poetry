import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), solidJs()],
    output: "server",
    adapter: netlify(),
    // vite: {
    //     resolve: {
    //         alias: {
    //             "@arco-design/web-react/icon":
    //                 "@arco-design/web-react/icon/index.es.js",
    //             "@arco-design/web-react": "@arco-design/web-react/es/index.js",
    //         },
    //     },
    // },
});
