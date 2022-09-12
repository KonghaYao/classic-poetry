import { Divider, Space } from "@arco-design/web-react";
import { FC, useMemo } from "react";
import { PoetryHeader } from "./PoetryHeader";
import { TextPreProcess } from "../../../utils/TextPreProcess";
import { useSetting } from "../../../../Setting";
import "./ShowSinglePoetry.css";
import { History } from "../../../../History";
import { useSearchParams } from "react-router-dom";
import { useMount } from "ahooks";
import { RestTime } from "../../../utils/RestTime";
import debounce from "lodash/debounce";
import { BookContext, BookContextType } from "../BookContext";
/** 每一行诗句的排版 */
const SingleRow: FC<{ index: number; content: string; name: string }> = ({
    index,
    content,
    name,
}) => {
    const { setting } = useSetting();
    const direction = useMemo(() => setting.theme.cnList === "竖排", [setting]);
    let [searchParams, setSearchParams] = useSearchParams();
    const RecordMe = () => {
        searchParams.set("position", index.toString());
        setSearchParams(searchParams);
        History.add(name);
    };
    return (
        <li
            className={`single-content box-row ${
                direction ? "" : "long-list-item"
            }`}
            onPointerDown={RecordMe}
            onPointerMove={debounce(() => {
                RecordMe();
            }, 500)}>
            {/* <span className="poetry-index">{index + 1}</span> */}
            <div className="poetry-text" style={{ fontSize: "1em" }}>
                {TextPreProcess(content)}
            </div>
        </li>
    );
};

/** 显示脚注的组件 */
const NotsShower: FC<{ notes: string[] }> = ({ notes }) => {
    return (
        <>
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
};

export const ShowSinglePoetry: FC = () => {
    const { setting } = useSetting();
    const direction = useMemo(() => setting.theme.cnList === "竖排", [setting]);
    const fontWeight = useMemo(() => setting.text.fontWeight, [setting]);
    return (
        <BookContext.Consumer>
            {(info) => {
                const { matched } = info!;
                return (
                    <div
                        className={`poetry-wrapper ${
                            direction
                                ? "box-row poetry-vertical"
                                : "box-col content-max no-scroll"
                        }`}
                        style={{
                            fontWeight,
                        }}>
                        <PoetryHeader></PoetryHeader>

                        <main
                            className={`poetry-content ${
                                direction ? "box-row" : "box-col"
                            }`}>
                            <PoetryContent {...info!}></PoetryContent>
                            {matched.notes && (
                                <NotsShower notes={matched.notes}></NotsShower>
                            )}
                        </main>
                        {/* <PoetryFooter></PoetryFooter> */}
                    </div>
                );
            }}
        </BookContext.Consumer>
    );
};
export const PoetryContent: FC<BookContextType> = (props) => {
    const { matched } = props!;
    // 历史记录的操作
    History.add(matched.title);
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

    const { setting } = useSetting();
    const direction = useMemo(() => setting.theme.cnList === "竖排", [setting]);
    // 单独诗句排版
    return (
        <ul
            style={{
                flex: "1",
            }}>
            {matched.content.map((i, index) => {
                return (
                    <>
                        <SingleRow
                            name={matched.title}
                            key={matched.title + "-" + index}
                            index={index}
                            content={i}></SingleRow>

                        <Divider
                            type={direction ? "vertical" : "horizontal"}
                            style={{ height: direction ? "100%" : "" }}
                        />
                    </>
                );
            })}
        </ul>
    );
};
