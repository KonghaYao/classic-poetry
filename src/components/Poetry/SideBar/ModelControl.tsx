import { SideIndex } from "./SideIndex";
import { useStore } from "@nanostores/solid";
import { modelControl } from "../store/modelControl";
import { useState } from "react";
import { useMount } from "ahooks";
import { Books } from "../store/book";
export const ModelControl = () => {
    const { showing } = useStore(modelControl);
    const [render, setRender] = useState(false);
    useMount(() => {
        // 延迟进行加载，保证依赖已经挂载完成
        setTimeout(() => {
            setRender(true);
        }, 300);
    });

    return (
        <>{render && <SideIndex visible={showing === "index"}></SideIndex>}</>
    );
};
