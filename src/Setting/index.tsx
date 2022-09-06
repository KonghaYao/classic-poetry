import mitt, { Emitter } from "mitt";
import { createPortal } from "react-dom";

import merge from "lodash-es/merge";
import { SettingPage } from "./SettingPage";
import { useState } from "react";
import { SettingEvent, Setting } from "./Setting";
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
