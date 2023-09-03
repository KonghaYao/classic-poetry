import { ThemePlugin } from "./plugins/theme/index";
import { isServer } from "solid-js/web";
import { SearchPlugin } from "./plugins/links/search";
export const MainRegister = () => {
    new ThemePlugin().register();
    new SearchPlugin().register();
    return <> </>;
};
