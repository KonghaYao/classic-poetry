import { map } from "nanostores";

export const HighlightStore = map({
    lookingId: "" as string,
    contextMenu: map({
        show: false,
    }),
});
