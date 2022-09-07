import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { IndexPage as LunYuIndex } from "./poetry/LunYu/IndexPage";
import { IndexPage as SiShuWuJingIndex } from "./poetry/SiShuWuJing/IndexPage";
import { IndexPage as ShiJingIndex } from "./poetry/ShiJing/IndexPage";
import { LunYu } from "./poetry/LunYu/LunYu";
import { ShiJing } from "./poetry/ShiJing/ShiJing";
import { SiShuWuJing } from "./poetry/SiShuWuJing/SiShuWuJing";
import { HuaJianJi } from "./poetry/HuaJianJi/HuaJianJi";
import { IndexPage as HuaJianJiIndex } from "./poetry/HuaJianJi/IndexPage";
import { NanTang } from "./poetry/NanTang/NanTang";
import { IndexPage as NanTangIndex } from "./poetry/NanTang/IndexPage";
import {
    NaLanXingDe,
    NaLanXingDeIndex,
} from "./poetry/NaLanXingDe/NaLanXingDe";

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
            {/* 五代 花间集 */}
            <Route
                path="/huajianji"
                element={<HuaJianJiIndex></HuaJianJiIndex>}></Route>
            <Route
                path="/huajianji/:poetryId"
                element={<HuaJianJi></HuaJianJi>}></Route>
            {/* 五代 花间集 */}
            <Route
                path="/nantang"
                element={<NanTangIndex></NanTangIndex>}></Route>
            <Route
                path="/nantang/:poetryId"
                element={<NanTang></NanTang>}></Route>
            {/* 纳兰性德诗集 */}
            <Route
                path="/nalanxingde"
                element={<NaLanXingDeIndex></NaLanXingDeIndex>}></Route>
            <Route
                path="/nalanxingde/:poetryId"
                element={<NaLanXingDe></NaLanXingDe>}></Route>
        </Routes>
    );
}
