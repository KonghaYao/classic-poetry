import { Layout } from "@arco-design/web-react";
import { FC } from "react";
import { useParams } from "react-router-dom";

import { Requester } from "../components/Requester";
import { ShowSinglePoetry } from "../components/ShowSinglePoetry";
import { NotFound } from "../components/404";
import { SideBar } from "./SideBar";
import { PoetryFooter } from "../components/PoetryFooter";

import { BookStore } from "../utils/BookStore";
type SingleData = {
    title: string;
    author: string;
    para: string[];
};
export type FetchData = SingleData[];

export const Tagger = {
    gen(i: SingleData) {
        return i.title;
    },

    match(i: any, tag: string) {
        return i.title === tag;
    },
};
export const getData = {
    async getData(): Promise<FetchData> {
        return BookStore.getBook(
            "https://cdn.jsdelivr.net/gh/chinese-poetry/chinese-poetry/nalanxingde/纳兰性德诗集.json",
            true
        );
    },
    url: "",
};
export const NaLanXingDe: FC = () => {
    let { poetryId } = useParams()!;
    return Requester<FetchData>({
        ...getData,
        element: (data) => {
            // 诗经的篇章名称重合，故采用这种方式
            const poetryIndex = data.findIndex((i) => {
                return Tagger.match(i, poetryId!);
            });
            if (poetryIndex === -1)
                console.warn("在寻找诗篇的过程中发生了一个错误");
            const poetry = data[poetryIndex];
            const Content = poetry ? (
                <ShowSinglePoetry
                    title={poetry.title}
                    subTitle={poetry.author}
                    content={poetry.para}
                    footer={
                        <PoetryFooter
                            prev={
                                poetryIndex !== 0 && {
                                    text: data[poetryIndex - 1].title,
                                    to: `/nalanxingde/${Tagger.gen(
                                        data[poetryIndex - 1]
                                    )}`,
                                }
                            }
                            next={
                                poetryIndex !== data.length - 1 && {
                                    text: data[poetryIndex + 1].title,
                                    to: `/nalanxingde/${Tagger.gen(
                                        data[poetryIndex + 1]
                                    )}`,
                                }
                            }></PoetryFooter>
                    }></ShowSinglePoetry>
            ) : (
                <NotFound></NotFound>
            );
            return (
                <Layout>
                    <Layout.Content>{Content}</Layout.Content>
                    <Layout.Sider
                        style={{
                            width: "fit-content",
                            height: "100%",
                            overflow: "auto",
                        }}>
                        {/* 侧边栏 */}
                        <SideBar poetryId={poetryId!} data={data}></SideBar>
                    </Layout.Sider>
                </Layout>
            );
        },
    });
};
