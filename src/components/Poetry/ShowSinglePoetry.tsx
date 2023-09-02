import { PoetryHeader } from "./PoetryHeader";
import { defaultSetting } from "../../Setting";
import "./ShowSinglePoetry.css";
import type { JSX } from "solid-js";
import { PoetryContent } from "./PoetryContent";
export type PageInfo = {
    title: string;
    subTitle?: string;
    author?: string;
    content: string;
    notes?: string;
    id: string;
    belongToName: string;
};
import { useStore } from "@nanostores/solid";
import { Books, BookSetting } from "./store/book";
export const ShowSinglePoetry = ({
    poetry: info,
    children,
}: {
    poetry: PageInfo;
    children: JSX.Element;
}) => {
    Books.set(info);
    const setting = defaultSetting;
    const store = useStore(BookSetting);
    return (
        <section
            class={`poetry-wrapper ${
                store().direction === "row"
                    ? "flex flex-row-reverse poetry-vertical"
                    : "flex flex-col  content-max no-scroll"
            }`}
            style={{
                "font-family": setting.text.font.fontFamily,
                "font-weight": setting.text.fontWeight,
                "font-size": setting.text.fontSize + "px",
                "letter-spacing": setting.text.letterSpacing + "em",
            }}>
            <PoetryHeader></PoetryHeader>

            <main class={`poetry-content box-col`}>
                <PoetryContent></PoetryContent>
                {children}
            </main>
        </section>
    );
};
