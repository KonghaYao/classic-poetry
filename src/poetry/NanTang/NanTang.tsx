import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator";
import { Route } from "react-router-dom";
type SingleData = {
    title: string;
    author: string;
    notes: string[];
    paragraphs: string[];
};
export type FetchData = SingleData[];

async function getData(): Promise<FetchData> {
    return BookStore.getBook("/wudai/nantang/poetrys.json");
}
const adapter = (i: SingleData) => {
    return { ...i, content: i.paragraphs };
};

const info = {
    title: "南唐二主词",
    root: "/nantang",
    adapter,
    getData,
};
export const NanTang: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const NanTangIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
export const NanTangRouter = () => (
    <>
        <Route path="/nantang" element={<NanTangIndex />}></Route>
        <Route path="/nantang/:poetryId" element={<NanTang />}></Route>
    </>
);
