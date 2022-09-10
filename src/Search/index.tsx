import { Trigger } from "@arco-design/web-react";
import { FC, useRef, useState } from "react";
// fixed: 整个区块的样式被异步加载了
import {
    InstantSearch,
    SearchBox as SSearchBox,
    Highlight,
    Hits,
} from "react-instantsearch-hooks-web";
import { useNavigate } from "react-router-dom";

const _SearchBox: FC = () => {
    // TODO 搜索次数太多了
    const searchClient = (globalThis as any).instantMeiliSearch(
        __Search_Origin__,
        __Search_Key__,
        {
            paginationTotalHits: 10,
            placeholderSearch: false,
            primaryKey: "id",
        }
    );
    return (
        <>
            <InstantSearch indexName="poetry" searchClient={searchClient}>
                <nav style={{ position: "relative", margin: "0 0.5rem" }}>
                    <Trigger
                        popup={() => <Panel></Panel>}
                        trigger={["hover", "focus"]}
                        blurToHide={false}>
                        {/* 官方组件没有 debounce ，所以需要自己重写代码 */}
                        <SSearchBox />
                    </Trigger>
                </nav>
            </InstantSearch>
        </>
    );
};
export default _SearchBox;
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
const Panel = () => {
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
                    <div
                        style={{
                            width: "100%",
                        }}
                        key={hit.id as string}
                        className="box-col one-row"
                        onClick={() => jumpTo(hit as any)}>
                        <header
                            className="box-row"
                            style={{
                                justifyContent: "space-between",
                                whiteSpace: "nowrap",
                            }}>
                            <Highlight attribute="title" hit={hit} />
                            <Highlight attribute="author" hit={hit}></Highlight>
                        </header>
                    </div>
                )}
            />
        </nav>
    );
};
