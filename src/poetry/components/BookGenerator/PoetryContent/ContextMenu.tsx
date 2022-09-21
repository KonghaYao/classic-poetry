import { FC } from "react";
import { createServer, SlotMap } from "../../../../Server/Template";

const { Template, controller } = createServer<
    {},
    "Header" | "Footer",
    "Button"
>({
    name: "poetry-content",
});
controller.emit("register", {
    slot: "Button",
    list: true,
    component: () => {
        return <div>确实是这样的</div>;
    },
});
import "./context-menu.css";
export const ContextMenu: FC = Template(({ Slots, SlotList }) => {
    return (
        <main className="context-menu">
            {Slots.Header && (
                <nav>
                    <Slots.Header></Slots.Header>
                </nav>
            )}
            <nav>
                <SlotMap list={SlotList.Button}>
                    {(Comp, index) => {
                        return (
                            <div key={"poetry-context-menu-" + index}>
                                <Comp></Comp>;
                                <hr className="hov" />
                            </div>
                        );
                    }}
                </SlotMap>
            </nav>
            {Slots.Footer && (
                <nav>
                    <Slots.Footer></Slots.Footer>
                </nav>
            )}
        </main>
    );
});
