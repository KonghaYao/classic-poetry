import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
darkThemeMq
    ? (document.body.setAttribute("arco-theme", "dark"),
      document.documentElement.style.setProperty("color-scheme", "dark"))
    : document.body.removeAttribute("arco-theme");

// 为了 CDN 加载，使用过时的写法，但是没 BUG
render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById("root") as HTMLElement
);

window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./sw.js")
            .then(function (registration) {
                console.log(
                    "Registration successful, scope is:",
                    registration.scope
                );
            })
            .catch(function (error) {
                console.log(
                    "Service Worker registration failed, error:",
                    error
                );
            });
    }
});
