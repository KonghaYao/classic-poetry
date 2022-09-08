import mitt, { Emitter } from "mitt";
import { createPortal } from "react-dom";

import merge from "lodash/merge";
import { Suspense, useState } from "react";
import { SettingEvent, Setting } from "./Setting";
import { AsyncLoad } from "../poetry/components/AsyncComponent";
/** 全局唯一的设置操作 */
export const SettingServer = mitt<SettingEvent>();
SettingServer.on("change", (setting) => {
    // merge 方式
    merge(Setting, setting);
    localStorage.setItem("system-setting", JSON.stringify(Setting));
});
const AsyncLoadSetting = AsyncLoad(
    async () => {
        const { SettingPage } = await import("./SettingPage");
        return {
            default: () =>
                createPortal(<SettingPage></SettingPage>, document.body),
        };
    },
    "default",
    {},
    null
);
// import { SettingPage } from "./SettingPage";
export const useSetting = () => {
    let page: JSX.Element;
    const [setting, setNewSetting] = useState(Setting);
    SettingServer.on("change", () => {
        setNewSetting({ ...Setting });
    });
    return {
        server: SettingServer,
        init() {
            if (page) return page;

            page = AsyncLoadSetting;

            return AsyncLoadSetting;
        },
        setting,
    };
};
