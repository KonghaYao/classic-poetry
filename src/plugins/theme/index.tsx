import { SystemPlugin } from "../system";
import { useStore } from "@nanostores/solid";
import { RiWeatherSunFill, RiWeatherMoonClearFill } from "solid-icons/ri";
import { defaultSetting, setDefaultSetting } from "../../Setting";
import { reflect } from "@cn-ui/reactive";

export class ThemePlugin extends SystemPlugin {
    config = {
        position: "header" as const,
    };
    render() {
        const setting = defaultSetting;
        const theme = reflect(() => setting.theme.base);
        const switchTheme = (t: string) => () => {
            setDefaultSetting("theme", "base", t);
            document.documentElement.style.setProperty("color-scheme", t);
            const methods = t === "dark" ? "add" : "remove";
            document.documentElement.classList[methods]("dark");
        };

        return (
            <nav class="cursor-pointer">
                {theme() === "light" && (
                    <RiWeatherSunFill
                        onClick={switchTheme("dark")}></RiWeatherSunFill>
                )}
                {theme() === "dark" && (
                    <RiWeatherMoonClearFill
                        onClick={switchTheme("light")}></RiWeatherMoonClearFill>
                )}
            </nav>
        );
    }
}
