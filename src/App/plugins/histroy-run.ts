import { TopMenuController } from "../TopMenu";
import { HistoryController } from "../../History/Pannel";

export const applyHistoryRun = () => {
    TopMenuController.emit("register", {
        slot: "Button",
        component: HistoryController,
        list: true,
    });
};
