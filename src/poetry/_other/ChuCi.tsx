import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator";
type SingleData = {
    title: string;
    section: string;
    author: string;
    content: string[];
};
export type FetchData = SingleData[];

const info = {
    title: "楚辞",
    root: "/chuci",
    adapter(i: SingleData) {
        return i;
    },
    async getData(): Promise<FetchData> {
        return BookStore.getBook(
            "https://cdn.jsdelivr.net/gh/chinese-poetry/chinese-poetry/chuci/chuci.json",
            true
        );
    },
};
export const ChuCi: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const ChuCiIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
