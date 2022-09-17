import { ThemeChange } from "../ThemeChange";
import { TopMenuController } from "../TopMenu";

export const applyThemeChange = () => {
    TopMenuController.emit("register", {
        slot: "Button",
        component: ThemeChange,
        list: true,
    });
};
