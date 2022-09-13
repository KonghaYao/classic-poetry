import { useState } from "react";

export const useAutoTheme = () => {
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
