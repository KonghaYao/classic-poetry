import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
    const Nav = useNavigate();
    return (
        <div
            onClick={() =>
                Nav(props.root + `/${(props.data as InnerObjectType).tag}`)
            }
            className="box-row router"
            style={{
                flexDirection: props.reverse ? "row-reverse" : "row",
            }}>
            <header className="box-row">{props.data.title}</header>
            <div style={{ flex: "1" }}> </div>
            <nav className="subtitle">{props.subTitle}</nav>
        </div>
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
                                reverse></SingleBar>

                            <SingleBar
                                root={root}
                                data={next}
                                subTitle="下一章节"></SingleBar>
                        </div>
                    </>
                );
            }}
        </BookContext.Consumer>
    );
};
