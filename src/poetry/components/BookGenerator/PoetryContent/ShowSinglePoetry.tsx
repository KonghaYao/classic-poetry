import { FC, useMemo, useState } from "react";
import { PoetryHeader } from "./PoetryHeader";
import { useSetting } from "../../../../Setting";
import "./ShowSinglePoetry.css";
import { BookContext } from "../BookContext";
import { NotsShower } from "./NotsShower";
import { PoetryFooter } from "./PoetryFooter";
import { useFontChange } from "../../../../App/useFontChange";
import { PoetryContent } from "./PoetryContent";
import { List, Trigger } from "@arco-design/web-react";
import { createServer, SlotMap } from "../../../../Server/Template";
export type PageInfo = {
    title: string;
    subTitle?: string;
    author?: string;
    content: string[];
    notes?: string[];
};

export const ShowSinglePoetry: FC = () => {
    // const [visible, setVisible] = useState(true);
    const { setting } = useSetting();
    const direction = useMemo(
        () => setting.theme.cnList === "竖排",
        [setting.theme.cnList]
    );
    const { slot: FontSlot } = useFontChange(); // 添加字体加载 link，这样才能使用
    return (
        <BookContext.Consumer>
            {(info) => {
                return (
                    <div
                        className={`poetry-wrapper ${
                            direction
                                ? "box-row poetry-vertical"
                                : "box-col content-max no-scroll"
                        }`}
                        style={{
                            fontFamily: setting.text.font.fontFamily,
                            fontWeight: setting.text.fontWeight,
                            fontSize: setting.text.fontSize,
                            letterSpacing: setting.text.letterSpacing + "em",
                        }}>
                        <PoetryHeader></PoetryHeader>

                        <main className={`poetry-content box-col`}>
                            <Trigger
                                trigger={["contextMenu"]}
                                alignPoint
                                position="bl"
                                // onClickOutside={() => {
                                //     setVisible(false);
                                // }}
                                popup={() => <ContextMenu></ContextMenu>}>
                                <PoetryContent {...info!}></PoetryContent>
                            </Trigger>
                            {/* TODO Notes 暂时不适配 */}
                            {/* {matched.notes && (
                                <NotsShower notes={matched.notes}></NotsShower>
                            )} */}
                            <PoetryFooter></PoetryFooter>
                        </main>
                        <FontSlot></FontSlot>
                    </div>
                );
            }}
        </BookContext.Consumer>
    );
};

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
const ContextMenu: FC = Template(({ Slots, SlotList }) => {
    return (
        <main style={{ zIndex: 100 }}>
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
