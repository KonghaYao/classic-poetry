import { useState } from "react";
import FUSE from "fuse.js";

export function useSearch<T>(init: () => { data: T[]; options: any }) {
    const [Index, setIndex] = useState<FUSE<T> | undefined>();

    const rebuild = async () => {
        let { default: Fuse } = await import("fuse.js");

        const { data, options } = init();
        const fuse = new Fuse(data, options);

        setIndex(fuse);

        return fuse;
    };

    const searchAsync = async (text: string) => {
        const Index = await rebuild();
        return Index!.search(text);
    };
    return {
        searchAsync,
        getIndex() {
            return Index;
        },
        rebuild,
    };
}
