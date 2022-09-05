import { Divider, PageHeader, Statistic } from "@arco-design/web-react";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PoetryHeader: FC<{
    title: string;
    subTitle?: string;
    textCount: number;
}> = (props) => {
    const nav = useNavigate();
    return (
        <PageHeader
            title={props.title}
            subTitle={props.subTitle}
            backIcon
            style={{
                borderBottom: "2px solid var(--divide-red)",
            }}
            onBack={() => {
                nav(-1);
            }}
            extra={
                // TODO 勘误功能

                <div>
                    全文{" "}
                    <span style={{ fontSize: "1.125rem" }}>
                        {props.textCount}
                    </span>{" "}
                    字
                </div>
            }
        />
    );
};
