import { useSetting } from "../Setting";
import { applyAuthor } from "../Server/plugins/author";
import { applyHistoryRun } from "../Server/plugins/histroy-run";
import { applySystemController } from "../Server/plugins/system-controller";
import { applyThemeChange } from "../Server/plugins/theme-change";

/** 顶栏的插件注册 ，*/
export const registerHeaderPlugin = () => {
    applyThemeChange();
    applyHistoryRun();
    applySystemController();
    applyAuthor();
};
