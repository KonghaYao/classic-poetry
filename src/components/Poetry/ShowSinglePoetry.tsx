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
export const ShowSinglePoetry = ({ poetry: info }: { poetry: PageInfo }) => {
    Books.set(info);
    const { setting } = useSetting();
    const { direction } = useStore(BookSetting);
    return (
        <div
            className={`poetry-wrapper ${
                direction === "row"
                    ? "box-row poetry-vertical"
                    : "box-col content-max no-scroll"
            }`}
            style={{
                fontFamily: setting.text.font.fontFamily,
                fontWeight: setting.text.fontWeight,
                fontSize: setting.text.fontSize,
                letterSpacing: setting.text.letterSpacing + "em",
            }}>
            {/* <button
                onClick={() => {
                    BookSetting.setKey(
                        "direction",
                        direction === "row" ? "col" : "row"
                    );
                }}>
                改变方向
                {direction}
            </button> */}
            <PoetryHeader></PoetryHeader>

            <main className={`poetry-content box-col`}>
                <PoetryContent></PoetryContent>

                {/* TODO Notes 暂时不适配 */}
                {/* {matched.notes && (
                                <NotsShower notes={matched.notes}></NotsShower>
                            )} */}
                {/* <PoetryFooter></PoetryFooter> */}
            </main>
            {/* <FontSlot></FontSlot> */}
        </div>
    );
};
