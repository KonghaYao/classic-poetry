import { Divider, Space, Tag } from "@arco-design/web-react";
import { FC, useMemo } from "react";
import { PoetryHeader } from "../PoetryHeader";
import { TextPreProcess } from "../../utils/TextPreProcess";
import { useSetting } from "../../../Setting";
import "./ShowSinglePoetry.css";
import { History } from "../../../History";
import { useSearchParams } from "react-router-dom";
import { useMount } from "ahooks";
import { RestTime } from "../../utils/RestTime";
/** 每一行诗句的排版 */
const SingleRow: FC<{ index: number; content: string; name: string }> = ({
    index,
    content,
    name,
}) => {
    let [searchParams, setSearchParams] = useSearchParams();

    return (
        <nav
            className="single-content box-row long-list-item"
            onClick={() => {
                searchParams.set("position", index.toString());
                setSearchParams(searchParams);
                History.add(name);
            }}>
            <span className="poetry-index">{index + 1}</span>
            <div className="poetry-text" style={{ fontSize: "1em" }}>
                {TextPreProcess(content)}
            </div>
        </nav>
    );
};

/** 显示脚注的组件 */
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
    notes?: string[];
    footer?: JSX.Element;
};

export const ShowSinglePoetry: FC<PageInfo> = (props) => {
    const textCount = props.content.reduce((col, cur) => {
        const m: string = cur.replace(/[^\u4e00-\u9fff\uf900-\ufaff]/g, "");
        return col + m.length;
    }, 0);
    const { setting } = useSetting();
    const fontWeight = useMemo(() => setting.text.fontWeight, [setting]);
    // 历史记录的操作
    History.add(props.title);
    const [searchParams] = useSearchParams();
    const toPosition = () => {
        const pos = searchParams.get("position");
        if (typeof pos === "string") {
            setTimeout(() => {
                const els = document.getElementsByClassName("single-content")!;
                const el = els[parseInt(pos)];
                console.log("Logger 历史自动复原");
                el.scrollIntoView({
                    block: "start",
                    inline: "start",
                });
            }, 1000);
        }
    };
    useMount(async () => {
        await RestTime();
        toPosition();
    });
    // 单独诗句排版
    return (
        <div
            className="box-col content-max poetry-wrapper no-scroll"
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
                className="box-col poetry-content "
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
                                name={props.title}
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
