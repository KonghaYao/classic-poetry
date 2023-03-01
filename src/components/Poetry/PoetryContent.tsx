import { useMemo, useRef, useState } from "react";
import { useMount, useUnmount } from "ahooks";
import { RestTime } from "../../poetry/utils/RestTime";
import { SingleRow } from "../../poetry/components/BookGenerator/PoetryContent/SingleRow";
// import { usePositionRecord } from "../../poetry/components/BookGenerator/PoetryContent/usePositionRecord";
import { Trigger } from "@arco-design/web-react";
import { BookNotes } from "../../poetry/components/BookGenerator/NoteBar/BookNote";
import type { PageInfo } from "./ShowSinglePoetry";

export const PoetryContent = (props: PageInfo) => {
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
            <article className="flex-1" ref={(el) => (container = el!)}>
                <nav
                    style={{
                        margin: "1rem",
                    }}></nav>
                {props.content.split("\n").map((i, index) => {
                    return (
                        <SingleRow
                            onClick={() => {
                                // RecordMe(index, props.title);
                            }}
                            onPointerMove={() => {
                                // RecordMe(index, props.title);
                            }}
                            name={props.title}
                            key={props.title + "-" + index}
                            index={index}
                            content={i}></SingleRow>
                    );
                })}
            </article>
        </Trigger>
    );
};
