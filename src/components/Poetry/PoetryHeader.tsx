import {
    IconBook,
    IconList,
    IconQqCircleFill,
    IconRefresh,
    IconUnorderedList,
} from "@arco-design/web-react/icon";
import type React from "react";

import { useStore } from "@nanostores/react";
import { BookSetting, Books } from "./store/book";
import { modelControl } from "./store/modelControl";
import { Button, Popover } from "@arco-design/web-react";
export const PoetryHeader = () => {
    const matched = useStore(Books);
    const textCount = matched.content.split("\n").reduce((col, cur) => {
        const m: string = cur.replace(/[^\u4e00-\u9fff\uf900-\ufaff]/g, "");
        return col + m.length;
    }, 0);
    return (
        <header class={`poetry-header`}>
            <main>
                <span class="title">{matched.title}</span>
                <span class="subtitle">{matched.subTitle}</span>
            </main>
            <div class="flex-1"></div>
            <aside class="flex gap-2">
                <div>
                    全文
                    <span style={{ fontSize: "1.125em" }}>{textCount}</span>字
                </div>

                <IconBook
                    class="w-4 aspect-square cursor-pointer"
                    onClick={() => {
                        modelControl.setKey("showing", "index");
                    }}
                />
                {MoreList()}
            </aside>
        </header>
    );
};
function MoreList() {
    return (
        <Popover
            trigger="click"
            content={
                <ul>
                    <Button
                        icon={<IconRefresh class="mr-2" />}
                        onClick={() => {
                            BookSetting.setKey(
                                "direction",
                                BookSetting.get().direction === "row"
                                    ? "col"
                                    : "row"
                            );
                        }}>
                        横竖切换
                    </Button>
                </ul>
            }>
            <IconList class="w-4 aspect-square cursor-pointer"></IconList>
        </Popover>
    );
}
