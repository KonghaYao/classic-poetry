import { Layout } from "@arco-design/web-react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { Setting } from "../global";
import { Requester } from "../components/Requester";
import { ShowSinglePoetry } from "../components/ShowSinglePoetry";
import { NotFound } from "../components/404";
import { IndexPage } from "./IndexPage";
import { SideBar } from "./SideBar";
import { PoetryFooter } from "../components/PoetryFooter";

export type FetchData = {
    chapter: string;
    paragraphs: string[];
}[];

export const LunYu: FC = () => {
    let { poetryId } = useParams()!;

    return Requester<FetchData>({
        url: Setting.root + "lunyu/lunyu.json",
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
                                    to: `/lunyu/${
                                        data[poetryIndex - 1].chapter
                                    }`,
                                }
                            }
                            next={
                                poetryIndex !== data.length - 1 && {
                                    text: data[poetryIndex + 1].chapter,
                                    to: `/lunyu/${
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
