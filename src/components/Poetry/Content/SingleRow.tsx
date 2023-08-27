import { isRow } from "../store/book";
import type { Component } from "solid-js";

/** 每一行诗句的排版 */
export const SingleRow: Component<{
    index: number;
    content: string;
    name: string;
    onClick: () => void;
    onPointerMove: () => void;
}> = ({ index, content, onClick, onPointerMove }) => {
    return (
        <>
            <div
                class={`single-content box-row ${
                    isRow.get() ? "" : "long-list-item"
                }`}
                onClick={onClick}
                onPointerMove={onPointerMove}>
                <aside class="poetry-index">{index + 1}</aside>
                <p class="poetry-text text-base m-2" data-row-index={index + 1}>
                    {content}
                </p>
            </div>
            <hr class={isRow.get() ? "ver" : "hor"} />
        </>
    );
};
