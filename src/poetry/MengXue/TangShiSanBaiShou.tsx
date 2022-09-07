import { FC } from "react";

import { BookStore } from "../utils/BookStore";
import {
    CommonBook,
    IndexPageOrigin,
    ObjectProvider,
} from "../components/BookGenerator/index";
type SingleData = {
    chapter: string;
    subchapter: string;
    author: string;
    paragraphs: string[];
};
export type FetchData = {
    title: string;
    content: {
        type: string;
        content: SingleData[];
    }[];
};

const info = {
    title: "唐诗三百首",
    root: "/tangshisanbaishou",
    adapter(i: SingleData) {
        return {
            ...i,
            subTitle: i.subchapter,
            title: i.chapter,
            content: i.paragraphs,
        };
    },
    getData(): Promise<SingleData[]> {
        return BookStore.getBook<FetchData>(
            "/mengxue/tangshisanbaishou.json"
        ).then((i) => i.content.flatMap((i) => i.content));
    },
};
export const TangShiSanBaiShou: FC = () => {
    return <CommonBook {...info}></CommonBook>;
};

export const TangShiSanBaiShouIndex: FC = () => {
    return <IndexPageOrigin {...info}></IndexPageOrigin>;
};
