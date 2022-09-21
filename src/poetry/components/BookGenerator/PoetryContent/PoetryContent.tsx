import { FC, useRef, useState } from "react";
import { History } from "../../../../History";
import { useMount } from "ahooks";
import { RestTime } from "../../../utils/RestTime";
import { BookContextType } from "../BookContext";
import { SingleRow } from "./SingleRow";
import { usePositionRecord } from "./usePositionRecord";
import { Trigger } from "@arco-design/web-react";
import { ContextMenu } from "./ContextMenu";
import { useHighlight } from "./ContextPlugins/useHighLight";
import { TriggerState } from "@arco-design/web-react/es/Trigger";

export const PoetryContent: FC<BookContextType> = (props) => {
    const { matched } = props!;
    const [popupVisible, setPopupVisible] = useState(false);
    let container: HTMLElement;
    // 历史记录的操作
    History.add(matched.title);
    const { toPosition, RecordMe } = usePositionRecord();
    useMount(async () => {
        await RestTime();
        toPosition();
    });
    const { init } = useHighlight();
    const initHighlight = (el: HTMLElement) => {
        if (el) {
            init({
                $root: el,
                verbose: true,

                style: {
                    className: "poetry-tagging",
                },
            }).then((highlighter) => {
                console.log("高亮组件加载成功");

                highlighter.on("selection:hover", () => {
                    triggerRef.current.update();
                    setPopupVisible(true);
                });
                highlighter.on("selection:hover-out", () => {
                    setPopupVisible(false);
                });
            });
        }
    };
    useMount(() => {
        initHighlight(container);
    });
    const triggerRef = useRef<any>();
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
