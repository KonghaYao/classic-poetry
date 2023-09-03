import type { Component, JSX } from "solid-js";
import { createStore } from "solid-js/store";
export const [pluginPosition, setPluginPosition] = createStore({
    header: [] as Component[]
})
export type PositionName = keyof (typeof pluginPosition)
export abstract class SystemPlugin {
    config?: Partial<{
        position: PositionName
    }>
    abstract render(): JSX.Element
    register() {
        setPluginPosition('header', (arr) => [...arr, this.render])
    }
}