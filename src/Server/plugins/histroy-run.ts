import { useServer } from "..";
import { ThemeChange } from "../../App/ThemeChange";

export const applyHistoryRun = () => {
    useServer().register({
        id: "history-run",
        position: "header-right",
        component: ThemeChange,
    });
};
