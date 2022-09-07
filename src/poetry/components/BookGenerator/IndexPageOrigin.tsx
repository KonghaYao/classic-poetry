import { Grid } from "@arco-design/web-react";
import { NavLink } from "react-router-dom";
import { BookConverter, BookFetch } from "./BookFetch";
import { wrapAdapter } from "./Tagger";

export function IndexPageOrigin<T>({
    getData,
    adapter,
    title,
    root,
}: BookConverter<T> & { title: string; root: string }) {
    return (
        <BookFetch
            getData={getData}
            adapter={wrapAdapter(adapter)}
            element={(data) => {
                return (
                    <div
                        className="box-col"
                        style={{
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }}>
                        <div
                            className="box-col content-max"
                            style={{
                                height: "100%",
                                flex: "1",
                            }}>
                            <div>
                                <div className="Index-Seal">{title}</div>
                            </div>
                            <div
                                className="box-col"
                                style={{
                                    flex: "1",
                                    justifyContent: "center",
                                    borderTop: "3px solid var(--divide-red)",
                                    borderBottom: "3px solid var(--divide-red)",
                                    margin: "1rem 0 ",
                                    padding: "1rem 0 ",
                                    display: "block",
                                    overflow: "auto",
                                }}>
                                <Grid.Row
                                    style={{ fontSize: "1.5rem" }}
                                    justify="start">
                                    {data.map((i, index) => {
                                        return (
                                            <Grid.Col
                                                span={12}
                                                key={"to-" + i.tag}
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
                                </Grid.Row>
                            </div>
                        </div>
                    </div>
                );
            }}></BookFetch>
    );
}