import { FC, useEffect, useMemo } from "react";

import { Switch, Space } from "@arco-design/web-react";
import { IconSun, IconMoon } from "@arco-design/web-react/icon";
import { useSetting } from "../Setting";
import { useAutoTheme } from "./useAutoTheme";

export const ThemeChange: FC<{}> = () => {
    const { setTheme, theme } = useAutoTheme();
    const { setting, server } = useSetting();

    useMemo(() => {
        switch (setting.theme.base) {
            case "light":
                setTheme("light");
                break;
            case "dark":
                setTheme("dark");
                break;
        }
    }, [setting.theme.base]);
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
