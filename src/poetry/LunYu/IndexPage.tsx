import { Divider, Grid, Space, Tag } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FetchData } from "./LunYu";

export const IndexPage: FC<{ data: FetchData }> = function ({ data }) {
    return (
        <div
            className="box-col"
            style={{ alignItems: "center", height: "100%" }}>
            <div
                className="box-col content-max"
                style={{
                    borderTop: "3px solid var(--divide-red)",
                    borderBottom: "3px solid var(--divide-red)",
                    height: "100%",
                    flex: "1",
                    margin: "1rem 0",
                    padding: "2rem",
                }}>
                <div className="Index-Seal">论语</div>
                <Grid.Row style={{ fontSize: "1.5rem" }} justify="start">
                    {data.map((i) => {
                        return (
                            <Grid.Col span={4} key={"to-" + i.chapter}>
                                <NavLink to={`/lunyu/${i.chapter}`}>
                                    <Tag style={{ fontSize: "1.125rem" }}>
                                        {i.chapter}
                                    </Tag>
                                </NavLink>
                            </Grid.Col>
                        );
                    })}
                </Grid.Row>
            </div>
        </div>
    );
};
