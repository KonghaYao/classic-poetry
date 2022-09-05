import { Layout } from "@arco-design/web-react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { root } from "../global";
import { Requester } from "../components/Requester";
import { ShowSinglePoetry } from "../components/ShowSinglePoetry";
import { NotFound } from "../components/404";
import { IndexPage } from "./IndexPage";
import { SideBar } from "./SideBar";

export type FetchData = {
    chapter: string;
    paragraphs: string[];
}[];

export const LunYu: FC = () => {
    let { poetryId } = useParams();

    return Requester<FetchData>({
        url: root + "lunyu/lunyu.json",
        element: (data) => {
            return (
                <Layout>
                    <Layout.Sider
                        style={{
                            width: "fit-content",
                            height: "100%",
                            overflow: "auto",
                        }}>
                        {/* 侧边栏 */}
                        <SideBar poetryId={poetryId!} data={data}></SideBar>
                    </Layout.Sider>
                    <Layout.Content>
                        {poetryId === "index" ? (
                            <IndexPage data={data}></IndexPage>
                        ) : (
                            (() => {
                                const poetry = data.find(
                                    (i) => i.chapter === poetryId
                                )!;
                                return poetry ? (
                                    <ShowSinglePoetry
                                        title={poetry.chapter}
                                        content={
                                            poetry.paragraphs
                                        }></ShowSinglePoetry>
                                ) : (
                                    <NotFound></NotFound>
                                );
                            })()
                        )}
                    </Layout.Content>
                </Layout>
            );
        },
    });
};
