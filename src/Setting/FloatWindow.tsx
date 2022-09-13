import { FC, useState } from "react";
import { SettingServer } from "./Setting";
import { useMount, useUnmount } from "ahooks";
import { Modal } from "@arco-design/web-react";
import { SettingPage } from "./SettingPage";
export const FloatWindow: FC = () => {
    const [visible, setVisible] = useState(false);

    const changeVisible = (vis: boolean | undefined) => {
        typeof vis === "boolean" ? setVisible(vis) : setVisible(!visible);
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
            autoFocus={false}
            closable={false}
            style={{
                width: "fit-content",
            }}>
            <SettingPage></SettingPage>
        </Modal>
    );
};
