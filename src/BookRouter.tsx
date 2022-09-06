import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { AsyncLoad } from "./poetry/components/AsyncComponent";

export function BookRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            {/* 论语 */}
            <Route
                path="/lunyu"
                element={AsyncLoad(
                    () => import("./poetry/LunYu/IndexPage"),
                    "IndexPage"
                )}></Route>
            <Route
                path="/lunyu/:poetryId"
                element={AsyncLoad(
                    () => import("./poetry/LunYu/LunYu"),
                    "LunYu"
                )}></Route>
            {/* 四书五经 */}
            <Route
                path="/sishuwujing"
                element={AsyncLoad(
                    () => import("./poetry/SiShuWuJing/IndexPage"),
                    "IndexPage"
                )}></Route>
            <Route
                path="/sishuwujing/:poetryId"
                element={AsyncLoad(
                    () => import("./poetry/SiShuWuJing/SiShuWuJing"),
                    "SiShuWuJing"
                )}></Route>
            {/* 诗经 */}
            <Route
                path="/shijing"
                element={AsyncLoad(
                    () => import("./poetry/ShiJing/IndexPage"),
                    "IndexPage"
                )}></Route>
            <Route
                path="/shijing/:poetryId"
                element={AsyncLoad(
                    () => import("./poetry/ShiJing/ShiJing"),
                    "ShiJing"
                )}></Route>
        </Routes>
    );
}
