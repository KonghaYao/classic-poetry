import memoize from "lodash/memoize";
import { Setting } from "../../Setting/Setting";

export const CnCaseSupport = memoize(async () => {
    const { default: cnchar } = await import("cnchar");
    const { default: trad } = await import("cnchar-trad");
    cnchar.use(trad);
    return cnchar;
});
["简体", "繁体"].includes(Setting.theme.cnCase) && CnCaseSupport();
