import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator";
import { Route } from "react-router-dom";
type SingleData = {
    author: string;
    dynasty: string;
    paragraphs: string[];
    title: string;
};
export type FetchData = SingleData[];

const info = {
    title: "元曲",
    root: "/yuanqu",
    adapter(i: SingleData) {
        return { ...i, content: i.paragraphs };
    },
    async getData(): Promise<FetchData> {
        return BookStore.getBook("yuanqu/yuanqu.json");
    },
};
export const YuanQu: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

//TODO 元曲内容非常多，而且名称真诡异。。。
export const YuanQuIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
export const YuanQuRouter = () => (
    <>
        <Route path="/yuanqu" element={<YuanQuIndex />}></Route>
        <Route path="/yuanqu/:poetryId" element={<YuanQu />}></Route>
    </>
);
