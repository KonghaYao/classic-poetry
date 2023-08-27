import { map } from "nanostores";
export const BookSetting = map({
    direction: "col" as "col" | "row",
});

export const defaultSetting = map({
    theme: {
        base: "auto",
        cnCase: "默认", // 中英文简繁体
        cnList: "横排",
    },
    text: {
        fontSize: 18,
        font: {
            fontFamily: "Huiwen-mincho",
            name: "汇文明朝体",
            path: "build\\汇文明朝体",
        },
        fontWeight: "400",
        letterSpacing: 0.2, // 字间距，单位为 em
    },
    poetry: {
        /** 所有 json 文件的来源地址 */
        root: [
            "https://unpkg.com/chinese-poetry@1.4.1/chinese-poetry",
            // "https://cdn.skypackk.dev/chinese-poetry/chinese-poetry/",
        ],
        history: {
            enable: true,
        },
    },
});
