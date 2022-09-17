import { useState } from "react";
import { Setting, SettingServer } from "./Setting";
import { AsyncLoad } from "../poetry/components/AsyncComponent";
const AsyncLoadSetting = AsyncLoad(
    async () => {
        const { FloatWindow } = await import("./FloatWindow");
        return {
            default: FloatWindow,
        };
    },
    "default",
    {},
    null // 将加载页面去除
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
