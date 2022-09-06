import { Layout } from "@arco-design/web-react";
import { FC } from "react";
import { useParams } from "react-router-dom";

import { Requester } from "../components/Requester";
import { ShowSinglePoetry } from "../components/ShowSinglePoetry";
import { NotFound } from "../components/404";
import { SideBar } from "./SideBar";
import { PoetryFooter } from "../components/PoetryFooter";

import { BookStore } from "../utils/BookStore";

export type FetchData = {
    chapter: string;
    title: string;
    section: string;
    content: string[];
}[];

export const ShiJing: FC = () => {
    let { poetryId } = useParams()!;
    const [Chapter, Section, Title] = poetryId!.split("-");
    return Requester<FetchData>({
        getData(path) {
            return BookStore.getBook(path);
        },
        url: "shijing/shijing.json",
        element: (data) => {
            // 诗经的篇章名称重合，故采用这种方式
            const poetryIndex = data.findIndex((i) => {
                return (
                    i.chapter === Chapter &&
                    i.section === Section &&
                    i.title === Title
                );
            });
            const poetry = data[poetryIndex];
            const Content = poetry ? (
                <ShowSinglePoetry
                    title={poetry.title}
                    subTitle={poetry.chapter + " | " + poetry.section}
                    content={poetry.content}
                    footer={
                        <PoetryFooter
                            prev={
                                poetryIndex !== 0 && {
                                    text: data[poetryIndex - 1].title,
                                    to: `/shijing/${[
                                        data[poetryIndex - 1].chapter,
                                        data[poetryIndex - 1].section,
                                        data[poetryIndex - 1].title,
                                    ].join("-")}`,
                                }
                            }
                            next={
                                poetryIndex !== data.length - 1 && {
                                    text: data[poetryIndex + 1].title,
                                    to: `/shijing/${[
                                        data[poetryIndex - 1].chapter,
                                        data[poetryIndex - 1].section,
                                        data[poetryIndex - 1].title,
                                    ].join("-")}`,
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
