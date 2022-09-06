import { TopMenu } from "./App/TopMenu";
import "./App.css";
import { Layout } from "@arco-design/web-react";
import { Route, Routes } from "react-router-dom";
import { FC, useMemo } from "react";
import { LunYu } from "./poetry/LunYu/LunYu";
import { IndexPage as LunYuIndex } from "./poetry/LunYu/IndexPage";
import { Home } from "./Home/Home";
import { useSetting } from "./Setting";
import { SiShuWuJing } from "./poetry/SiShuWuJing/SiShuWuJing";
import { IndexPage as SiShuWuJingIndex } from "./poetry/SiShuWuJing/IndexPage";
import { ShiJing } from "./poetry/ShiJing/ShiJing";
import { IndexPage as ShiJingIndex } from "./poetry/ShiJing/IndexPage";

function App() {
    const { setting } = useSetting();
    const fontSize = useMemo(() => {
        return setting.text.fontSize + "px";
    }, [setting]);
    const letterSpacing = useMemo(() => {
        return setting.text.letterSpacing + "em";
    }, [setting]);
    return (
        <Layout className="App" style={{ height: "100vh" }}>
            <Layout.Header>
                <TopMenu></TopMenu>
            </Layout.Header>
            <Layout.Content
                style={{
                    fontSize,
                    letterSpacing,
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                }}>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    {/* 论语 */}
                    <Route
                        path="/lunyu"
                        element={<LunYuIndex></LunYuIndex>}></Route>
                    <Route
                        path="/lunyu/:poetryId"
                        element={<LunYu></LunYu>}></Route>
                    {/* 四书五经 */}
                    <Route
                        path="/sishuwujing"
                        element={<SiShuWuJingIndex></SiShuWuJingIndex>}></Route>
                    <Route
                        path="/sishuwujing/:poetryId"
                        element={<SiShuWuJing></SiShuWuJing>}></Route>
                    {/* 诗经 */}
                    <Route
                        path="/shijing"
                        element={<ShiJingIndex></ShiJingIndex>}></Route>
                    <Route
                        path="/shijing/:poetryId"
                        element={<ShiJing></ShiJing>}></Route>
                </Routes>
            </Layout.Content>
            <Layout.Footer>Footer</Layout.Footer>
        </Layout>
    );
}

export default App;
