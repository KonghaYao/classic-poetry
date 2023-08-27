import type Highlighter from "web-highlighter";
import { createServer, SlotMap } from "../../../../Server/Template";

export type DataType = {
    highlighter: Highlighter;
    name: string;
    title: string; // 组件的中文名称
    lookingId: string;
};
const { Template, controller, DataContext } = createServer<
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
        <main class="context-menu box-col">
            {Slots.Header && (
                <header>
                    <DataContext.Consumer>
                        {({ title }) => {
                            return <div class="title">{title}</div>;
                        }}
                    </DataContext.Consumer>

                    <Slots.Header></Slots.Header>
                </header>
            )}
            <nav class="box-row box button-group">
                <SlotMap list={SlotList.Button}></SlotMap>
            </nav>
        </main>
    );
});
