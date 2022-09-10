import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator";
import { Route } from "react-router-dom";
type SingleData = {
    rhythmic: string;
    title: string;
    author: string;
    notes: string[];
    paragraphs: string[];
};
export type FetchData = SingleData[];

const info = {
    title: "花间集",
    root: "/huajianji",
    adapter(i: SingleData) {
        return { ...i, content: i.paragraphs };
    },
    async getData(): Promise<FetchData> {
        const all = [
            "wudai/huajianji/huajianji-0-preface.json",
            ...[...Array(9).keys()].map(
                (i) => `wudai/huajianji/huajianji-${i + 1}-juan.json`
            ),
            "wudai/huajianji/huajianji-x-juan.json",
        ].map((i) => BookStore.getBook(i));
        return Promise.all(all).then((res) => res.flat() as FetchData);
    },
};
const HuaJianJi: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

const HuaJianJiIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
export const HuaJianJiRouter = () => (
    <>
        <Route path="/huajianji" element={<HuaJianJiIndex />}></Route>
        <Route path="/huajianji/:poetryId" element={<HuaJianJi />}></Route>
    </>
);
