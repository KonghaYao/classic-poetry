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

const SingleLink = (str: string, to?: string) => {
    return (
        <NavLink
            key={"to-" + str}
            to={to || `/sishuwujing/${str}`}
            style={{
                fontSize: "1.125rem",
            }}>
            {str}
        </NavLink>
    );
};

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
                            <Space
                                wrap
                                style={{
                                    fontSize: "1.5rem",
                                    textAlign: "center",
                                }}
                                split="|">
                                {ExtraLink.map((i) => {
                                    return SingleLink(i.title, i.to);
                                })}
                                {data.map((i) => {
                                    return SingleLink(i.chapter);
                                })}
                            </Space>
                        </div>
                    </div>
                </div>
            );
        },
    });
};
