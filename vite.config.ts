import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import { visualizer } from "rollup-plugin-visualizer";
import externalGlobals from "rollup-plugin-external-globals";
// vite.config.ts
const { ANALYZE } = process.env;
const cdnRoot = "https://cdn.skypack.dev";

const productionPlugin = [
    {
        enforce: "pre",
        transformIndexHtml(code) {
            const content = [
                "https://unpkg.com/react@18/umd/react.production.min.js",

                "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",

                "https://unpkg.com/react-router-dom@6.4.0/dist/umd/react-router-dom.production.min.js",
                "https://unpkg.com/localforage@1.10.0/dist/localforage.js",
            ];
            return code.replace(
                "<!-- GlobalScripts -->",
                content
                    .map((i) => {
                        return `<script crossorigin src='${i}'></script>`;
                    })
                    .join("")
            );
        },
    },
    externalGlobals({
        react: "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM",
        localforage: "localforage",
    }),
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    // TODO chunk 碎片问题
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
        ...((mode === "production" && productionPlugin) || []),
    ],
    define: {
        __Search_Origin__: JSON.stringify(
            "https://meilisearch-konghayao.cloud.okteto.net/"
        ),
        __Search_Key__: JSON.stringify(
            "619f9717b59cbe35aa5883cb739f3133cff98ff439ddf8b2ed3cecf87004ec3c"
        ),
    },
    resolve: {
        alias: Object.assign(
            {
                "@meilisearch/instant-meilisearch":
                    "https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/dist/instant-meilisearch.umd.min.js",
            },
            mode === "production" && {
                cnchar: cdnRoot + "/cnchar",
                "fuse.js": cdnRoot + "/fuse.js",
                "cnchar-trad": cdnRoot + "/cnchar-trad",
                pangu: cdnRoot + "/pangu",
            }
        ),
    },
    build: {},
}));
