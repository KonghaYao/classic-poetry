import { useRequest } from "ahooks";
import { FC, useState } from "react";
import { Setting, SettingServer } from "../Setting/Setting";
const defaultFont = {
    path: "",
    name: "默认字体",
    fontFamily: "Noto Serif SC",
};
type FontMessage = { name: string; path: string; fontFamily: string };

/** 这个组件必须要在主程序中执行 */
export const useFontChange = () => {
    const { loading, data, error } = useRequest<FontMessage[], any>(
        async () => {
            return fetch(
                "https://fastly.jsdelivr.net/gh/KonghaYao/chinese-free-web-font-storage/assets/index.json",
                { cache: "force-cache" }
            ).then((res) => res.json());
        },
        {
            onSuccess(data) {
                data.unshift(defaultFont);
            },
        }
    );
    const [usingFont, setFont] = useState(Setting.text.font);

    SettingServer.on("change", () => {
        document.body.style.setProperty(
            "--book-font-family",
            `"${Setting.text.font.fontFamily}", "Noto Serif SC"`
        );
        if (usingFont !== Setting.text.font) setFont(Setting.text.font);
    });

    const pathToURL = (path: string) => {
        return `https://fastly.jsdelivr.net/gh/KonghaYao/chinese-free-web-font-storage/${path}/result.css`;
    };
    const slot: FC = () => (
        <>
            {usingFont.path && (
                <link rel="stylesheet" href={pathToURL(usingFont.path)} />
            )}
        </>
    );
    return {
        usingFont,
        loading,
        data,
        error,
        slot,
    };
};
