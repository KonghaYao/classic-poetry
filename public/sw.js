// 首先引入 Workbox 框架
importScripts(
    "https://cdn.jsdelivr.net/npm/workbox-sw@6.5.4/build/workbox-sw.js"
);

// 注册成功后要立即缓存的资源列表
// workbox.precaching.precacheAndRoute([]);

// 缓存策略
workbox.routing.registerRoute(
    new RegExp(".*.html"),
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    new RegExp(".*.(?:js|css|jpg|png|gif|webp|svg)"),
    new workbox.strategies.CacheFirst()
);

[
    "https://cdn.jsdelivr.net/",
    "https://fastly.jsdelivr.net/",
    "https://cdn.skypack.dev/",
    "https://unpkg.com/",
].forEach((i) => {
    workbox.routing.registerRoute(
        new RegExp(i),
        new workbox.strategies.StaleWhileRevalidate()
    );
});
