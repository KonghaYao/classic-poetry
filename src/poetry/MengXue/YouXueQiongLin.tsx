import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import {
    CommonBook,
    IndexPageOrigin,
    ObjectProvider,
} from "../components/BookGenerator/index";
type SingleData = {
    title: string;
    content: {
        chapter: string;
        paragraphs: string[];
    }[];
};
export type FetchData = {
    title: string;
    author: string;
    content: SingleData[];
};

const info = {
    title: "幼学琼林",
    root: "/youxueqionglin",
    adapter(i: SingleData) {
        return {
            ...i,
            content: i.content.flatMap((item) => {
                return [item.chapter, ...item.paragraphs];
            }),
        };
    },
    getData(): Promise<SingleData[]> {
        return BookStore.getBook<FetchData>(
            "/mengxue/youxueqionglin.json"
        ).then((res) => res.content);
    },
};
export const YouXueQiongLin: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const YouXueQiongLinIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
