import { FC } from "react";
import { lazy, Suspense } from "react";
import {} from "react-dom";
import { RestTime } from "../poetry/utils/RestTime";
import { useUMD } from "./useUMD";

/** 这个是异步加载外壳，用于在闲暇时段加载搜索模块 */
export const SearchBox = () => {
    const Loader = lazy(async () => {
        await RestTime();
        await useUMD(
            "https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/dist/instant-meilisearch.umd.min.js",
            "instantMeiliSearch"
        );

        return import("./index");
    });
    return (
        <Suspense>
            <Loader></Loader>
        </Suspense>
    );
};

export const SearchPage: FC = () => {
    return (
        <div>
            <SearchBox></SearchBox>
            <link
                href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite.css"
                rel="stylesheet"></link>
        </div>
    );
};
