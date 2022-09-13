import { useRequest } from "ahooks";
import { FC, useEffect, useMemo } from "react";
import { useSetting } from "../Setting";
const defaultFont = {
    path: "",
    name: "默认字体",
    fontFamily: "Noto Serif SC",
};
type FontMessage = { name: string; path: string; fontFamily: string };

/** 这个组件必须要在主程序中执行 */
export const useFontChange = () => {
    const { setting } = useSetting();
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
    const usingFont = useMemo(() => setting.text.font, [setting]);
    useEffect(() => {
        // 触发全局样式改动
        document.body.style.setProperty(
            "--book-font-family",
            `"${setting.text.font.fontFamily}", "Noto Serif SC"`
        );
    }, [setting]); //
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
