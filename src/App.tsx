import { TopMenu } from "./App/TopMenu";
import "./App.css";
import { Layout } from "@arco-design/web-react";
import { useMemo } from "react";
import { useSetting } from "./Setting";
import { BookRouter } from "./BookRouter";

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
                {BookRouter()}
            </Layout.Content>
            <Layout.Footer>Footer</Layout.Footer>
        </Layout>
    );
}

export default App;
