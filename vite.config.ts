import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import { visualizer } from "rollup-plugin-visualizer";
// vite.config.ts
const { ANALYZE } = process.env;
export class SplitVendorChunkCache {
    cache;
    constructor() {
        this.cache = new Map();
    }
    reset() {
        this.cache = new Map();
    }
}
function staticImportedByEntry(id, getModuleInfo, cache, importStack = []) {
    if (cache.has(id)) {
        return !!cache.get(id);
    }
    if (importStack.includes(id)) {
        cache.set(id, false);
        return false;
    }
    const mod = getModuleInfo(id);
    if (!mod) {
        cache.set(id, false);
        return false;
    }
    if (mod.isEntry) {
        cache.set(id, true);
        return true;
    }
    const someImporterIs = mod.importers.some((importer) =>
        staticImportedByEntry(
            importer,
            getModuleInfo,
            cache,
            importStack.concat(id)
        )
    );
    cache.set(id, someImporterIs);
    return someImporterIs;
}
const cache = new SplitVendorChunkCache();
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
    build: {
        // rollupOptions: {
        //     manualChunks(id, { getModuleInfo }) {
        //         const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`;
        //         const cssLangRE = new RegExp(cssLangs);
        //         const isCSSRequest = (request: string): boolean =>
        //             cssLangRE.test(request);
        //         // 分vendor包
        //         if (
        //             id.includes("node_modules") &&
        //             !isCSSRequest(id) &&
        //             staticImportedByEntry(id, getModuleInfo, cache.cache)
        //         ) {
        //             return "vendor";
        //         } else if (id.includes("poetry")) {
        //             return "manifest";
        //         }
        //     },
        // },
    },
}));
