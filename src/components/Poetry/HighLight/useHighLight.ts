import Highlighter from "web-highlighter";
import type HighlightSource from "web-highlighter/dist/model/source";
import type { HighlighterOptions } from "web-highlighter/dist/types";

// import { Close } from "./HighController";
// import { SimpleNote } from "./SimpleNote";

// [SimpleNote, Close].forEach((i) => {
//     ContextMenuController.emit("register", {
//         slot: "Button",
//         list: true,
//         component: i,
//     });
// });
let highlight: Highlighter;

export const useHighlight = () => {
    return {
        init(config: HighlighterOptions, link: string) {
            highlight = new Highlighter(config);
            highlight.run();

            console.log("高亮组件准备就绪");
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
