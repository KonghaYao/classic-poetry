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
        <main className="context-menu">
            {Slots.Header && (
                <nav>
                    <Slots.Header></Slots.Header>
                </nav>
            )}
            <nav className="row box">
                <SlotMap list={SlotList.Button}>
                    {(Comp, index) => {
                        return (
                            <div key={"poetry-context-menu-" + index}>
                                <Comp></Comp>;
                                <hr className="ver" />
                            </div>
                        );
                    }}
                </SlotMap>
            </nav>
        </main>
    );
});
