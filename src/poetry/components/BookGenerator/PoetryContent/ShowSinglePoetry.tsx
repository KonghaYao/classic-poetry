import { FC, useMemo } from "react";
import { PoetryHeader } from "./PoetryHeader";
import { useSetting } from "../../../../Setting";
import "./ShowSinglePoetry.css";
import { History } from "../../../../History";
import { useMount } from "ahooks";
import { RestTime } from "../../../utils/RestTime";
import { BookContext, BookContextType } from "../BookContext";
import { NotsShower } from "./NotsShower";
import { SingleRow } from "./SingleRow";
import { PoetryFooter } from "./PoetryFooter";
import { useFontChange } from "../../../../App/useFontChange";
import { usePositionRecord } from "./usePositionRecord";
export type PageInfo = {
    title: string;
    subTitle?: string;
    author?: string;
    content: string[];
    notes?: string[];
};

export const ShowSinglePoetry: FC = () => {
    const { setting } = useSetting();
    const direction = useMemo(
        () => setting.theme.cnList === "竖排",
        [setting.theme.cnList]
    );
    const { slot: FontSlot } = useFontChange(); // 添加字体加载 link，这样才能使用
    return (
        <BookContext.Consumer>
            {(info) => {
                return (
                    <div
                        className={`poetry-wrapper ${
                            direction
                                ? "box-row poetry-vertical"
                                : "box-col content-max no-scroll"
                        }`}
                        style={{
                            fontFamily: setting.text.font.fontFamily,
                            fontWeight: setting.text.fontWeight,
                            fontSize: setting.text.fontSize,
                            letterSpacing: setting.text.letterSpacing + "em",
                        }}>
                        <PoetryHeader></PoetryHeader>

                        <main className={`poetry-content box-col`}>
                            <PoetryContent {...info!}></PoetryContent>
                            {/* TODO Notes 暂时不适配 */}
                            {/* {matched.notes && (
                                <NotsShower notes={matched.notes}></NotsShower>
                            )} */}
                            <PoetryFooter></PoetryFooter>
                        </main>
                        <FontSlot></FontSlot>
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
    const { toPosition, RecordMe } = usePositionRecord();
    useMount(async () => {
        await RestTime();
        toPosition();
    });

    // 单独诗句排版
    return (
        <main
            style={{
                flex: "1",
            }}>
            <nav
                style={{
                    margin: "1rem",
                }}></nav>
            {matched.content.map((i, index) => {
                return (
                    <SingleRow
                        onClick={() => {
                            RecordMe(index, matched.title);
                        }}
                        onPointerMove={() => {
                            RecordMe(index, matched.title);
                        }}
                        name={matched.title}
                        key={matched.title + "-" + index}
                        index={index}
                        content={i}></SingleRow>
                );
            })}
        </main>
    );
};
