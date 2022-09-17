import { Setting } from "../Setting/Setting";

/** 顶栏的异步插件注册 ，*/
export const registerHeaderPlugin = async () => {
    const all = [
        async () =>
            import("./plugins/author").then(({ applyAuthor }) => applyAuthor),
        async () =>
            Setting.poetry.history.enable &&
            import("./plugins/histroy-run").then(
                ({ applyHistoryRun }) => applyHistoryRun
            ),
        async () =>
            import("./plugins/system-controller").then(
                ({ applySystemController }) => applySystemController
            ),
        async () =>
            import("./plugins/search").then(
                ({ applySearchButton }) => applySearchButton
            ),
        async () =>
            import("./plugins/theme-change").then(
                ({ applyThemeChange }) => applyThemeChange
            ),
    ].map((i) => i());
    const module = await Promise.all(all);
    return module.reverse().forEach((plugin) => plugin && plugin());
};
