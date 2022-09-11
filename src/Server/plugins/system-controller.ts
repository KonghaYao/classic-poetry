import { useServer } from "..";
import { Controller } from "../../Setting/SettingComponents";
export const applySystemController = () => {
    useServer().register({
        id: "system-controller",
        position: "header-right",
        component: Controller,
    });
};
