import { Layout } from "@arco-design/web-react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { PageInfo, ShowSinglePoetry } from "../ShowSinglePoetry";
import { NotFound } from "../404";
import { PoetryFooter } from "../PoetryFooter";
import { SideBarInner } from "../SideBarInner";
import { BookConverter, BookFetch } from "./BookFetch";
export type InnerObjectType = Omit<PageInfo, "footer">;
export const Tagger: TaggerType<InnerObjectType> = {
    gen(i) {
        return [i.title, i.subTitle, i.author, i.content[0].slice(0, 3)].join(
            "-"
        );
    },
    match(i, tag) {
        return this.gen(i) === tag;
    },
};

export function CommonBook<T>({
    root,
    getData,
    adapter,
}: {
    root: string;
} & BookConverter<T>) {
    let { poetryId } = useParams()!;

    return (
        <BookFetch
            {...{ getData, adapter }}
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
                                            `/${Tagger.gen(
                                                data[poetryIndex - 1]
                                            )}`,
                                    }
                                }
                                next={
                                    poetryIndex !== data.length - 1 && {
                                        text: data[poetryIndex + 1].title,
                                        to:
                                            root +
                                            `/${Tagger.gen(
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
                            <SideBarInner
                                poetryId={poetryId!}
                                data={data}
                                root={root}
                                Tagger={Tagger}></SideBarInner>
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
