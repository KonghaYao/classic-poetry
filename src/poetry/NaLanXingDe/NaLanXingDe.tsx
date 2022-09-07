import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator/index";
type SingleData = {
    title: string;
    author: string;
    para: string[];
};
export type FetchData = SingleData[];

const info = {
    title: "纳兰性德诗集",
    root: "/nalanxingde",
    adapter(i: SingleData) {
        return { ...i, content: i.para };
    },
    getData(): Promise<FetchData> {
        return BookStore.getBook(
            "https://cdn.jsdelivr.net/gh/chinese-poetry/chinese-poetry/nalanxingde/纳兰性德诗集.json",
            true
        );
    },
};
export const NaLanXingDe: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const NaLanXingDeIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
