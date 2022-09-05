import { Divider, PageHeader, Space, Statistic } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const PoetryFooter: FC<{
    prev: { text: string; to: string } | false;
    next: { text: string; to: string } | false;
}> = (props) => {
    return (
        <Space>
            <div>
                {props.prev && (
                    <NavLink to={props.prev.to}>{props.prev.text}</NavLink>
                )}
            </div>
            <div>
                {props.next && (
                    <NavLink to={props.next.to}>{props.next.text}</NavLink>
                )}
            </div>
        </Space>
    );
};
