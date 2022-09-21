import { Button } from "@arco-design/web-react";
import { IconApps, IconDelete } from "@arco-design/web-react/icon";
import { FC } from "react";
import Highlighter from "web-highlighter";
import { createServer, SlotMap } from "../../../../Server/Template";

export type DataType = {
    highlighter: Highlighter;
    name: string;
    lookingId: string;
};
const { Template, controller } = createServer<
    DataType,
    "Header" | "Footer",
    "Button"
>({
    name: "poetry-content",
});
export { controller as ContextMenuController };

import "./context-menu.css";
export const ContextMenu = Template(({ Slots, SlotList }) => {
    return (
        <main className="context-menu box-col">
            {Slots.Header && (
                <nav>
                    <Slots.Header></Slots.Header>
                </nav>
            )}
            <hr className="hor" />
            <nav className="box-row box button-group">
                <SlotMap list={SlotList.Button}></SlotMap>
            </nav>
        </main>
    );
});
