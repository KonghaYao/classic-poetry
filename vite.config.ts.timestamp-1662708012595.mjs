// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import { visualizer } from "rollup-plugin-visualizer";
var { ANALYZE } = process.env;
var cdnRoot = "https://cdn.skypack.dev";
var vite_config_default = defineConfig(({ mode }) => ({
  base: "./",
  plugins: [
    react({
      jsxRuntime: "classic"
    }),
    vitePluginForArco({
      style: "css"
    }),
    ANALYZE === "1" ? visualizer({ open: true, filename: "visualizer/stat.html" }) : false
  ],
  resolve: {
    alias: mode === "production" && {
      react: "https://cdn.skypack.dev/react",
      "react-dom": "https://cdn.skypack.dev/react-dom",
      "react-router-dom": "https://cdn.skypack.dev/react-router-dom",
      cnchar: cdnRoot + "/cnchar",
      "fuse.js": cdnRoot + "/fuse.js",
      "cnchar-trad": cdnRoot + "/cnchar-trad",
      pangu: cdnRoot + "/pangu",
      localforage: cdnRoot + "/localforage"
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxyZWFjdFxcXFxwb2V0cnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHJlYWN0XFxcXHBvZXRyeVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovcmVhY3QvcG9ldHJ5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IHZpdGVQbHVnaW5Gb3JBcmNvIH0gZnJvbSBcIkBhcmNvLXBsdWdpbnMvdml0ZS1yZWFjdFwiO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcbi8vIHZpdGUuY29uZmlnLnRzXG5jb25zdCB7IEFOQUxZWkUgfSA9IHByb2Nlc3MuZW52O1xuXG5jb25zdCBjZG5Sb290ID0gXCJodHRwczovL2Nkbi5za3lwYWNrLmRldlwiO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gICAgYmFzZTogXCIuL1wiLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3Qoe1xuICAgICAgICAgICAgLy8gXHU5MTREXHU1NDA4IENETiBcdTY0Q0RcdTRGNUNcdTMwMDJcdTMwMDJcdTMwMDJcdTMwMDJcbiAgICAgICAgICAgIGpzeFJ1bnRpbWU6IFwiY2xhc3NpY1wiLFxuICAgICAgICB9KSxcbiAgICAgICAgdml0ZVBsdWdpbkZvckFyY28oe1xuICAgICAgICAgICAgc3R5bGU6IFwiY3NzXCIsXG4gICAgICAgIH0pLFxuXG4gICAgICAgIEFOQUxZWkUgPT09IFwiMVwiXG4gICAgICAgICAgICA/IHZpc3VhbGl6ZXIoeyBvcGVuOiB0cnVlLCBmaWxlbmFtZTogXCJ2aXN1YWxpemVyL3N0YXQuaHRtbFwiIH0pXG4gICAgICAgICAgICA6IGZhbHNlLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczogbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCIgJiYge1xuICAgICAgICAgICAgcmVhY3Q6IFwiaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvcmVhY3RcIixcbiAgICAgICAgICAgIFwicmVhY3QtZG9tXCI6IFwiaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvcmVhY3QtZG9tXCIsXG4gICAgICAgICAgICBcInJlYWN0LXJvdXRlci1kb21cIjogXCJodHRwczovL2Nkbi5za3lwYWNrLmRldi9yZWFjdC1yb3V0ZXItZG9tXCIsXG4gICAgICAgICAgICBjbmNoYXI6IGNkblJvb3QgKyBcIi9jbmNoYXJcIixcbiAgICAgICAgICAgIFwiZnVzZS5qc1wiOiBjZG5Sb290ICsgXCIvZnVzZS5qc1wiLFxuICAgICAgICAgICAgXCJjbmNoYXItdHJhZFwiOiBjZG5Sb290ICsgXCIvY25jaGFyLXRyYWRcIixcbiAgICAgICAgICAgIHBhbmd1OiBjZG5Sb290ICsgXCIvcGFuZ3VcIixcbiAgICAgICAgICAgIGxvY2FsZm9yYWdlOiBjZG5Sb290ICsgXCIvbG9jYWxmb3JhZ2VcIixcbiAgICAgICAgfSxcbiAgICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxTyxTQUFTLG9CQUFvQjtBQUNsUSxPQUFPLFdBQVc7QUFDbEIsU0FBUyx5QkFBeUI7QUFDbEMsU0FBUyxrQkFBa0I7QUFFM0IsSUFBTSxFQUFFLFFBQVEsSUFBSSxRQUFRO0FBRTVCLElBQU0sVUFBVTtBQUVoQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3ZDLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxNQUVGLFlBQVk7QUFBQSxJQUNoQixDQUFDO0FBQUEsSUFDRCxrQkFBa0I7QUFBQSxNQUNkLE9BQU87QUFBQSxJQUNYLENBQUM7QUFBQSxJQUVELFlBQVksTUFDTixXQUFXLEVBQUUsTUFBTSxNQUFNLFVBQVUsdUJBQXVCLENBQUMsSUFDM0Q7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPLFNBQVMsZ0JBQWdCO0FBQUEsTUFDNUIsT0FBTztBQUFBLE1BQ1AsYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsTUFDcEIsUUFBUSxVQUFVO0FBQUEsTUFDbEIsV0FBVyxVQUFVO0FBQUEsTUFDckIsZUFBZSxVQUFVO0FBQUEsTUFDekIsT0FBTyxVQUFVO0FBQUEsTUFDakIsYUFBYSxVQUFVO0FBQUEsSUFDM0I7QUFBQSxFQUNKO0FBQ0osRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
