import { Divider, Space } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FetchData } from "./LunYu";

export const IndexPage: FC<{ data: FetchData }> = function ({ data }) {
    return (
        <Space wrap split={<Divider type="vertical" />}>
            {data.map((i) => {
                return (
                    <NavLink key={"to-" + i.chapter} to={`/lunyu/${i.chapter}`}>
                        {i.chapter}
                    </NavLink>
                );
            })}
        </Space>
    );
};
