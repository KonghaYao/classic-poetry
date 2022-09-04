import { FC } from "react";
import { PoetryHeader } from "./PoetryHeader";

export const ShowSinglePoetry: FC<{
    title: string;
    subTitle?: string;
    author?: string;
    content: string[];
}> = (props) => {
    // 单独诗句排版
    return (
        <>
            <PoetryHeader
                title={props.title}
                subTitle={props.subTitle}
                textCount={props.content.reduce(
                    (col, cur) => col + cur.length,
                    0
                )}></PoetryHeader>
            <div
                style={{
                    display: "flex",
                    overflow: "auto",
                    flexDirection: "column",
                }}>
                {props.content.map((i) => {
                    return <p>{i}</p>;
                })}
            </div>
        </>
    );
};
