import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator/index";
type SingleData = {
    title: string;
    author: string;
    para: string[];
};
export type FetchData = SingleData[];

async function getData(): Promise<FetchData> {
    return BookStore.getBook(
        "https://cdn.jsdelivr.net/gh/chinese-poetry/chinese-poetry/nalanxingde/纳兰性德诗集.json",
        true
    );
}
const adapter = (i: SingleData) => {
    return { ...i, content: i.para };
};
export const NaLanXingDe: FC = () => {
    return (
        <CommonBook
            root="/nalanxingde"
            adapter={adapter}
            getData={getData}></CommonBook>
    );
};

export const NaLanXingDeIndex: FC = () => {
    return <IndexPageOrigin {...{ getData, adapter }}></IndexPageOrigin>;
};
