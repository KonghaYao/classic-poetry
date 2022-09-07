import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator/index";
type SingleData = {
    chapter: string;
    title: string;
    section: string;
    content: string[];
};
export type FetchData = SingleData[];

async function getData(): Promise<FetchData> {
    return BookStore.getBook("shijing/shijing.json");
}
const adapter = (i: SingleData) => {
    /** @ts-ignore */
    i.subTitle = i.section;
    return i;
};

const info = {
    title: "诗经",
    root: "/shijing",
    adapter,
    getData,
};
export const ShiJing: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const ShiJingIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
