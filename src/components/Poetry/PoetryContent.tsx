import { useMemo, useRef, useState } from "react";
import { SingleRow } from "./Content/SingleRow";
// import { usePositionRecord } from "../../poetry/components/BookGenerator/PoetryContent/usePositionRecord";
import { Trigger } from "@arco-design/web-react";

import { useStore } from "@nanostores/react";
import { Books } from "./store/book";
import { NotesShower } from "./Content/NotesShower";
import type { PageInfo } from "./ShowSinglePoetry";
export const PoetryContent = () => {
    const poetry = useStore(Books);
    const [popupVisible, setPopupVisible] = useState(false);
    let container: HTMLElement;
    const triggerRef = useRef<any>();
    const [lookingId, setLookingId] = useState("");
    // const location = useLocation();
    // useMemo(() => {
    //     if (triggerRef.current && lookingId) {
    //         triggerRef.current.update();
    //         setPopupVisible(true);
    //         ContextMenuController.emit("update", (data: any) => {
    //             data.lookingId = lookingId;
    //             return { ...data };
    //         });
    //     } else {
    //         setPopupVisible(false);
    //     }
    // }, [lookingId]);
    // const { init, destroy: destroyHighlight } = useHighlight();
    // const initHighlight = () => {
    //     const highlighter = init(
    //         {
    //             $root: container,
    //             verbose: true,
    //             exceptSelectors: [".poetry-index"],
    //             style: {
    //                 className: "poetry-tagging",
    //             },
    //         },
    //         location.pathname
    //     );
    //     highlighter.on("selection:click", ({ id }) => {
    //         setLookingId(id);
    //     });
    //     highlighter.on("selection:hover", ({ id }) => {
    //         setLookingId(id);
    //     });
    //     highlighter.on("selection:hover-out", () => {
    //         setLookingId("");
    //     });
    //     ContextMenuController.emit("update", (data: any) => {
    //         data.highlighter = highlighter;
    //         return data;
    //     });
    //     // 注入全部的 Note
    //     BookNotes.openBook(location.pathname).then((res) => {
    //         res.data.forEach((i) => {
    //             const s = i.highlight.source;
    //             highlighter.fromStore(s.startMeta, s.endMeta, s.text, s.id);
    //         });
    //     });
    // };
    // useMount(() => initHighlight());
    // useUnmount(() => destroyHighlight());
    // 单独诗句排版
    return (
        <Trigger
            ref={triggerRef}
            alignPoint
            position="bl"
            popupVisible={popupVisible}
            //  不适合使用 异步加载，会导致问题
            popup={() => {
                return <div></div>;
                // return <ContextMenu></ContextMenu>;
            }}>
            <article
                className="flex-1 flex flex-col"
                ref={(el) => (container = el!)}>
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
        </Trigger>
    );
};
function AuthorInk(poetry: PageInfo) {
    return (
        <aside className="text-3xl text-right mt-4 mb-8">
            {poetry.author}
            <span className="author-ink  text-white rounded ml-4">
                {poetry.author ? "文" : "终"}
            </span>
        </aside>
    );
}
