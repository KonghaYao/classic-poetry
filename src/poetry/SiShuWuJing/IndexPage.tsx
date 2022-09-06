import { Grid, Tag } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Requester } from "../components/Requester";
import { FetchData, requestFragment } from "./SiShuWuJing";

export const ExtraLink = [
    {
        title: "论语",
        to: "/lunyu",
    },
];

export const IndexPage: FC = function () {
    return Requester<FetchData>({
        ...requestFragment,
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
                            <div className="Index-Seal">四书五经</div>
                        </div>
                        <div
                            className="box-col"
                            style={{
                                flex: "1",
                                justifyContent: "center",
                                borderTop: "3px solid var(--divide-red)",
                                borderBottom: "3px solid var(--divide-red)",
                                margin: "2rem 0 ",
                            }}>
                            <Grid.Row
                                style={{ fontSize: "1.5rem" }}
                                justify="start">
                                {data.map((i) => {
                                    return (
                                        <Grid.Col
                                            span={4}
                                            key={"to-" + i.chapter}>
                                            <NavLink
                                                to={`/sishuwujing/${i.chapter}`}>
                                                <Tag
                                                    style={{
                                                        fontSize: "1.125rem",
                                                    }}>
                                                    {i.chapter}
                                                </Tag>
                                            </NavLink>
                                        </Grid.Col>
                                    );
                                })}
                                {ExtraLink.map((i) => {
                                    return (
                                        <Grid.Col
                                            span={4}
                                            key={"to-" + i.title}>
                                            <NavLink to={i.to}>
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
