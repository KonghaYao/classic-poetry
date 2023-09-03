import { ThemePlugin } from "./plugins/theme/index";
import { SearchPlugin } from "./plugins/links/SearchPage";
import { ContributePlugin } from "./plugins/links/Contribute";
export const MainRegister = () => {
    new ThemePlugin().register();
    new SearchPlugin().register();
    new ContributePlugin().register();
    return <> </>;
};
