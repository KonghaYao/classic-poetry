import {
    Divider,
    PageHeader,
    Space,
    Statistic,
    Typography,
} from "@arco-design/web-react";
import { IconArrowLeft, IconArrowRight } from "@arco-design/web-react/icon";
import { FC } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const SingleBar: FC<{
    data: { text: string; to: string } | false;
    subTitle: string;
    icon?: JSX.Element;
    reverse?: boolean;
}> = (props) => {
    if (props.data === false) return <></>;
    return (
        <NavLink
            to={props.data.to}
            className="box-row"
            style={{
                flex: "1",
                flexDirection: props.reverse ? "row-reverse" : "row",
                border: "1px solid var(--color-border)",
                margin: "2rem 1rem",
                cursor: "pointer",
                padding: "1rem",
                borderRadius: "8px",
                alignItems: "center",
            }}>
            <div className="box-col">
                <Typography.Text type="secondary">
                    {props.subTitle}
                </Typography.Text>
                <div
                    style={{
                        fontSize: "1.4rem",
                    }}>
                    {props.data.text}
                </div>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>{props.icon}</div>
        </NavLink>
    );
};

export const PoetryFooter: FC<{
    prev: { text: string; to: string } | false;
    next: { text: string; to: string } | false;
}> = (props) => {
    return (
        <div
            className="box-row"
            style={{
                width: "100%",
            }}>
            {/*  TODO 改样式为古籍样式较好 */}
            <SingleBar
                data={props.prev}
                subTitle="上一章节"
                reverse
                icon={
                    <IconArrowLeft style={{ fontSize: "1.5rem" }} />
                }></SingleBar>
            <SingleBar
                data={props.next}
                subTitle="下一章节"
                icon={
                    <IconArrowRight style={{ fontSize: "1.5rem" }} />
                }></SingleBar>
        </div>
    );
};
