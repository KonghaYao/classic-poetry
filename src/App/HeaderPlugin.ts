import { Setting } from "../Setting/Setting";

/** 顶栏的插件注册 ，*/
export const registerHeaderPlugin = () => {
    const all = [
        async () =>
            import("../Server/plugins/author").then(
                ({ applyAuthor }) => applyAuthor
            ),
        async () =>
            Setting.poetry.history.enable &&
            import("../Server/plugins/histroy-run").then(
                ({ applyHistoryRun }) => applyHistoryRun
            ),
        async () =>
            import("../Server/plugins/system-controller").then(
                ({ applySystemController }) => applySystemController
            ),
        async () =>
            import("../Server/plugins/theme-change").then(
                ({ applyThemeChange }) => applyThemeChange
            ),
    ].map((i) => {
        return i && i();
    });
    return Promise.all(all);
};
