import { FC, useMemo, useState } from "react";
import { PoetryHeader } from "./PoetryHeader";
import { useSetting } from "../../../../Setting";
import "./ShowSinglePoetry.css";
import { BookContext } from "../BookContext";
import { PoetryFooter } from "./PoetryFooter";
import { useFontChange } from "../../../../App/useFontChange";
import { PoetryContent } from "./PoetryContent";
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
                            <PoetryContent {...info!}></PoetryContent>

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
