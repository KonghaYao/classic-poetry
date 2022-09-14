import { FC, useRef, useState } from "react";
// fixed: 整个区块的样式被异步加载了
import {
    Pagination,
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
            placeholderSearch: false,
            primaryKey: "id",
        }
    );
    return (
        <>
            <InstantSearch indexName="poetry" searchClient={searchClient}>
                {/* <RefinementList
                            attribute="author"
                            searchable={true}
                            searchablePlaceholder="Search brands"
                            showMore={true}
                        /> */}
                <div className="box box-col">
                    <SSearchBox />
                    <div className="box flex-1" style={{ overflow: "scroll" }}>
                        <PPanel></PPanel>
                    </div>
                    <Pagination className="Pagination" />
                </div>
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
        ...[
            "sanzijing-traditional",
            "sanzijing-new",
            "qianziwen",
            "baijiaxing",
            "zhuzijiaxun",
            "shenglvqimeng",
            "wenzimengqiu",
            "zengguangxianwen",
        ].reduce((col, cur) => {
            col[`mengxue/${cur}.json`] = "/mengxue";
            return col;
        }, {} as { [key: string]: string }),

        ...[
            "guwenguanzhi",
            "dizigui",
            "qianjiashi",
            "tangshisanbaishou",
            "youxueqionglin",
        ].reduce((col, cur) => {
            col[`mengxue/${cur}.json`] = cur;
            return col;
        }, {} as { [key: string]: string }),
    }),
    [/sishuwujing\/.*/, "/sishuwujing"],
    [/wudai\/huajianji.*/, "/huajianji"],
    [/wudai\/nantang.*/, "/nantang"],
    [
        /json\/poet.tang.(\d+).json/,
        (_, num: string) => {
            return "/tang/" + num;
        },
    ],
    [
        /json\/poet.song.(\d+).json/,
        (_, num: string) => {
            return "/song/" + num;
        },
    ],
];
const PPanel = () => {
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
        <Hits
            hitComponent={({ hit }) => (
                <div
                    style={{
                        width: "30em",
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
                        <Highlight
                            attribute="title"
                            className="one-row"
                            style={{ maxWidth: "80%" }}
                            hit={hit}
                        />
                        <Highlight attribute="author" hit={hit}></Highlight>
                    </header>
                </div>
            )}
        />
    );
};
