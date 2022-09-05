import { DeepPartial } from "@arco-design/web-react/es/Form/store";
import mitt, { Emitter } from "mitt";
import { createPortal } from "react-dom";

export const Setting = {
    theme: {
        base: "auto",
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
type SettingEvent = {
    /** 使用 change 方式深度覆盖对象 */
    change: DeepPartial<typeof Setting>;
    /** 打开或者关闭设置面板 */
    toggle: boolean | undefined;
};

import merge from "lodash-es/merge";
import { SettingPage } from "./SettingPage";
import { useState } from "react";
/** 全局唯一的设置操作 */
export const SettingServer = mitt<SettingEvent>();
SettingServer.on("change", (setting) => {
    // merge 方式
    merge(Setting, setting);
    localStorage.setItem("system-setting", JSON.stringify(Setting));
});

export const useSetting = () => {
    let page: React.ReactPortal;
    const [setting, setNewSetting] = useState(Setting);
    SettingServer.on("change", () => {
        setNewSetting({ ...Setting });
    });
    return {
        server: SettingServer,
        init() {
            if (page) return page;
            page = createPortal(<SettingPage></SettingPage>, document.body);
            return page;
        },
        setting,
    };
};
