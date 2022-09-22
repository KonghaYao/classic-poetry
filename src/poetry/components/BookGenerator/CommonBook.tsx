import { Layout } from "@arco-design/web-react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { PageInfo, ShowSinglePoetry } from "./PoetryContent/ShowSinglePoetry";
import { NotFound } from "../404";
import { PoetryFooter } from "./PoetryContent/PoetryFooter";
import { SideBarWrapper, SideBarProps } from "./SideBar/SideBarInner";
import { BookConverter, BookFetch } from "./BookFetch";
import { Tagger, wrapAdapter } from "./Tagger";
import { BookContext } from "./BookContext";
import { NoteBar } from "./NoteBar";
import { useUnmount } from "ahooks";
import { AsyncLoad } from "../AsyncComponent";

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
    useUnmount(() => {
        console.log("书本销毁");
    });
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
                    <ShowSinglePoetry key={poetryId}></ShowSinglePoetry>
                ) : (
                    <NotFound></NotFound>
                );
                return (
                    <BookContext.Provider
                        value={{
                            books: data,
                            matched: poetry,
                            root,
                        }}>
                        <Layout
                            className="box"
                            style={{
                                overflow: "scroll",
                            }}>
                            <Layout.Sider
                                style={{
                                    width: "fit-content",
                                    height: "100%",
                                    overflow: "auto",
                                }}>
                                {/* 侧边栏 */}

                                <NoteBar></NoteBar>
                            </Layout.Sider>
                            <Layout.Content className="box-center">
                                {Content}
                            </Layout.Content>
                            <Layout.Sider
                                key={root + "-sidebar"}
                                style={{
                                    width: "fit-content",
                                    height: "100%",
                                    overflow: "auto",
                                }}>
                                {/* 侧边栏 */}

                                <SideBarWrapper {...props}></SideBarWrapper>
                            </Layout.Sider>
                        </Layout>
                    </BookContext.Provider>
                );
            }}></BookFetch>
    );
}
export type TaggerType<T> = {
    gen(i: T): string;
    match(i: any, tag: string): boolean;
};
