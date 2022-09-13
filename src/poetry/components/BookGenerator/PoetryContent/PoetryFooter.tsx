import { Typography } from "@arco-design/web-react";
import { IconArrowLeft, IconArrowRight } from "@arco-design/web-react/icon";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { BookContext } from "../BookContext";
import { InnerObjectType } from "../CommonBook";
import "./footer.css";
const SingleBar: FC<{
    data: InnerObjectType | false;
    subTitle: string;
    icon?: JSX.Element;
    reverse?: boolean;
    root: string;
}> = (props) => {
    if (props.data === false) return <></>;
    return (
        <NavLink
            to={props.root + `/${props.data.tag}`}
            className="box-row router"
            style={{
                flexDirection: props.reverse ? "row-reverse" : "row",
            }}>
            <main className="box-row">
                <span
                    style={{
                        fontSize: "1.1em",
                    }}></span>
                {props.data.title}
            </main>
            <div style={{ flex: "1" }}> </div>
            <span className="subtitle">{props.subTitle}</span>
        </NavLink>
    );
};

export const PoetryFooter = () => {
    return (
        <BookContext.Consumer>
            {(info) => {
                const { matched, books, root } = info!;
                const index = books.findIndex((i) => i === matched);
                const prev = books[index - 1] || false;
                const next = books[index + 1] || false;
                return (
                    <>
                        {matched.author && (
                            <div className="author-name">
                                {matched.author}
                                <span>文</span>
                            </div>
                        )}

                        <div className="box-row poetry-router">
                            {/*  TODO 改样式为古籍样式较好 */}
                            <SingleBar
                                root={root}
                                data={prev}
                                subTitle="上一章节"
                                reverse
                                icon={
                                    <IconArrowLeft
                                        style={{ fontSize: "1.5rem" }}
                                    />
                                }></SingleBar>

                            <SingleBar
                                root={root}
                                data={next}
                                subTitle="下一章节"
                                icon={
                                    <IconArrowRight
                                        style={{ fontSize: "1.5rem" }}
                                    />
                                }></SingleBar>
                        </div>
                    </>
                );
            }}
        </BookContext.Consumer>
    );
};
