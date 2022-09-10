import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator";
import { Route } from "react-router-dom";
type SingleData = {
    title: string;
    paragraphs: string[];
};
export type FetchData = SingleData[];

const info = {
    title: "曹操诗集",
    root: "/caocaoshiji",
    adapter(i: SingleData) {
        return { ...i, content: i.paragraphs, author: "曹操" };
    },
    async getData(): Promise<FetchData> {
        return BookStore.getBook("caocaoshiji/caocao.json");
    },
};
export const CaoCaoShiJi: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const CaoCaoShiJiIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
export const CaoCaoShiJiRouter = () => (
    <>
        <Route path="/caocaoshiji" element={<CaoCaoShiJiIndex />}></Route>
        <Route path="/caocaoshiji/:poetryId" element={<CaoCaoShiJi />}></Route>
    </>
);
