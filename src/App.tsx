import { TopMenu } from "./App/TopMenu";
import "./App.css";
import { useMemo } from "react";
import { useSetting } from "./Setting";
import { BookRouter } from "./BookRouter";
import { AnimatedRoutes } from "react-animated-router";
import { Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { useMount } from "ahooks";
import { registerHeaderPlugin } from "./App/HeaderPlugin";
import { NotFound } from "./poetry/components/404";
import { useFontChange } from "./App/FontChange";

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
        <section className="App box-col" style={{ height: "100vh" }}>
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
                <AnimatedRoutes className="box box-col" appear>
                    <Route path="/" element={<Home />}></Route>
                    {BookRouter()}
                    <Route path="*" element={<NotFound />} />
                </AnimatedRoutes>
            </main>
            {/* <Layout.Footer>Footer</Layout.Footer> */}
            <FontSlot></FontSlot>
        </section>
    );
}

export default App;
