import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import {
    CommonBook,
    IndexPageOrigin,
    ObjectProvider,
} from "../components/BookGenerator/index";
import { Route } from "react-router-dom";
type SingleData = {
    chapter: string;
    author: string;
    paragraphs: (string | { subchapter: string; paragraphs: string[] })[];
};
export type FetchData = {
    title: string;
    author: string;
    content: { type: string; content: SingleData[] }[];
};

const info = {
    title: "千家诗",
    root: "/qianjiashi",
    adapter(i: SingleData) {
        return {
            ...i,
            title: i.chapter,
            content: i.paragraphs
                .map((i) => {
                    if (typeof i === "string") return i;
                    return [i.subchapter, i.subchapter];
                })
                .flat(),
        };
    },
    getData(): Promise<SingleData[]> {
        return BookStore.getBook<FetchData>("/mengxue/qianjiashi.json").then(
            (i) => i.content.flatMap((i) => i.content)
        );
    },
};
export const QianJiaShi: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const QianJiaShiIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
export const QianJiaShiRouter = () => (
    <>
        <Route path="/qianjiashi" element={<QianJiaShiIndex />}></Route>
        <Route path="/qianjiashi/:poetryId" element={<QianJiaShi />}></Route>
    </>
);
