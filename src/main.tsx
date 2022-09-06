import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById("root") as HTMLElement
);
