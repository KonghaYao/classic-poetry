import pangu from "pangu";

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
];
export const TextPreProcess = (s: string) => {
    return plugins.reduce((col, cur) => (cur ? cur(col) : col), s);
};
