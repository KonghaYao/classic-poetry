import { FC, useMemo } from "react";
import { TextPreProcess } from "../../../utils/TextPreProcess";
import { useSetting } from "../../../../Setting";
import { History } from "../../../../History";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";

/** 每一行诗句的排版 */
export const SingleRow: FC<{
    index: number;
    content: string;
    name: string;
}> = ({ index, content, name }) => {
    const { setting } = useSetting();
    const direction = useMemo(() => setting.theme.cnList === "竖排", [setting]);
    let [searchParams, setSearchParams] = useSearchParams();
    const RecordMe = () => {
        searchParams.set("position", index.toString());
        setSearchParams(searchParams);
        History.add(name);
    };
    return (
        <>
            <div
                className={`single-content box-row ${
                    direction ? "" : "long-list-item"
                }`}
                onPointerDown={RecordMe}
                onPointerMove={debounce(() => {
                    RecordMe();
                }, 500)}>
                <div className="poetry-index">{index + 1}</div>
                <div className="poetry-text" style={{ fontSize: "1em" }}>
                    {TextPreProcess(content)}
                </div>
            </div>
            <hr key={"divide-" + index} className={direction ? "ver" : "hor"} />
        </>
    );
};
