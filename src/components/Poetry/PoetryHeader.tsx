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
import { Popover } from "@arco-design/web-react";
export const PoetryHeader = () => {
    const matched = useStore(Books);
    const textCount = matched.content.split("\n").reduce((col, cur) => {
        const m: string = cur.replace(/[^\u4e00-\u9fff\uf900-\ufaff]/g, "");
        return col + m.length;
    }, 0);
    return (
        <header className={`poetry-header`}>
            <main>
                <span className="title">{matched.title}</span>
                <span className="subtitle">{matched.subTitle}</span>
            </main>
            <div className="flex-1"></div>
            <aside className="flex gap-2">
                <div>
                    全文
                    <span style={{ fontSize: "1.125em" }}>{textCount}</span>字
                </div>

                <IconBook
                    className="w-4 aspect-square cursor-pointer"
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
    const Item = ({
        name,
        icon,
        onClick,
    }: {
        name: string;
        icon: JSX.Element;
        onClick?: () => void;
    }) => {
        return (
            <li onClick={onClick}>
                {icon}
                {name}
            </li>
        );
    };
    return (
        <Popover
            trigger="click"
            content={
                <ul>
                    <Item
                        icon={<IconRefresh className="pr-2" />}
                        name="横竖切换"
                        onClick={() => {
                            BookSetting.setKey(
                                "direction",
                                BookSetting.get().direction === "row"
                                    ? "col"
                                    : "row"
                            );
                        }}></Item>
                </ul>
            }>
            <IconList className="w-4 aspect-square cursor-pointer"></IconList>
        </Popover>
    );
}
