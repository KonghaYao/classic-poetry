import { ThemePlugin } from "./plugins/theme/index";
import { isServer } from "solid-js/web";
export const MainRegister = () => {
    new ThemePlugin().register();
    return <> </>;
};
