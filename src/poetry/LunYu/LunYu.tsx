import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator/index";
type SingleData = {
    chapter: string;
    paragraphs: string[];
};
export type FetchData = SingleData[];

const info = {
    title: "论语",
    root: "/lunyu",
    adapter(i: SingleData) {
        return { title: i.chapter, content: i.paragraphs };
    },
    getData(): Promise<FetchData> {
        return BookStore.getBook("lunyu/lunyu.json");
    },
};
export const LunYu: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const LunYuIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
