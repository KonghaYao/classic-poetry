import { computed, map } from "nanostores";
import type { PageInfo } from "../ShowSinglePoetry";
export const Books = map<PageInfo>(null as any);

export const BookSetting = map({
    direction: "col" as "col" | "row",
});
export const isRow = computed(BookSetting, (val) => val.direction === "row");
