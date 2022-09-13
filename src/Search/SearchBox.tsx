import { lazy, Suspense } from "react";
import {} from "react-dom";
import { Loading } from "../poetry/components/Loading";
import { RestTime } from "../poetry/utils/RestTime";
import { useLink } from "./useLink";
import { useUMD } from "./useUMD";

/** 这个是异步加载外壳，用于在闲暇时段加载搜索模块 */
export const SearchBox = () => {
    const Loader = lazy(async () => {
        await RestTime();
        await useUMD(
            "https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/dist/instant-meilisearch.umd.min.js",
            "instantMeiliSearch"
        );
        await useLink(
            "https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite.css"
        );
        /** TODO 搜索方式开发中 */
        return { default: () => <div></div> } || import("./index");
    });
    return (
        <Suspense>
            <Loader></Loader>
        </Suspense>
    );
};
