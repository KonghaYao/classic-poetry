import { useServer } from "..";
import { HistoryController } from "../../History/Pannel";

export const applyThemeChange = () => {
    useServer().register({
        id: "theme-change",
        position: "header-right",
        component: HistoryController,
    });
};
