import { History } from "../../../../History";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";

export const usePositionRecord = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const toPosition = () => {
        const pos = searchParams.get("position");
        if (typeof pos === "string") {
            setTimeout(() => {
                const els = document.getElementsByClassName("single-content")!;
                const el = els[parseInt(pos)];
                console.log("Logger 历史自动复原");
                el.scrollIntoView({
                    block: "start",
                    inline: "start",
                });
            }, 1000);
        }
    };
    const RecordMe = debounce((index: number, name: string) => {
        searchParams.set("position", index.toString());
        setSearchParams(searchParams);
        History.add(name);
    }, 500);
    return { RecordMe, toPosition };
};
