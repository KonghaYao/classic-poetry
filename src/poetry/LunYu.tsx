import { Layout, Menu, PageHeader, Statistic } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink, useParams } from "react-router-dom";
import { root } from "./global";
import { Requester } from "./components/Requester";

const PoetryHeader: FC<{
    title: string;
    subTitle?: string;
    textCount: number;
}> = (props) => {
    return (
        <PageHeader
            title={props.title}
            subTitle={props.subTitle}
            extra={
                // TODO 勘误功能
                <Statistic
                    title="字数"
                    value={props.textCount}
                    suffix="字"
                    groupSeparator
                    style={{ marginRight: 60 }}
                />
            }
        />
    );
};
const ShowSinglePoetry: FC<{
    title: string;
    subTitle?: string;
    author?: string;
    content: string[];
}> = (props) => {
    // 单独诗句排版
    return (
        <>
            <PoetryHeader
                title={props.title}
                subTitle={props.subTitle}
                textCount={props.content.reduce(
                    (col, cur) => col + cur.length,
                    0
                )}></PoetryHeader>
            <div
                style={{
                    display: "flex",
                    overflow: "auto",
                    flexDirection: "column",
                }}>
                {props.content.map((i) => {
                    return <p>{i}</p>;
                })}
            </div>
        </>
    );
};
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
                                    // TODO 404 页面
                                    <div>404</div>
                                );
                            })()
                        )}
                    </Layout.Content>
                </Layout>
            );
        },
    });
};
