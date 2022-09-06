import { Grid, Tag } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Requester } from "../components/Requester";
import type { FetchData } from "./ShiJing";
import { BookStore } from "../utils/BookStore";

export const IndexPage: FC = function () {
    return Requester<FetchData>({
        getData(path) {
            return BookStore.getBook(path);
        },
        url: "shijing/shijing.json",
        element: (data) => {
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
                            <div className="Index-Seal">诗经</div>
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
                                            span={4}
                                            key={
                                                "to-" +
                                                [
                                                    i.chapter,
                                                    i.section,
                                                    i.title,
                                                ].join("-")
                                            }>
                                            <NavLink
                                                to={`/shijing/${[
                                                    i.chapter,
                                                    i.section,
                                                    i.title,
                                                ].join("-")}`}>
                                                <Tag
                                                    style={{
                                                        fontSize: "1.125rem",
                                                    }}>
                                                    {i.title}
                                                </Tag>
                                            </NavLink>
                                        </Grid.Col>
                                    );
                                })}
                            </Grid.Row>
                        </div>
                    </div>
                </div>
            );
        },
    });
};
