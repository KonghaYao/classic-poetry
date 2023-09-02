import type { Component, JSX } from "solid-js";
import { MapStore, map } from 'nanostores'
import { useStore } from "@nanostores/solid";
export const pluginPosition = map({
    header: [] as Component[]
})
export type PositionName = (typeof pluginPosition) extends MapStore<Record<infer R, Component[]>> ? R : unknown
export abstract class SystemPlugin {
    config?: Partial<{
        position: PositionName
    }>
    abstract render(): JSX.Element
    register() {
        const plugin = useStore(pluginPosition)
        pluginPosition.setKey('header', [...plugin().header, this.render])
    }
}