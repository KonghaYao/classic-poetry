import { IconBook, IconUnorderedList } from "@arco-design/web-react/icon";
import type React from "react";
import type { FC } from "react";
import { sidebarServer } from "./SideBar/server";
// import { BookContext } from "../../poetry/components/BookGenerator/BookContext";
// import { NoteBarServer } from "../../poetry/components/BookGenerator/NoteBar";
import type { PageInfo } from "./ShowSinglePoetry";

const PageHeader: FC<{
    title: string;
    subTitle?: string;
    onBack: Function;
    children: React.ReactNode;
}> = (props) => {
    return (
        <div className={`poetry-header `}>
            <div>
                <span className="title">{props.title}</span>
                <span className="subtitle">{props.subTitle}</span>
            </div>
            <div className="flex-1"></div>
            <div>{props.children}</div>
        </div>
    );
};

import { useStore } from "@nanostores/react";
import { Books } from "./store/book";
import { modelControl } from "./store/modelControl";
export const PoetryHeader = () => {
    const matched = useStore(Books);
    const textCount = matched.content.split("\n").reduce((col, cur) => {
        const m: string = cur.replace(/[^\u4e00-\u9fff\uf900-\ufaff]/g, "");
        return col + m.length;
    }, 0);
    return (
        <PageHeader
            title={matched.title}
            subTitle={matched.subTitle}
            onBack={() => {
                history.back();
            }}>
            {/* // TODO 勘误功能 */}
            <div className="flex gap-2">
                <div>
                    全文
                    <span style={{ fontSize: "1.125em" }}>{textCount}</span>字
                </div>

                <IconUnorderedList
                    className="w-4 aspect-square cursor-pointer"
                    onClick={() => {
                        modelControl.setKey("showing", "index");
                        console.log("记录陈工");
                    }}
                />

                <IconBook
                    className="w-4 aspect-square cursor-pointer"
                    onClick={() => {
                        // NoteBarServer.emit("toggle");
                    }}
                />
            </div>
        </PageHeader>
    );
};
