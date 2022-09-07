import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { LunYu, LunYuIndex } from "./poetry/LunYu/LunYu";
import { ShiJing, ShiJingIndex } from "./poetry/ShiJing/ShiJing";
import {
    SiShuWuJing,
    SiShuWuJingIndex,
} from "./poetry/SiShuWuJing/SiShuWuJing";
import { HuaJianJi, HuaJianJiIndex } from "./poetry/HuaJianJi/HuaJianJi";
import { NanTang, NanTangIndex } from "./poetry/NanTang/NanTang";
import {
    NaLanXingDe,
    NaLanXingDeIndex,
} from "./poetry/NaLanXingDe/NaLanXingDe";
import { MengXue, MengXueIndex } from "./poetry/MengXue";
import {
    YouXueQiongLin,
    YouXueQiongLinIndex,
} from "./poetry/MengXue/YouXueQiongLin";
import { DiZiGui, DiZiGuiIndex } from "./poetry/MengXue/DiZiGui";
import { QianJiaShi, QianJiaShiIndex } from "./poetry/MengXue/QianJiaShi";

export function BookRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            {/* 论语 */}
            <Route path="/lunyu" element={<LunYuIndex />}></Route>
            <Route path="/lunyu/:poetryId" element={<LunYu />}></Route>
            {/* 四书五经 */}
            <Route path="/sishuwujing" element={<SiShuWuJingIndex />}></Route>
            <Route
                path="/sishuwujing/:poetryId"
                element={<SiShuWuJing />}></Route>
            {/* 诗经 */}
            <Route path="/shijing" element={<ShiJingIndex />}></Route>
            <Route path="/shijing/:poetryId" element={<ShiJing />}></Route>
            {/* 五代 花间集 */}
            <Route path="/huajianji" element={<HuaJianJiIndex />}></Route>
            <Route path="/huajianji/:poetryId" element={<HuaJianJi />}></Route>
            {/* 五代 花间集 */}
            <Route path="/nantang" element={<NanTangIndex />}></Route>
            <Route path="/nantang/:poetryId" element={<NanTang />}></Route>
            {/* 纳兰性德诗集 */}
            <Route path="/nalanxingde" element={<NaLanXingDeIndex />}></Route>
            <Route
                path="/nalanxingde/:poetryId"
                element={<NaLanXingDe />}></Route>
            {/* 蒙学 */}
            <Route path="/mengxue" element={<MengXueIndex />}></Route>
            <Route path="/mengxue/:poetryId" element={<MengXue />}></Route>
            <Route
                path="/youxueqionglin"
                element={<YouXueQiongLinIndex />}></Route>
            <Route
                path="/youxueqionglin/:poetryId"
                element={<YouXueQiongLin />}></Route>
            <Route path="/dizigui" element={<DiZiGuiIndex />}></Route>
            <Route path="/dizigui/:poetryId" element={<DiZiGui />}></Route>
            <Route path="/qianjiashi" element={<QianJiaShiIndex />}></Route>
            <Route
                path="/qianjiashi/:poetryId"
                element={<QianJiaShi />}></Route>
        </Routes>
    );
}
