import { TopMenu } from "./App/TopMenu";
import "./App.css";
import { Layout } from "@arco-design/web-react";
import React, { FC, useMemo } from "react";
import { useSetting } from "./Setting";
import { BookRouter } from "./BookRouter";
import { SwitchTransition, CSSTransition } from "react-transition-group";
const SwitchAnimation: FC<{ children?: React.ReactNode }> = (props) => {
    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
                timeout={2000}
                classNames="fade"
                key={location.pathname}>
                {props.children}
            </CSSTransition>
        </SwitchTransition>
    );
};
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
            <Layout.Header
                style={{
                    zIndex: 10,
                }}>
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
                    position: "relative",
                }}>
                {/* 噪声背景图 */}
                <div
                    className="noise"
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        height: "100%",
                        width: "100%",
                        zIndex: "-1",
                    }}></div>
                <SwitchAnimation>{BookRouter()}</SwitchAnimation>
            </Layout.Content>
            {/* <Layout.Footer>Footer</Layout.Footer> */}
        </Layout>
    );
}

export default App;
