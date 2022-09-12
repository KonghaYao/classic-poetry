import { DeepPartial } from "@arco-design/web-react/es/Form/store";
import merge from "lodash/merge";
import mitt from "mitt";
export type SettingEvent = {
    /** 使用 change 方式深度覆盖对象 */
    change: DeepPartial<typeof Setting>;
    /** 打开或者关闭设置面板 */
    toggle: boolean | undefined;
};

/** 全局唯一的设置操作 */
export const SettingServer = mitt<SettingEvent>();
SettingServer.on("change", (setting) => {
    // merge 方式
    merge(Setting, setting);
    // console.log(Setting);
    localStorage.setItem("system-setting", JSON.stringify(Setting));
});
export const Setting = {
    theme: {
        base: "auto",
        cnCase: "默认", // 中英文简繁体
        cnList: "横排",
    },
    text: {
        fontSize: 18,
        font: {
            fontFamily: "Huiwen-mincho",
            name: "汇文明朝体",
            path: "build\\汇文明朝体",
        },
        fontWeight: "400",
        letterSpacing: 0.2, // 字间距，单位为 em
    },
    poetry: {
        /** 所有 json 文件的来源地址 */
        root: [
            "https://unpkg.com/chinese-poetry@1.4.1/chinese-poetry",
            // "https://cdn.skypackk.dev/chinese-poetry/chinese-poetry/",
        ],
        history: {
            enable: true,
        },
    },
};
// 持久化的数据
const cache = localStorage.getItem("system-setting");
if (cache) {
    merge(Setting, JSON.parse(cache));
}
