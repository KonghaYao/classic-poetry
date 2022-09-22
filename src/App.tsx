import { TopMenu } from "./App/TopMenu";
import "./App.css";
import { useMemo } from "react";
import { useSetting } from "./Setting";
import { BookRouter } from "./BookRouter";
import { AnimatedRoutes } from "react-animated-router";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { useMount } from "ahooks";
import { registerHeaderPlugin } from "./App/HeaderPlugin";
import { NotFound } from "./poetry/components/404";
import { Contribute } from "./Contribute";
import { SearchPage } from "./Search/SearchPage";

function App() {
    useMount(async () => {
        await registerHeaderPlugin();
    });

    return (
        <section className="App box-col " style={{ height: "100vh" }}>
            <header
                style={{
                    zIndex: 10,
                }}>
                <TopMenu></TopMenu>
            </header>
            <main
                className=" box-row box"
                style={{
                    overflow: "hidden",
                    position: "relative",
                }}>
                {/* 噪声背景图 */}
                <div className="noise-bg noise "></div>
                {/* Animate Routes 插件导致页面加载失败 */}
                {/* Animate Routes 插件导致页面多次加载 */}
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/search" element={<SearchPage />}></Route>
                    {BookRouter()}
                    <Route
                        path="/contribute"
                        element={<Contribute></Contribute>}></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </section>
    );
}

export default App;
