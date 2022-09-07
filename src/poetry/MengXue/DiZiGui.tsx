import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import {
    CommonBook,
    IndexPageOrigin,
    ObjectProvider,
} from "../components/BookGenerator/index";
type SingleData = {
    chapter: string;
    paragraphs: string[];
};
export type FetchData = {
    title: string;
    author: string;
    content: SingleData[];
};

const info = {
    title: "弟子规",
    root: "/dizigui",
    adapter(i: SingleData) {
        return {
            ...i,
            title: i.chapter,
            content: i.paragraphs,
        };
    },
    getData(): Promise<SingleData[]> {
        return BookStore.getBook<{
            title: string;
            author: string;
            content: {
                chapter: string;
                paragraphs: string[];
            }[];
        }>("/mengxue/dizigui.json").then((i) => i.content);
    },
};
export const DiZiGui: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const DiZiGuiIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
