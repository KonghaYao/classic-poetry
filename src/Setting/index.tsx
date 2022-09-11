import { createPortal } from "react-dom";

import { FC, useState } from "react";
import { Setting, SettingServer } from "./Setting";
import { AsyncLoad } from "../poetry/components/AsyncComponent";
import { Modal } from "@arco-design/web-react";
import { useMount, useUnmount } from "ahooks";

const AsyncLoadSetting = AsyncLoad(
    async () => {
        const { SettingPage } = await import("./SettingPage");
        return {
            default: () => {
                const [visible, setVisible] = useState(false);

                const changeVisible = (vis: boolean | undefined) => {
                    typeof vis === "boolean"
                        ? setVisible(vis)
                        : setVisible(!visible);
                };
                useMount(() => {
                    SettingServer.on("toggle", changeVisible);
                });
                useUnmount(() => {
                    SettingServer.off("toggle", changeVisible);
                });
                return (
                    <Modal
                        mask={true}
                        maskClosable={true}
                        visible={visible}
                        footer={null}
                        title={null}
                        closable={false}>
                        <SettingPage></SettingPage>
                    </Modal>
                );
            },
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
