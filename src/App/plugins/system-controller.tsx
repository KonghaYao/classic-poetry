import { TopMenuController } from "../TopMenu";
import { IconSettings } from "@arco-design/web-react/icon";
import { FC, useState } from "react";
import { useSetting } from "../../Setting/index";
import { SettingServer } from "../../Setting/Setting";
/** 在顶栏的控制按钮 */
export const Controller: FC = () => {
    const { init } = useSetting();
    return (
        <>
            {init()}
            <IconSettings
                onClick={() => {
                    SettingServer.emit("toggle", true);
                }}
            />
        </>
    );
};

export const applySystemController = () => {
    TopMenuController.emit("register", {
        slot: "Button",
        component: Controller,
        list: true,
    });
};
