import mitt from "mitt";
import { FC, useState } from "react";
export type PluginType = { id: string; position: string; component: FC };
export type SlotType = {
    position: string;
};
const server = mitt<{
    [key: string]: FC;
}>();
/** 建设一个空格区间，返回响应式的 FC */
export const useSlot = (slot: SlotType) => {
    const [slots, setSlots] = useState<FC[]>([]);
    server.on(slot.position, (comp) => {
        if (slots.includes(comp)) return;
        setSlots([...slots, comp]);
    });
    return { slots };
};
export const useServer = () => {
    return {
        /** 初始化 Server，但是现在没什么用 */
        init() {},
        useSlot,
        server,
        /** 将插件注册到某个地方 */
        register(plugin: PluginType) {
            (plugin.component as any).id = plugin.id;
            server.emit(plugin.position, plugin.component);
            console.log("注册插件 ", plugin.id);
        },
    };
};
