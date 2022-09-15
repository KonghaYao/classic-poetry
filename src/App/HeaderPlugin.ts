import { Setting } from "../Setting/Setting";

/** 顶栏的异步插件注册 ，*/
export const registerHeaderPlugin = async () => {
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
            import("../Server/plugins/search").then(
                ({ applySearchButton }) => applySearchButton
            ),
        async () =>
            import("../Server/plugins/theme-change").then(
                ({ applyThemeChange }) => applyThemeChange
            ),
    ].map((i) => i());
    const module = await Promise.all(all);
    return module.reverse().forEach((plugin) => plugin && plugin());
};
