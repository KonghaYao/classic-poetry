import { Typography } from "@arco-design/web-react";
import { IconArrowLeft, IconArrowRight } from "@arco-design/web-react/icon";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { BookContext } from "../BookContext";
import { InnerObjectType } from "../CommonBook";

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
            className="box-row"
            style={{
                flex: "1",
                flexDirection: props.reverse ? "row-reverse" : "row",
                border: "1px solid var(--color-border)",
                margin: "1rem 0.5rem",
                cursor: "pointer",
                padding: "1rem",
                borderRadius: "8px",
                alignItems: "center",
            }}>
            <div className="box-col">
                <Typography.Text type="secondary">
                    {props.subTitle}
                </Typography.Text>
                <div
                    style={{
                        fontSize: "1.4rem",
                    }}>
                    {props.data.title}
                </div>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>{props.icon}</div>
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
                    <div
                        className="box-row"
                        style={{
                            width: "100%",
                        }}>
                        {/*  TODO 改样式为古籍样式较好 */}
                        <SingleBar
                            root={root}
                            data={prev}
                            subTitle="上一章节"
                            reverse
                            icon={
                                <IconArrowLeft style={{ fontSize: "1.5rem" }} />
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
                );
            }}
        </BookContext.Consumer>
    );
};
