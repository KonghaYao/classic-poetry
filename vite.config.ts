import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import { visualizer } from "rollup-plugin-visualizer";
// vite.config.ts
const { ANALYZE } = process.env;

const cdnRoot = "https://cdn.skypack.dev";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    base: "./",
    plugins: [
        react({
            // 配合 CDN 操作。。。。
            jsxRuntime: "classic",
        }),
        vitePluginForArco({
            style: "css",
        }),

        ANALYZE === "1"
            ? visualizer({ open: true, filename: "visualizer/stat.html" })
            : false,
    ],
    define: {
        __Search_Origin__: JSON.stringify("http://localhost:7700"),
        __Search_Key__: JSON.stringify("KongHaYaoForChinesePoetry"),
    },
    resolve: {
        alias: Object.assign(
            {
                "@meilisearch/instant-meilisearch":
                    "https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/dist/instant-meilisearch.umd.min.js",
            },
            mode === "production"
                ? {
                      react: "https://cdn.skypack.dev/react",
                      "react-dom": "https://cdn.skypack.dev/react-dom",
                      "react-router-dom":
                          "https://cdn.skypack.dev/react-router-dom",
                      cnchar: cdnRoot + "/cnchar",
                      "fuse.js": cdnRoot + "/fuse.js",
                      "cnchar-trad": cdnRoot + "/cnchar-trad",
                      pangu: cdnRoot + "/pangu",
                      localforage: cdnRoot + "/localforage",
                  }
                : {}
        ),
    },
}));
