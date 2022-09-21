import { FC, useEffect, useMemo, useRef, useState } from "react";
import { History } from "../../../../History";
import { useMount } from "ahooks";
import { RestTime } from "../../../utils/RestTime";
import { BookContextType } from "../BookContext";
import { SingleRow } from "./SingleRow";
import { usePositionRecord } from "./usePositionRecord";
import { Trigger } from "@arco-design/web-react";
import { ContextMenu, ContextMenuController } from "./ContextMenu";
import { useHighlight } from "./ContextPlugins/useHighLight";

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
    const { init } = useHighlight();
    const triggerRef = useRef<any>();
    const [lookingId, setLookingId] = useState("");
    useMemo(() => {
        if (triggerRef.current && lookingId) {
            triggerRef.current.update();
            setPopupVisible(true);
            ContextMenuController.emit("update", (data) => {
                data.lookingId = lookingId;
                return data;
            });
            console.log("高亮");
        } else {
            setPopupVisible(false);
        }
    }, [lookingId]);
    const initHighlight = () => {
        init({
            $root: container,
            verbose: true,
            exceptSelectors: [".poetry-index"],
            style: {
                className: "poetry-tagging",
            },
        }).then((highlighter) => {
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
        });
    };
    useMount(() => {
        initHighlight();
    });
    // 单独诗句排版
    return (
        <Trigger
            ref={triggerRef}
            alignPoint
            unmountOnExit={false}
            position="bl"
            popupVisible={popupVisible}
            popup={() => <ContextMenu></ContextMenu>}>
            <main
                ref={(el) => (container = el!)}
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
        </Trigger>
    );
};
