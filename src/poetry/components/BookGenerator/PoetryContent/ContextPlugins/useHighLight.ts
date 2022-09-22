import type Highlighter from "web-highlighter";
import HighlightSource from "web-highlighter/dist/model/source";
import { HighlighterOptions } from "web-highlighter/dist/types";
import { ContextMenuController } from "../ContextMenu";
import { BookNotes } from "../../NoteBar/BookNote";
import { Close } from "./HighController";
import { SimpleNote } from "./SimpleNote";

[SimpleNote, Close].forEach((i) => {
    ContextMenuController.emit("register", {
        slot: "Button",
        list: true,
        component: i,
    });
});

let highlight: Highlighter;

let lookingLatest: {
    id?: string;
    sources?: HighlightSource[];
} = {};
export const useHighlight = () => {
    return {
        async init(config: HighlighterOptions, link: string) {
            const { default: defaultC } = await import("web-highlighter");
            highlight = new defaultC(config);
            highlight.run();
            highlight.on("selection:create", ({ sources }) => {
                lookingLatest.sources = sources;
                BookNotes.addNote({
                    id: sources[0].id,
                    link,
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
            console.log(highlight);
            return highlight;
        },
        destroy() {
            highlight && highlight.dispose();
            console.log("高亮组件销毁");
        },
        getHighlighter: () => {
            return highlight;
        },
    };
};
