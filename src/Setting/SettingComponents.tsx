import { IconSettings } from "@arco-design/web-react/icon";
import { FC } from "react";
import { useSetting } from ".";
import { SettingServer } from "./Setting";
import { SourceManager } from "./tabs/SourceManager";
import { TextSetting } from "./tabs/TextSetting";

export const SettingComponents = [
    {
        title: "主题设置",
        comp: TextSetting,
    },
    {
        title: "资源设置",
        comp: SourceManager,
    },
];
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
