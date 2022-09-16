import { FC } from "react";
import { lazy, Suspense } from "react";
import { useUMD } from "./useUMD";
import "./search.less";
/** 这个是异步加载外壳，用于在闲暇时段加载搜索模块 */
export const SearchBox = () => {
    const Loader = lazy(async () => {
        // 这个 UMD 可以直接载入，而 meili 的不行
        await useUMD(
            "https://unpkg.com/react-instantsearch-hooks-web@6.32.1/dist/umd/ReactInstantSearchHooksDOM.min.js",
            ""
        );
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
        <div
            className="box-row search-page noise flex-1"
            style={{ justifyContent: "center", alignItems: "center" }}>
            <SearchBox></SearchBox>
            <link
                href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite.css"
                rel="stylesheet"></link>
        </div>
    );
};
