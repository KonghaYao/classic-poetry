import { LunYuRouter } from "./poetry/LunYu/LunYu";
import { ShiJingRouter } from "./poetry/ShiJing/ShiJing";
import { SiShuWuJingRouter } from "./poetry/SiShuWuJing/SiShuWuJing";
import { HuaJianJiRouter } from "./poetry/HuaJianJi/HuaJianJi";
import { NanTangRouter } from "./poetry/NanTang/NanTang";
import { NaLanXingDeRouter } from "./poetry/NaLanXingDe/NaLanXingDe";
import { MengXueRouter } from "./poetry/MengXue";
import { YouXueQiongLinRouter } from "./poetry/MengXue/YouXueQiongLin";
import { DiZiGuiRouter } from "./poetry/MengXue/DiZiGui";
import { QianJiaShiRouter } from "./poetry/MengXue/QianJiaShi";
import { GuWenGuanZhiRouter } from "./poetry/MengXue/GuWenGuanZhi";
import { TangShiSanBaiShouRouter } from "./poetry/MengXue/TangShiSanBaiShou";
import { CaoCaoShiJiRouter } from "./poetry/_other/CaoCaoShiJi";
import { ChuCiRouter } from "./poetry/_other/ChuCi";
import { YuanQuRouter } from "./poetry/_other/YuanQu";
import { TangRouter } from "./poetry/Tang/Tang";
import { SongRouter } from "./poetry/Song/Song";

export function BookRouter() {
    return (
        <>
            {LunYuRouter()}
            {SiShuWuJingRouter()}
            {ShiJingRouter()}
            {HuaJianJiRouter()}
            {NanTangRouter()}
            {NaLanXingDeRouter()}
            {MengXueRouter()}
            {YouXueQiongLinRouter()}
            {DiZiGuiRouter()}
            {QianJiaShiRouter()}
            {GuWenGuanZhiRouter()}
            {TangShiSanBaiShouRouter()}
            {CaoCaoShiJiRouter()}
            {ChuCiRouter()}
            {YuanQuRouter()}
            {TangRouter()}
            {SongRouter()}
        </>
    );
}
