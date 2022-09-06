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
    paragraphs: string[];
}[];
/** 统一请求地址 */
export const requestFragment = {
    async getData(path: string) {
        const pre = "sishuwujing/";
        const data = ["daxue.json", "zhongyong.json", "mengzi.json"].map((i) =>
            BookStore.getBook(pre + i)
        );
        return (await Promise.all<FetchData>(data as any)).flat(); // 这里 data 直接 any 即可
    },
    url: "",
};
export const SiShuWuJing: FC = () => {
    let { poetryId } = useParams()!;

    return Requester<FetchData>({
        ...requestFragment,
        element: (data) => {
            const poetryIndex = data.findIndex((i) => i.chapter === poetryId)!;
            const poetry = data[poetryIndex];
            const Content = poetry ? (
                <ShowSinglePoetry
                    title={poetry.chapter}
                    content={poetry.paragraphs}
                    footer={
                        <PoetryFooter
                            prev={
                                poetryIndex !== 0 && {
                                    text: data[poetryIndex - 1].chapter,
                                    to: `/sishuwujing/${
                                        data[poetryIndex - 1].chapter
                                    }`,
                                }
                            }
                            next={
                                poetryIndex !== data.length - 1 && {
                                    text: data[poetryIndex + 1].chapter,
                                    to: `/sishuwujing/${
                                        data[poetryIndex + 1].chapter
                                    }`,
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
