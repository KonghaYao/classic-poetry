import mitt from "mitt";
export const sidebarServer = mitt<{
    toggleVisible: boolean | undefined;
}>();
