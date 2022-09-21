import { FC } from "react";
import { History } from "../../../../History";
import { useMount } from "ahooks";
import { RestTime } from "../../../utils/RestTime";
import { BookContextType } from "../BookContext";
import { SingleRow } from "./SingleRow";
import { usePositionRecord } from "./usePositionRecord";

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
            }}
            onContextMenu={(e) => e.preventDefault()}>
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
