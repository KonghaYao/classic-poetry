/**
 * JSON 规范，所有的 json 格式都需要为
 * {
 *      tag: string, // 这个 json 对象的唯一值 * 这个属性将由系统统一生成
 *      title: string, // 标题
 *      content: string[] // 具体诗句列表 * 全文搜索将会转化为字符串
 *      belongTo: string // 具体的 JSON 文件路径
 *      subTitle?: string,
 *      author?: string, // 作者
 *      notes?: string[] // 脚注，用于底下注释用 * 不上传到全文搜索
 * }
 *
 */
export const caocaoshiji = {
    base: "caocaoshiji/caocao.json",
    name: "曹操诗集",
    // 将整个 json 文件 转化为 JSON 规范对象的数组
    transform(i) {
        // 这里不需要使用 tag、belongTo，系统自动生成
        return { title: i.title, content: i.paragraphs, author: "曹操" };
    },
};
export const chuci = {
    base: "chuci/chuci.json",
    name: "楚辞",
    // 将整个 json 文件 转化为 JSON 规范对象的数组
    transform(i) {
        // 这里不需要使用 tag、belongTo，系统自动生成
        return {
            title: i.title,
            content: i.content,
            author: i.author,
            subTitle: i.section,
        };
    },
};
export const yuanqu = {
    base: "yuanqu/yuanqu.json",
    name: "元曲",
    // 将整个 json 文件 转化为 JSON 规范对象的数组
    transform(i) {
        // 这里不需要使用 tag、belongTo，系统自动生成
        return {
            title: i.title,
            author: i.author,
            content: i.paragraphs,
        };
    },
};
export const nalanxingde = {
    base: "nalanxingde/纳兰性德诗集.json",
    name: "纳兰性德诗集",
    // 将整个 json 文件 转化为 JSON 规范对象的数组
    transform(i) {
        // 这里不需要使用 tag、belongTo，系统自动生成
        return {
            title: i.title,
            author: i.author,
            content: i.para,
        };
    },
};
export const lunyu = {
    base: "lunyu/lunyu.json",
    name: "论语",
    // 将整个 json 文件 转化为 JSON 规范对象的数组
    transform(i) {
        // 这里不需要使用 tag、belongTo，系统自动生成
        return {
            title: i.chapter,
            content: i.paragraphs,
        };
    },
};
export const shijing = {
    base: "shijing/shijing.json",
    name: "诗经",
    transform(i) {
        return {
            title: i.title,
            subTitle: i.chapter + " " + i.section,
            content: i.content,
        };
    },
};
export const sishuwujing = {
    base: [
        "sishuwujing/daxue.json",
        "sishuwujing/mengzi.json",
        "sishuwujing/zhongyong.json",
    ],
    name: "四书五经",
    transform(i) {
        return {
            title: i.chapter,
            content: i.paragraphs,
        };
    },
};
import fse from "fs-extra";
export const huajianji = {
    base: fse
        .readdirSync("./node_modules/chinese-poetry/wudai/huajianji")
        .filter((i) => i.startsWith("huajianji"))
        .map((i) => {
            return "wudai/huajianji/" + i;
        }),
    rebase(path) {
        return path.replace("wudai/", "");
    },
    name: "花间集",
    transform(i) {
        return {
            title: i.title,
            author: i.author,
            // 舍弃 rhythmic 被包含在 title 中
            content: i.paragraphs,
            notes: i.notes,
        };
    },
};
export const nantang = {
    base: "wudai/nantang/poetrys.json",
    rebase(path) {
        return path.replace("wudai/", "");
    },
    name: "南唐二主词",
    transform(i) {
        return {
            title: i.title,
            author: i.author,
            // 舍弃 rhythmic 被包含在 title 中
            content: i.paragraphs,
            notes: i.notes,
        };
    },
};

export const tang = {
    base: fse
        .readdirSync("./node_modules/chinese-poetry/json")
        .filter((i) => i.startsWith("poet.tang"))
        .map((i) => {
            return "json/" + i;
        }),
    rebase(path) {
        return path.replace("json/", "tang");
    },
    name: "全唐诗",
    transform(i) {
        return {
            title: i.title,
            author: i.author,
            content: i.paragraphs,
        };
    },
};
export const song = {
    base: fse
        .readdirSync("./node_modules/chinese-poetry/json")
        .filter((i) => i.startsWith("poet.song"))
        .map((i) => {
            return "json/" + i;
        }),
    rebase(path) {
        return path.replace("json/", "song");
    },
    name: "全宋词",
    transform(i) {
        return {
            title: i.title,
            author: i.author,
            content: i.paragraphs,
        };
    },
};
