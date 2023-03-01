import { Grid } from "@arco-design/web-react";
import { NavLink } from "react-router-dom";
import { BookConverter, BookFetch } from "./BookFetch";
import { wrapAdapter } from "./Tagger";
import "./IndexPage.css";
import { IndexPage } from "./IndexPage";
export function IndexPageOrigin<T>({
    getData,
    adapter,
    title,
    root,
    ExtraLink,
}: BookConverter<T> & {
    title: string;
    ExtraLink?: JSX.Element | JSX.Element[];
}) {
    return (
        <BookFetch
            root={root}
            getData={getData}
            adapter={wrapAdapter(adapter)}
            element={(data) => {
                return (
                    <IndexPage title={title}>
                        <Grid.Row
                            style={{ fontSize: "1.5rem" }}
                            justify="start">
                            {data.map((i, index) => {
                                return (
                                    <Grid.Col
                                        span={12}
                                        key={"to-" + i.tag}
                                        className="long-list-item"
                                        style={{
                                            textAlign: "center",
                                        }}>
                                        <NavLink
                                            to={`${root}/${i.tag}`}
                                            style={{
                                                fontSize: "1.125rem",
                                            }}>
                                            {i.title}
                                        </NavLink>
                                    </Grid.Col>
                                );
                            })}
                            {ExtraLink}
                        </Grid.Row>
                    </IndexPage>
                );
            }}></BookFetch>
    );
}
