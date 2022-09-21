import { useUnmount } from "ahooks";
import type Highlighter from "web-highlighter";
import HighlightSource from "web-highlighter/dist/model/source";
import { HighlighterOptions } from "web-highlighter/dist/types";
export const useHighlight = () => {
    let highlight: Highlighter;
    useUnmount(() => {
        highlight && highlight.dispose();
        console.log("高亮组件销毁");
    });
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
                console.log("创建成功");
                lookingLatest.sources = sources;
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
