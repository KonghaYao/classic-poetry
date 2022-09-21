import { useUnmount } from "ahooks";
import { useLocation } from "react-router-dom";
import type Highlighter from "web-highlighter";
import HighlightSource from "web-highlighter/dist/model/source";
import { HighlighterOptions } from "web-highlighter/dist/types";
import { ContextMenuController } from "../ContextMenu";
import { BookNotes } from "./BookNote";
import { Close } from "./HighController";

ContextMenuController.emit("register", {
    slot: "Button",
    list: true,
    component: Close,
});

export const useHighlight = () => {
    let highlight: Highlighter;
    useUnmount(() => {
        highlight && highlight.dispose();
        console.log("高亮组件销毁");
    });
    const location = useLocation();
    let lookingLatest: {
        id?: string;
        sources?: HighlightSource[];
    } = {};
    return {
        async init(config?: HighlighterOptions) {
            const { default: defaultC } = await import("web-highlighter");
            highlight = new defaultC(config);
            highlight.run();
            highlight.on("selection:create", ({ sources }) => {
                lookingLatest.sources = sources;
                console.log(sources);
                BookNotes.addNote({
                    id: sources[0].id,
                    link: location.pathname,
                    highlight: {
                        source: sources[0],
                    },
                }).then(() => {
                    console.log("创建 Note 成功");
                });
            });
            highlight.on("selection:hover", ({ id }) => {
                lookingLatest.id = id;
            });

            return highlight;
        },

        getHighlighter() {
            return highlight;
        },
    };
};
