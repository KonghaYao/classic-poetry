import { Layout, Menu } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink, useParams } from "react-router-dom";
import { root } from "./global";
import { Requester } from "./components/Requester";
import { ShowSinglePoetry } from "./components/ShowSinglePoetry";
import { NotFound } from "./components/404";

export const LunYu: FC = () => {
    let { poetryId } = useParams();

    return Requester<
        {
            chapter: string;
            paragraphs: string[];
        }[]
    >({
        url: root + "lunyu/lunyu.json",
        element: (data) => {
            return (
                <Layout>
                    <Layout.Sider
                        style={{
                            height: "100%",
                            overflow: "auto",
                        }}>
                        <Menu
                            defaultOpenKeys={[poetryId!]}
                            style={{
                                width: "100%",
                                display: "flex",
                                overflow: "auto",
                            }}>
                            {data.map((i) => {
                                return (
                                    <Menu.Item key={i.chapter}>
                                        <NavLink to={`/lunyu/${i.chapter}`}>
                                            {i.chapter}
                                        </NavLink>
                                    </Menu.Item>
                                );
                            })}
                        </Menu>
                    </Layout.Sider>
                    <Layout.Content>
                        {poetryId === "index" ? (
                            <div>
                                {data.map((i) => {
                                    return (
                                        <NavLink
                                            key={"to-" + i.chapter}
                                            to={`/lunyu/${i.chapter}`}>
                                            {i.chapter}
                                        </NavLink>
                                    );
                                })}
                            </div>
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
