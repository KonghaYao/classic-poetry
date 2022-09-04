import { FC } from "react";

const useAutoTheme = () => {
    const setTheme = (type: string) => {
        document.documentElement.style.colorScheme = type;
        document.body.setAttribute("arco-theme", type);
    };
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addEventListener("change", (e) => {
        if (e.matches) {
            document.body.setAttribute("arco-theme", "dark");
        } else {
            document.body.removeAttribute("arco-theme");
        }
    });
    darkThemeMq.matches && setTheme("dark");
    return {
        setTheme,
    };
};
import { Switch, Space } from "@arco-design/web-react";
import { IconSun, IconMoon } from "@arco-design/web-react/icon";

export const ThemeChange: FC<{}> = () => {
    const { setTheme } = useAutoTheme();
    return (
        <Space
            size="large"
            align="center"
            direction="vertical"
            className="theme-switch">
            <Switch
                checkedIcon={<IconSun />}
                uncheckedIcon={<IconMoon />}
                defaultChecked={
                    !window.matchMedia("(prefers-color-scheme: dark)").matches
                }
                onChange={(value) => {
                    setTheme(value ? "light" : "dark");
                }}
            />
        </Space>
    );
};
