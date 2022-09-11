import { createPortal } from "react-dom";

import { FC, useState } from "react";
import { Setting, SettingServer } from "./Setting";
import { AsyncLoad } from "../poetry/components/AsyncComponent";

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
