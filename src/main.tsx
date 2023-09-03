import { ThemePlugin } from "./plugins/theme/index";
import { SearchPlugin } from "./plugins/links/SearchPage";
export const MainRegister = () => {
    new ThemePlugin().register();
    new SearchPlugin().register();
    return <> </>;
};
