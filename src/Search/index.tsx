import { Trigger } from "@arco-design/web-react";
import { FC, lazy, Suspense, useRef } from "react";
import {
    InstantSearch,
    SearchBox as SSearchBox,
    Highlight,
    Hits,
} from "react-instantsearch-hooks-web";
import { useNavigate } from "react-router-dom";

const useUMD = (url: string, name: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = () => {
            resolve((globalThis as any)[name]);
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
};
const useLink = (url: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("link");
        script.rel = "stylesheet";
        script.href = url;
        script.onload = () => {
            resolve(null);
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
};
export const SearchBox = () => {
    const Loader = lazy(async () => {
        await useUMD(
            "https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/dist/instant-meilisearch.umd.min.js",
            "instantMeiliSearch"
        );
        await useLink(
            "https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite.css"
        );
        return {
            default: _SearchBox,
        };
    });
    return (
        <Suspense>
            <Loader></Loader>
        </Suspense>
    );
};

const Transformer: [
    RegExp | string,
    string | ((...args: string[]) => string)
][] = [
    ...Object.entries({
        "caocaoshiji/caocao.json": "/caocaoshiji",
        "chuci/chuci.json": "/chuci",
        "yuanqu/yuanqu.json": "/yuanqu",
        "nalanxingde/纳兰性德诗集.json": "/nalanxingde",
        "lunyu/lunyu.json": "/lunyu",
        "shijing/shijing.json": "/shijing",
    }),
    [/sishuwujing\/.*/, "/sishuwujing"],
    [/wudai\/huajianji.*/, "/huajianji"],
    [/wudai\/nantang.*/, "/nantang"],
    [
        /json\/poet.tang.(\d+).json/,
        (_, num: string) => {
            return "tang/" + num;
        },
    ],
    [
        /json\/poet.song.(\d+).json/,
        (_, num: string) => {
            return "song/" + num;
        },
    ],
];
export const _SearchBox: FC = () => {
    const searchClient = (globalThis as any).instantMeiliSearch(
        "http://localhost:7700",
        "KongHaYaoForChinesePoetry",
        {
            paginationTotalHits: 10, // default: 200.
            placeholderSearch: false, // default: true.
            primaryKey: "id", // default: undefined
            // ...
        }
    );
    const nav = useNavigate();
    const jumpTo = (hit: { belongTo: string; id: string }) => {
        const tag = Transformer.some(([reg, process]) => {
            if (typeof reg === "string") {
                if (reg === hit.belongTo) {
                    nav(process + "/" + hit.id);
                    return true;
                }
            } else {
                if (typeof process === "string") {
                    if (reg.test(hit.belongTo)) {
                        nav(process + "/" + hit.id);
                        return true;
                    }
                } else {
                    const result = hit.belongTo.match(reg);
                    if (result) {
                        nav(process(...(result as any)) + "/" + hit.id);

                        return true;
                    }
                }
            }
        });
        if (!tag) throw new Error("没有找到路径");
    };
    return (
        <>
            <InstantSearch indexName="poetry" searchClient={searchClient}>
                <nav style={{ position: "relative", margin: "0 0.5rem" }}>
                    <Trigger
                        popup={() => (
                            <nav
                                style={{
                                    position: "absolute",
                                    top: "120%",
                                    left: "50%",
                                    width: "20rem",
                                    transform: "translateX(-50%)",
                                    maxHeight: "50vh",
                                    overflow: "scroll",
                                }}>
                                <Hits
                                    className="one-row"
                                    hitComponent={({ hit }) => (
                                        <nav
                                            key={hit.id as string}
                                            className="box-col one-row"
                                            onClick={() => jumpTo(hit as any)}>
                                            <header
                                                className="box-row"
                                                style={{
                                                    whiteSpace: "nowrap",
                                                }}>
                                                <Highlight
                                                    attribute="title"
                                                    hit={hit}
                                                />
                                                <div
                                                    style={{ flex: "1" }}></div>
                                                <Highlight
                                                    attribute="author"
                                                    hit={hit}></Highlight>
                                            </header>

                                            <main
                                                className="one-row"
                                                style={{
                                                    fontSize: "0.7rem",
                                                }}>
                                                <Highlight
                                                    attribute="content"
                                                    hit={hit}
                                                />
                                            </main>
                                        </nav>
                                    )}
                                />
                            </nav>
                        )}
                        trigger={["hover", "focus"]}
                        blurToHide={false}>
                        <SSearchBox />
                    </Trigger>
                </nav>
            </InstantSearch>
        </>
    );
};
