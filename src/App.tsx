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
import { useFontChange } from "./App/FontChange";
import { Contribute } from "./Contribute";
import { AsyncLoad } from "./poetry/components/AsyncComponent";

function App() {
    const { setting } = useSetting();
    const { slot: FontSlot } = useFontChange();

    const fontSize = useMemo(() => {
        return setting.text.fontSize + "px";
    }, [setting]);
    const letterSpacing = useMemo(() => {
        return setting.text.letterSpacing + "em";
    }, [setting]);

    useMount(async () => {
        registerHeaderPlugin();
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
                className="box-row box"
                style={{
                    fontSize,
                    letterSpacing,
                    overflow: "hidden",
                    position: "relative",
                }}>
                {/* 噪声背景图 */}
                <div className="noise-bg noise "></div>
                {/* Animate Routes 插件导致页面加载失败 */}
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    {BookRouter()}
                    <Route
                        path="/contribute"
                        element={AsyncLoad(
                            () => import("./Contribute/index"),
                            "Contribute"
                        )}></Route>
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
            {/* <Layout.Footer>Footer</Layout.Footer> */}
            <FontSlot></FontSlot>
        </section>
    );
}

export default App;
