import { FC, useEffect, useMemo, useRef, useState } from "react";
import { History } from "../../../../History";
import { useMount, useUnmount } from "ahooks";
import { RestTime } from "../../../utils/RestTime";
import { BookContextType } from "../BookContext";
import { SingleRow } from "./SingleRow";
import { usePositionRecord } from "./usePositionRecord";
import { Trigger } from "@arco-design/web-react";
import { ContextMenu, ContextMenuController } from "./ContextMenu";
import { useHighlight } from "./ContextPlugins/useHighLight";
import { BookNotes } from "../NoteBar/BookNote";
import { useLocation } from "react-router-dom";

export const PoetryContent: FC<BookContextType> = (props) => {
    const { matched } = props!;

    // 历史记录的操作
    History.add(matched.title);
    const { toPosition, RecordMe } = usePositionRecord();
    useMount(async () => {
        await RestTime();
        toPosition();
    });
    const [popupVisible, setPopupVisible] = useState(false);
    let container: HTMLElement;
    const triggerRef = useRef<any>();
    const [lookingId, setLookingId] = useState("");
    const location = useLocation();
    useMemo(() => {
        if (triggerRef.current && lookingId) {
            triggerRef.current.update();
            setPopupVisible(true);
            ContextMenuController.emit("update", (data) => {
                data.lookingId = lookingId;
                return { ...data };
            });
        } else {
            setPopupVisible(false);
        }
    }, [lookingId]);
    const { init, destroy: destroyHighlight } = useHighlight();
    const initHighlight = () => {
        const highlighter = init(
            {
                $root: container,
                verbose: true,
                exceptSelectors: [".poetry-index"],
                style: {
                    className: "poetry-tagging",
                },
            },
            location.pathname
        );
        highlighter.on("selection:click", ({ id }) => {
            setLookingId(id);
        });
        highlighter.on("selection:hover", ({ id }) => {
            setLookingId(id);
        });
        highlighter.on("selection:hover-out", () => {
            setLookingId("");
        });
        ContextMenuController.emit("update", (data) => {
            data.highlighter = highlighter;
            return data;
        });
        // 注入全部的 Note
        BookNotes.openBook(location.pathname).then((res) => {
            res.data.forEach((i) => {
                const s = i.highlight.source;
                highlighter.fromStore(s.startMeta, s.endMeta, s.text, s.id);
            });
        });
    };
    useMount(() => initHighlight());
    useUnmount(() => destroyHighlight());
    // 单独诗句排版
    return (
        <Trigger
            ref={triggerRef}
            alignPoint
            position="bl"
            popupVisible={popupVisible}
            //  不适合使用 异步加载，会导致问题
            popup={() => <ContextMenu></ContextMenu>}>
            <main
                ref={(el) => (container = el!)}
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
        </Trigger>
    );
};
