import { Divider, Space, Tag } from "@arco-design/web-react";
import { FC, useMemo } from "react";
import { PoetryHeader } from "./PoetryHeader";
import { TextPreProcess } from "../utils/TextPreProcess";
import { useSetting } from "../../Setting";
import "./ShowSinglePoetry.css";
/** 每一行诗句的排版 */
const SingleRow: FC<{ index: number; content: string }> = ({
    index,
    content,
}) => {
    return (
        <nav className="single-content box-row long-list-item">
            <span className="poetry-index">{index + 1}</span>
            <div className="poetry-text" style={{ fontSize: "1em" }}>
                {TextPreProcess(content)}
            </div>
        </nav>
    );
};

const NotsShower: FC<{ notes: string[] }> = ({ notes }) => {
    return (
        <>
            <Divider></Divider>
            <div>
                {notes.map((i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                fontSize: "0.75em",
                            }}>
                            {i}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export type PageInfo = {
    title: string;
    subTitle?: string;
    author?: string;
    content: string[];
    footer?: JSX.Element;
    notes?: string[];
};
export const ShowSinglePoetry: FC<PageInfo> = (props) => {
    const textCount = props.content.reduce((col, cur) => {
        const m: string = cur.replace(/[^\u4e00-\u9fff\uf900-\ufaff]/g, "");
        return col + m.length;
    }, 0);
    const { setting } = useSetting();
    const fontWeight = useMemo(() => setting.text.fontWeight, [setting]);
    // 单独诗句排版
    return (
        <div
            className="box-col content-max poetry-wrapper"
            style={{
                margin: "auto",
                overflow: "hidden",
                height: "100%",
                fontFamily: "var(--book-font-family)",
                fontWeight,
            }}>
            <PoetryHeader
                title={props.title}
                subTitle={props.subTitle}
                textCount={textCount}></PoetryHeader>
            <main
                className="box-col poetry-content"
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
                {props.notes && <NotsShower notes={props.notes}></NotsShower>}
                {props.footer}
            </main>
        </div>
    );
};
