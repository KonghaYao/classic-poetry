import { useMemoizedFn, useMount, useUnmount } from "ahooks";
import { BookNotes } from "./BookNote";
import { useHighlight } from "./useHighLight";
import { useStore } from "@nanostores/react";
import { HighlightStore } from "./HighlightStore";
import type HighlightSource from "web-highlighter/dist/model/source";
import { Button, Trigger } from "@arco-design/web-react";
import { Children, FC, useRef } from "react";
import type React from "react";
export const useHighlightInject = ({
    getRoot,
}: {
    getRoot: () => HTMLElement;
}) => {
    const lookingId = useStore(HighlightStore);

    const h = useHighlight();

    const initHighlight = useMemoizedFn(() => {
        let lookingLatest: {
            id?: string;
            sources?: HighlightSource[];
        } = {};
        const highlighter = h.init(
            {
                $root: getRoot(),
                verbose: true,
                exceptSelectors: [".poetry-index"],
                style: {
                    className: "poetry-tagging",
                },
            },
            location.pathname
        );
        highlighter.on("selection:create", ({ sources }) => {
            lookingLatest.sources = sources;
            // ! 初始化也会创建选区
        });
        highlighter.on("selection:hover", ({ id }) => {
            lookingLatest.id = id;
            HighlightStore.get().contextMenu.setKey("show", true);
        });
        highlighter.on("selection:hover-out", ({ id }) => {
            lookingLatest.id = id;
            HighlightStore.get().contextMenu.setKey("show", false);
        });
        highlighter.on("selection:click", ({ id }) => {
            HighlightStore.setKey("lookingId", id);
        });
        // ContextMenuController.emit("update", (data: any) => {
        //     data.highlighter = highlighter;
        //     return data;
        // });
        // 注入全部的 Note
        BookNotes.openBook(location.pathname).then((res) => {
            res.data.forEach((i) => {
                const s = i.highlight.source;
                highlighter.fromStore(s.startMeta, s.endMeta, s.text, s.id);
            });
        });
    });
    useMount(() => initHighlight());
    useUnmount(() => h.destroy());
    // 单独诗句排版
    return {};
};

export const HighLightFloat: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // 防止服务器端渲染
    if (!globalThis.window) return <>{children}</>;
    const contextMenu = HighlightStore.get().contextMenu;
    const store = useStore(contextMenu);
    const ref = useRef<any>();
    // ! TODO BUG 问题。。。

    contextMenu.listen(({ show }) => {
        if (show) {
            ref.current?.update();
            console.log("开始");
        }
    });
    return (
        <Trigger
            ref={ref}
            popupVisible={store.show}
            popup={() => {
                return <Button>测试</Button>;
            }}
            trigger={[]}
            popupAlign={{
                bottom: 8,
                left: 8,
            }}
            alignPoint={true}
            onClickOutside={() => {
                HighlightStore.get().contextMenu.setKey("show", false);
            }}>
            {children}
        </Trigger>
    );
};
