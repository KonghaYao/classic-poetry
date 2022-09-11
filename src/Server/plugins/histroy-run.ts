import { useServer } from "..";
import { HistoryController } from "../../History/Pannel";

export const applyHistoryRun = () => {
    useServer().register({
        id: "history-run",
        position: "header-right",
        component: HistoryController,
    });
};
