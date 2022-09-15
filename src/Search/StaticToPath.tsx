const Transformer: [
    RegExp | string,
    string | ((...args: string[]) => string)
][] = [
    ...Object.entries({
        "caocaoshiji/caocao.json": "/caocaoshiji",
        "chuci/chuci.json": "/chuci",
        "yuanqu/yuanqu.json": "/yuanqu",
        "nalanxingde/纳兰性德诗集.json": "/nalanxingde",
        "lunyu/lunyu.json": "/lunyu",
        "shijing/shijing.json": "/shijing",
        ...[
            "sanzijing-traditional",
            "sanzijing-new",
            "qianziwen",
            "baijiaxing",
            "zhuzijiaxun",
            "shenglvqimeng",
            "wenzimengqiu",
            "zengguangxianwen",
        ].reduce((col, cur) => {
            col[`mengxue/${cur}.json`] = "/mengxue";
            return col;
        }, {} as { [key: string]: string }),

        ...[
            "guwenguanzhi",
            "dizigui",
            "qianjiashi",
            "tangshisanbaishou",
            "youxueqionglin",
        ].reduce((col, cur) => {
            col[`mengxue/${cur}.json`] = cur;
            return col;
        }, {} as { [key: string]: string }),
    }),
    [/sishuwujing\/.*/, "/sishuwujing"],
    [/wudai\/huajianji.*/, "/huajianji"],
    [/wudai\/nantang.*/, "/nantang"],
    [
        /json\/poet.tang.(\d+).json/,
        (_, num: string) => {
            return "/tang/" + num;
        },
    ],
    [
        /json\/poet.song.(\d+).json/,
        (_, num: string) => {
            return "/song/" + num;
        },
    ],
];
export const StaticToPath = (hit: { belongTo: string; id: string }): string => {
    for (const [reg, process] of Transformer) {
        if (typeof reg === "string") {
            if (reg === hit.belongTo) {
                return process + "/" + hit.id;
            }
        } else {
            if (typeof process === "string") {
                if (reg.test(hit.belongTo)) {
                    return process + "/" + hit.id;
                }
            } else {
                const result = hit.belongTo.match(reg);
                if (result) {
                    return process(...(result as any)) + "/" + hit.id;
                }
            }
        }
    }
    throw new Error("没有找到路径");
};
