import mitt from "mitt";
import { FC, useState } from "react";
export type PluginType = { id: string; position: string; component: FC };
export type SlotType = {
    position: string;
};
const registerServer = mitt<{
    [key: string]: FC;
}>();
const unloadServer = mitt<{
    [key: string]: string;
}>();

/** 建设一个空格区间，返回响应式的 FC */
export const useSlot = (slot: SlotType) => {
    const [slots, setSlots] = useState<FC[]>([]);
    /** 注册插件 */
    const r = (comp: FC) => {
        const replaceIndex = slots.findIndex(
            (i) => (i as any).id === (comp as any).id
        );
        // 这里会被多次执行，这个是因为 React 的渲染问题，但是不会出现重复渲染
        if (replaceIndex !== -1) {
            // 替换组件
            setSlots([...slots.splice(replaceIndex, 1, comp)]);
        } else {
            slots.push(comp);
            setSlots([...slots]);
        }
    };
    /** 卸载插件 */
    const u = (id: string) => {
        setSlots(slots.filter((i) => (i as any).id !== id));
        console.log("卸载插件 ", id);
    };
    const pos = slot.position;
    registerServer.on(pos, r);
    unloadServer.on(pos, u);
    return {
        slots,
        destroy() {
            registerServer.off(pos, r);
            unloadServer.off(pos, u);
        },
    };
};

export const useServer = () => {
    return {
        /** 初始化 Server，但是现在没什么用 */
        init() {},
        useSlot,
        /** 将插件注册到某个地方 */
        register(plugin: PluginType) {
            // ! 这里添加了组件一个 id 属性，保证能够被唯一指定
            (plugin.component as any).id = plugin.id;
            registerServer.emit(plugin.position, plugin.component);
            console.log("注册插件 ", plugin.id);
        },
        /** 卸载这个插件 */
        unload(position: string, id: string) {
            unloadServer.emit(position, id);
        },
    };
};
