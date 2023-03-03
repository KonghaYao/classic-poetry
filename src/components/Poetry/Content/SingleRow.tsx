import type { FC, useMemo } from "react";
import { TextPreProcess } from "../../../poetry/utils/TextPreProcess";
import { useSetting } from "../../../Setting";
import { useStore } from "@nanostores/react";
import { BookSetting, isRow } from "../store/book";

/** 每一行诗句的排版 */
export const SingleRow: FC<{
    index: number;
    content: string;
    name: string;
    onClick: () => void;
    onPointerMove: () => void;
}> = ({ index, content, onClick, onPointerMove }) => {
    const { setting } = useSetting();
    const { direction } = useStore(BookSetting);

    return (
        <>
            <div
                className={`single-content box-row ${
                    isRow.get() ? "" : "long-list-item"
                }`}
                onClick={onClick}
                onPointerMove={onPointerMove}>
                <aside className="poetry-index">{index + 1}</aside>
                <p
                    className="poetry-text text-base m-2"
                    data-row-index={index + 1}>
                    {content}
                </p>
            </div>
            <hr
                key={"divide-" + index}
                className={isRow.get() ? "ver" : "hor"}
            />
        </>
    );
};
