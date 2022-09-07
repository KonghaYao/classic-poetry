import { FC } from "react";
import { BookStore } from "../utils/BookStore";
import {
    CommonBook,
    IndexPageOrigin,
    ObjectProvider,
} from "../components/BookGenerator";

export type FetchData = ObjectProvider[];

const info = {
    title: "蒙学",
    root: "/mengxue",

    adapter(i: ObjectProvider) {
        return i;
    },
    async getData() {
        const pre = "mengxue/";
        // 三字经
        const data = ["sanzijing-traditional.json", "sanzijing-new.json"].map(
            (i) =>
                BookStore.getBook<{
                    title: string;
                    author: string;
                    tags: string;
                    paragraphs: string[];
                }>(pre + i).then((i) => {
                    // 新旧三字经
                    return {
                        ...i,
                        title: i.tags + i.title,
                        content: i.paragraphs,
                    };
                })
        );
        // 千字文
        const qianziwen = BookStore.getBook<{
            title: string;
            author: string;
            tags: string;
            paragraphs: string[];
            spells: string[];
        }>("/mengxue/qianziwen.json").then((i) => ({
            ...i,
            section: i.tags,
            content: i.paragraphs,
        }));
        // 百家姓
        const baijiaxing = BookStore.getBook<{
            title: string;
            author: string;
            tags: string;
            paragraphs: string[];
            origin: { surname: string; place: string }[];
        }>("/mengxue/baijiaxing.json").then((i) => ({
            ...i,
            section: i.tags,
            content: i.paragraphs,
            notes: i.origin.map((i) => {
                return `${i.surname} 来源于 ${i.place}`;
            }),
        }));
        // 弟子規

        // 朱子家訓
        const zhuzijiaxun = BookStore.getBook<{
            title: string;
            author: string;
            paragraphs: string[];
        }>("/mengxue/zhuzijiaxun.json").then((i) => ({
            ...i,
            content: i.paragraphs,
        }));

        // 千家詩

        return Promise.all([...data, qianziwen, baijiaxing, zhuzijiaxun]); // 这里 data 直接 any 即可
    },
};

export const MengXue: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const MengXueIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
