import { Divider, Space, Tag } from "@arco-design/web-react";
import { FC } from "react";
import { PoetryHeader } from "./PoetryHeader";

/** 每一行诗句的排版 */
const SingleRow: FC<{ index: number; content: string }> = ({
    index,
    content,
}) => {
    return (
        <Space>
            <Tag>{index + 1}</Tag>
            <span>{content}</span>
        </Space>
    );
};

export const ShowSinglePoetry: FC<{
    title: string;
    subTitle?: string;
    author?: string;
    content: string[];
}> = (props) => {
    // 单独诗句排版
    return (
        <div
            className="box-col"
            style={{
                overflow: "hidden",
                height: "100%",
            }}>
            <PoetryHeader
                title={props.title}
                subTitle={props.subTitle}
                textCount={props.content.reduce(
                    (col, cur) => col + cur.length,
                    0
                )}></PoetryHeader>
            {/* TODO 中文字体排版规则 */}
            <div
                style={{
                    overflow: "auto",
                    flex: "1",
                    padding: "4rem 1rem",
                }}>
                <div>
                    {props.content.map((i, index) => {
                        return (
                            <>
                                {index !== 0 && <Divider />}
                                <SingleRow
                                    index={index}
                                    content={i}></SingleRow>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
