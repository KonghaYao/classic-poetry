export const root = "https://unpkg.com/chinese-poetry/chinese-poetry/";
import mitt from "mitt";
export const sidebarServer = mitt<{
    toggleVisible: boolean | undefined;
}>();
