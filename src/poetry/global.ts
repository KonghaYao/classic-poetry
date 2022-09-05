import mitt from "mitt";
export const sidebarServer = mitt<{
    toggleVisible: boolean | undefined;
}>();
export const Setting = {
    root: "https://unpkg.com/chinese-poetry/chinese-poetry/",
};
