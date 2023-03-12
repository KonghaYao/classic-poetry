import { useMemo, useRef, useState } from "react";
import { SingleRow } from "./Content/SingleRow";
// import { usePositionRecord } from "../../poetry/components/BookGenerator/PoetryContent/usePositionRecord";
import { Trigger } from "@arco-design/web-react";

import { useStore } from "@nanostores/react";
import { Books, isRow } from "./store/book";
import { NotesShower } from "./Content/NotesShower";
import type { PageInfo } from "./ShowSinglePoetry";
import { useHighlightInject } from "./HighLight";
export const PoetryContent = () => {
    const poetry = useStore(Books);
    const ref = useRef<HTMLDivElement>(null);
    // const location = useLocation();
    const {} = useHighlightInject({
        getRoot() {
            return ref.current! as HTMLElement;
        },
    });
    return (
        <article className="flex-1 flex flex-col w-full " ref={ref!}>
            {poetry.content.split("\n").map((i, index) => {
                return (
                    <SingleRow
                        onClick={() => {
                            // RecordMe(index, props.title);
                        }}
                        onPointerMove={() => {
                            // RecordMe(index, props.title);
                        }}
                        name={poetry.title}
                        key={poetry.title + "-" + index}
                        index={index}
                        content={i}></SingleRow>
                );
            })}
            <aside className="flex-1"></aside>
            {AuthorInk(poetry)}
            <NotesShower></NotesShower>
        </article>
    );
};
function AuthorInk(poetry: PageInfo) {
    return (
        <aside
            className={
                "text-3xl text-right " +
                (isRow.get() ? "mt-4 mr-8" : "mt-4 mb-8")
            }>
            {poetry.author}
            <span
                className={
                    "author-ink text-white rounded select-none " +
                    (isRow.get() ? "mb-4" : "ml-4")
                }>
                {poetry.author ? "文" : "终"}
            </span>
        </aside>
    );
}
