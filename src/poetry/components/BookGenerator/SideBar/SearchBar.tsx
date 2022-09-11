import { Input } from "@arco-design/web-react";
import { FC } from "react";
import { useUpdateEffect } from "ahooks";
import { InnerObjectType } from "../CommonBook";
import debounce from "lodash/debounce";
import { useSearch } from "./useSearch";

export const SearchBar: FC<{
    data: InnerObjectType[];
    afterSearch: (info: InnerObjectType[]) => void;
}> = ({ data, afterSearch }) => {
    const { searchAsync, getIndex, rebuild } = useSearch(function () {
        return {
            data,
            options: {
                keys: ["title"],
            },
        };
    });

    // 只有当 data 被第二次更新时才会重构
    useUpdateEffect(() => {
        rebuild();
    }, [data]);
    const searchInfo = async (i: string) => {
        if (i) {
            const result = getIndex()?.search(i) || (await searchAsync(i));
            afterSearch(result.map((i) => i.item));
        } else {
            afterSearch(data);
        }
    };
    return (
        <Input.Search
            placeholder="搜索导航"
            onChange={debounce((i) => searchInfo(i), 500)}
            style={{
                width: "10rem",
            }}
        />
    );
};
