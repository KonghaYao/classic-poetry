import { useServer } from "..";
import { ThemeChange } from "../../App/ThemeChange";

export const applyThemeChange = () => {
    useServer().register({
        id: "theme-change",
        position: "header-right",
        component: ThemeChange,
    });
};
