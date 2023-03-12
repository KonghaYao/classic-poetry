import { FC, useMemo } from "react";
import { PoetryHeader } from "./PoetryHeader";
import { useSetting } from "../../Setting";
import "./ShowSinglePoetry.css";
// import { PoetryFooter } from "./PoetryFooter";
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
import { useStore } from "@nanostores/react";
import { Books, BookSetting } from "./store/book";
import { HighLightFloat } from "./HighLight";
export const ShowSinglePoetry = ({ poetry: info }: { poetry: PageInfo }) => {
    Books.set(info);
    const { setting } = useSetting();
    const { direction } = useStore(BookSetting);
    return (
        <section
            className={`poetry-wrapper ${
                direction === "row"
                    ? "flex flex-row-reverse poetry-vertical"
                    : "flex flex-col  content-max no-scroll"
            }`}
            style={{
                fontFamily: setting.text.font.fontFamily,
                fontWeight: setting.text.fontWeight,
                fontSize: setting.text.fontSize,
                letterSpacing: setting.text.letterSpacing + "em",
            }}>
            <PoetryHeader></PoetryHeader>

            <HighLightFloat>
                <main className={`poetry-content box-col`}>
                    <PoetryContent></PoetryContent>

                    {/* <PoetryFooter></PoetryFooter> */}
                </main>
            </HighLightFloat>
            {/* <FontSlot></FontSlot> */}
        </section>
    );
};
