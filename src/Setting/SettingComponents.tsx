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
