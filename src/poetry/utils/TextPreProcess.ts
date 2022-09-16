import pangu from "pangu";
import { Setting } from "../../Setting/Setting";
import "./CnCaseSupport";
const replacer = {
    "“": "「",
    "”": "」",
    "‘": "『",
    "’": "』",
} as { [key: string]: string };

type TextPreProcessPlugin = (s: string) => string;
const plugins: (TextPreProcessPlugin | false | undefined)[] = [
    (s) => pangu.spacing(s),
    (s) =>
        s.replace(/(“|‘|”|’)/g, (_: string, g: string) => {
            return replacer[g];
        }),
    (s) => {
        let cnchar: any = window.cnchar;
        if (!cnchar) return s; // 避免全局变量没有的惨状
        switch (Setting.theme.cnCase) {
            case "简体":
                return cnchar?.convert?.tradToSimple(s) || s;
            case "繁体":
                return cnchar?.convert?.simpleToTrad(s) || s;
            default:
                return s;
        }
    },
];
export const TextPreProcess = (s: string) => {
    return plugins.reduce((col, cur) => (cur ? cur(col) : col), s);
};
