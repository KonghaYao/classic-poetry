import { applyHistoryRun } from "./plugins/histroy-run";
import { applySystemController } from "./plugins/system-controller";
import { applyThemeChange } from "./plugins/theme-change";

applyThemeChange();
applyHistoryRun();
applySystemController();
