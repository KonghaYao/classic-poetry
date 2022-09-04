import { TopMenu } from "./App/TopMenu";
import "./App.css";
import { Layout } from "@arco-design/web-react";
import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import { LunYu } from "./poetry/LunYu";
const ShowPoetry: FC = () => {
    return <div></div>;
};
function App() {
    return (
        <Layout className="App" style={{ height: "100vh" }}>
            <Layout.Header>
                <TopMenu></TopMenu>
            </Layout.Header>
            <Layout.Content
                style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                }}>
                <Routes>
                    <Route
                        path="/lunyu/:poetryId"
                        element={<LunYu></LunYu>}></Route>
                </Routes>
            </Layout.Content>
            <Layout.Footer>Footer</Layout.Footer>
        </Layout>
    );
}

export default App;
