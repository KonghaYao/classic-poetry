import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { IndexPage as LunYuIndex } from "./poetry/LunYu/IndexPage";
import { IndexPage as SiShuWuJingIndex } from "./poetry/SiShuWuJing/IndexPage";
import { IndexPage as ShiJingIndex } from "./poetry/ShiJing/IndexPage";
import { LunYu } from "./poetry/LunYu/LunYu";
import { ShiJing } from "./poetry/ShiJing/ShiJing";
import { SiShuWuJing } from "./poetry/SiShuWuJing/SiShuWuJing";

export function BookRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            {/* 论语 */}
            <Route path="/lunyu" element={<LunYuIndex></LunYuIndex>}></Route>
            <Route path="/lunyu/:poetryId" element={<LunYu></LunYu>}></Route>
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
    );
}
