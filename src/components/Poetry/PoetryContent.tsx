import { SingleRow } from "./Content/SingleRow";

import { useStore } from "@nanostores/solid";
import { Books, isRow } from "./store/book";
import { NotesShower } from "./Content/NotesShower";
import type { PageInfo } from "./ShowSinglePoetry";
// import { useHighlightInject } from "./HighLight/index";
import { atom } from "@cn-ui/reactive";
export const PoetryContent = () => {
    const poetry = useStore(Books)();
    const ref = atom<HTMLDivElement | null>(null);
    return (
        <article class="flex-1 flex flex-col w-full " ref={ref!}>
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
                        index={index}
                        content={i}></SingleRow>
                );
            })}
            <aside class="flex-1"></aside>
            {AuthorInk(poetry)}
            <NotesShower></NotesShower>
        </article>
    );
};
function AuthorInk(poetry: PageInfo) {
    return (
        <aside
            class={
                "text-3xl text-right " +
                (isRow.get() ? "mt-4 mr-8" : "mt-4 mb-8")
            }>
            {poetry.author}
            <span
                class={
                    "author-ink text-white rounded select-none " +
                    (isRow.get() ? "mb-4" : "ml-4")
                }>
                {poetry.author ? "文" : "终"}
            </span>
        </aside>
    );
}
