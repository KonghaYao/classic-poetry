import { Grid, Space, Tag } from "@arco-design/web-react";
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
                                margin: "1rem 0 ",
                                padding: "1rem 0 ",
                                display: "block",
                                overflow: "auto",
                            }}>
                            <Space wrap style={{ fontSize: "1.5rem" }}>
                                {data.map((i) => {
                                    return (
                                        <NavLink
                                            key={"to-" + i.chapter}
                                            to={`/sishuwujing/${i.chapter}`}>
                                            <Tag
                                                style={{
                                                    fontSize: "1.125rem",
                                                }}>
                                                {i.chapter}
                                            </Tag>
                                        </NavLink>
                                    );
                                })}
                                {ExtraLink.map((i) => {
                                    return (
                                        <NavLink
                                            to={i.to}
                                            key={"to-" + i.title}>
                                            <Tag
                                                style={{
                                                    fontSize: "1.125rem",
                                                }}>
                                                {i.title}
                                            </Tag>
                                        </NavLink>
                                    );
                                })}
                            </Space>
                        </div>
                    </div>
                </div>
            );
        },
    });
};
