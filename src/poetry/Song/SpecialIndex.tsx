import { Grid } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { IndexPage } from "../components/BookGenerator";
import { NumberToCN } from "../utils/NumberToCN";

export const AllIndex: FC = () => {
    const data = [...Array(255).keys()].map((i) => {
        return {
            title: i,
            tag: i * 1000,
        };
    });
    return (
        <IndexPage title={"全宋词集"}>
            <Grid.Row gutter={12}>
                {data.map((i) => {
                    return (
                        <Grid.Col span={6} key={"to-" + i.tag}>
                            <NavLink to={"/song/" + i.tag}>
                                <div style={{ margin: "0.25rem 0" }}>
                                    其 {NumberToCN((i.title + 1).toString())}
                                </div>
                            </NavLink>
                        </Grid.Col>
                    );
                })}
            </Grid.Row>
        </IndexPage>
    );
};
