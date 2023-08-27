import type { InnerObjectType } from "../../poetry/components/BookGenerator";
import { BookContext } from "../../poetry/components/BookGenerator/BookContext";
import "./footer.css";
import type { PageInfo } from "./ShowSinglePoetry";
import type { Component } from "solid-js";
const SingleBar: Component<{
    data: PageInfo | false;
    subTitle: string;
    icon?: JSX.Element;
    reverse?: boolean;
}> = (props) => {
    if (props.data === false) return <></>;
    return (
        <a
            href={"/searchContent"}
            class="box-row router"
            style={{
                "flex-direction": props.reverse ? "row-reverse" : "row",
            }}>
            <header class="box-row">{props.data.title}</header>
            <div class="flex-1"> </div>
            <nav class="subtitle">{props.subTitle}</nav>
        </a>
    );
};

export const PoetryFooter = ({
    prev,
    next,
    info,
}: {
    prev: InnerObjectType;
    next: InnerObjectType;
    info: InnerObjectType;
}) => {
    return (
        <>
            {info.author && (
                <div class="author-name">
                    {info.author}
                    <span>文</span>
                </div>
            )}

            <div class="box-row poetry-router">
                {/*  TODO 改样式为古籍样式较好 */}
                <SingleBar data={prev} subTitle="上一章节" reverse></SingleBar>

                <SingleBar data={next} subTitle="下一章节"></SingleBar>
            </div>
        </>
    );
};
