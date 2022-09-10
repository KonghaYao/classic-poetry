import { Layout } from "@arco-design/web-react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { PageInfo, ShowSinglePoetry } from "./ShowSinglePoetry";
import { NotFound } from "../404";
import { PoetryFooter } from "../PoetryFooter";
import { SideBarInner, SideBarProps } from "./SideBarInner";
import { BookConverter, BookFetch } from "./BookFetch";
import { Tagger, wrapAdapter } from "./Tagger";

export type ObjectProvider = Omit<PageInfo, "footer">;
export type InnerObjectType = ObjectProvider & { tag: string };

/** 读书页面的模板 */
export function CommonBook<T>(
    props: {
        root: string;
    } & BookConverter<T> &
        Omit<SideBarProps, "data">
) {
    const { root, getData, adapter } = props;
    let { poetryId } = useParams()!;

    return (
        <BookFetch
            getData={getData}
            root={root}
            adapter={wrapAdapter(adapter)}
            element={(data) => {
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
                        content={poetry.content}
                        footer={
                            <PoetryFooter
                                prev={
                                    poetryIndex !== 0 && {
                                        text: data[poetryIndex - 1].title,
                                        to:
                                            root +
                                            `/${data[poetryIndex - 1].tag}`,
                                    }
                                }
                                next={
                                    poetryIndex !== data.length - 1 && {
                                        text: data[poetryIndex + 1].title,
                                        to:
                                            root +
                                            `/${data[poetryIndex + 1].tag}`,
                                    }
                                }></PoetryFooter>
                        }></ShowSinglePoetry>
                ) : (
                    <NotFound></NotFound>
                );
                return (
                    <Layout
                        className="box"
                        style={{
                            overflow: "scroll",
                        }}>
                        <Layout.Content>{Content}</Layout.Content>
                        <Layout.Sider
                            style={{
                                width: "fit-content",
                                height: "100%",
                                overflow: "auto",
                            }}>
                            {/* 侧边栏 */}
                            <SideBarInner {...props} data={data}></SideBarInner>
                        </Layout.Sider>
                    </Layout>
                );
            }}></BookFetch>
    );
}
export type TaggerType<T> = {
    gen(i: T): string;
    match(i: any, tag: string): boolean;
};
