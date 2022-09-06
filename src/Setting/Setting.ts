import { DeepPartial } from "@arco-design/web-react/es/Form/store";
import merge from "lodash-es/merge";

export const Setting = {
    theme: {
        base: "auto",
        cnCase: "默认", // 中英文简繁体
    },
    text: {
        fontSize: 16,
        font: {
            path: "",
            name: "默认字体",
            fontFamily: "Noto Serif SC",
        },
        letterSpacing: 0.2, // 字间距，单位为 em
    },
    poetry: {
        /** 所有 json 文件的来源地址 */
        root: "https://unpkg.com/chinese-poetry/chinese-poetry/",
    },
};
// 持久化的数据
const cache = localStorage.getItem("system-setting");
if (cache) {
    merge(Setting, JSON.parse(cache));
}
export type SettingEvent = {
    /** 使用 change 方式深度覆盖对象 */
    change: DeepPartial<typeof Setting>;
    /** 打开或者关闭设置面板 */
    toggle: boolean | undefined;
};
