import { FC, useEffect, useState } from "react";

const useAutoTheme = () => {
    const [theme, _setTheme] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    );
    const setTheme = (type: string) => {
        document.documentElement.style.colorScheme = type;
        document.body.setAttribute("arco-theme", type);
        _setTheme(type);
    };

    return {
        theme,

        setTheme,
    };
};
import { Switch, Space } from "@arco-design/web-react";
import { IconSun, IconMoon } from "@arco-design/web-react/icon";
import { useSetting } from "../Setting";

export const ThemeChange: FC<{}> = () => {
    const { setTheme, theme } = useAutoTheme();
    const { setting, server } = useSetting();

    useEffect(() => {
        switch (setting.theme.base) {
            case "light":
                setTheme("light");
                break;
            case "dark":
                setTheme("dark");
                break;
        }
    }, [setting]);
    return (
        <Space
            size="large"
            align="center"
            direction="vertical"
            className="theme-switch">
            <Switch
                checkedIcon={<IconSun />}
                uncheckedIcon={<IconMoon />}
                checked={theme === "light"}
                onChange={(value) => {
                    server.emit("change", {
                        theme: { base: value ? "light" : "dark" },
                    });
                }}
            />
        </Space>
    );
};
