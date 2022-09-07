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
    notes: string[];
    paragraphs: string[];
};
export type FetchData = SingleData[];

export const Tagger = {
    gen(i: SingleData) {
        return [i.title, i.author, i.paragraphs[0].slice(0, 3)].join("-");
    },
    parse(i: string) {
        const [title, author, paragraphs] = i.split("-");
        return {
            title,
            author,
            paragraphs: new RegExp("^" + paragraphs),
        };
    },
    match(i: any, tag: string) {
        const { title, author, paragraphs } = this.parse(tag);
        return (
            i.title === title &&
            i.author === author &&
            paragraphs.test(i.paragraphs[0])
        );
    },
};
export const getData = {
    async getData(): Promise<FetchData> {
        return BookStore.getBook("/wudai/nantang/poetrys.json");
    },
    url: "",
};
export const NanTang: FC = () => {
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
                    subTitle={"五代 | " + poetry.author}
                    content={poetry.paragraphs}
                    notes={poetry.notes}
                    footer={
                        <PoetryFooter
                            prev={
                                poetryIndex !== 0 && {
                                    text: data[poetryIndex - 1].title,
                                    to: `/nantang/${Tagger.gen(
                                        data[poetryIndex - 1]
                                    )}`,
                                }
                            }
                            next={
                                poetryIndex !== data.length - 1 && {
                                    text: data[poetryIndex + 1].title,
                                    to: `/nantang/${Tagger.gen(
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
