import { PositionName, pluginPosition } from ".";
import { For, type Component, Accessor, JSX, createMemo } from "solid-js";

export const PluginRender = (props: {
    position: PositionName;
    children?: (Comp: Component, _: Accessor<number>) => JSX.Element;
}) => {
    const comps = pluginPosition;

    const renderChildren =
        props.children ??
        ((Comp: Component, _: Accessor<number>) => <Comp></Comp>);

    const comp = createMemo(() => comps[props.position]);
    return <For each={comp()}>{renderChildren}</For>;
};
