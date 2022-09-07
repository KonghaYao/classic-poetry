import { Divider, Space, Tag } from "@arco-design/web-react";
import { FC } from "react";
import { PoetryHeader } from "./PoetryHeader";
import { TextPreProcess } from "../utils/TextPreProcess";
/** 每一行诗句的排版 */
const SingleRow: FC<{ index: number; content: string }> = ({
    index,
    content,
}) => {
    return (
        <Space>
            <Tag>{index + 1}</Tag>
            <span style={{ fontSize: "1em" }}>{TextPreProcess(content)}</span>
        </Space>
    );
};

export const ShowSinglePoetry: FC<{
    title: string;
    subTitle?: string;
    author?: string;
    content: string[];
    footer?: JSX.Element;
}> = (props) => {
    const textCount = props.content.reduce((col, cur) => {
        const m: string = cur.replace(/[^\u4e00-\u9fff\uf900-\ufaff]/g, "");
        return col + m.length;
    }, 0);
    // 单独诗句排版
    return (
        <div
            className="box-col content-max"
            style={{
                margin: "auto",
                overflow: "hidden",
                height: "100%",
                fontFamily: "var(--book-font-family)",
            }}>
            <PoetryHeader
                title={props.title}
                subTitle={props.subTitle}
                textCount={textCount}></PoetryHeader>
            <div
                className="box-col"
                style={{
                    overflow: "auto",
                    flex: "1",
                    padding: "2rem 1rem",
                    alignItems: "center",
                }}>
                <Space
                    split={<Divider />}
                    style={{ flex: "1" }}
                    direction="vertical">
                    {props.content.map((i, index) => {
                        return (
                            <SingleRow
                                key={props.title + "-" + index}
                                index={index}
                                content={i}></SingleRow>
                        );
                    })}
                </Space>

                {props.footer}
            </div>
        </div>
    );
};
