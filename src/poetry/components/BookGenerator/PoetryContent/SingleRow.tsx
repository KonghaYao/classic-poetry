import { FC, useMemo } from "react";
import { TextPreProcess } from "../../../utils/TextPreProcess";
import { useSetting } from "../../../../Setting";

/** 每一行诗句的排版 */
export const SingleRow: FC<{
    index: number;
    content: string;
    name: string;
    onClick: () => void;
    onPointerMove: () => void;
}> = ({ index, content, onClick, onPointerMove }) => {
    const { setting } = useSetting();
    const direction = useMemo(() => setting.theme.cnList === "竖排", [setting]);

    return (
        <>
            <div
                className={`single-content box-row ${
                    direction ? "" : "long-list-item"
                }`}
                onClick={onClick}
                onPointerMove={onPointerMove}>
                <div className="poetry-index">{index + 1}</div>
                <div
                    className="poetry-text"
                    style={{ fontSize: "1em" }}
                    data-row-index={index + 1}>
                    {TextPreProcess(content)}
                </div>
            </div>
            <hr key={"divide-" + index} className={direction ? "ver" : "hor"} />
        </>
    );
};
