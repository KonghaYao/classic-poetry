import debounce from "lodash/debounce";
import { FC, useRef, useState } from "react";
// fixed: 整个区块的样式被异步加载了
import {
    Pagination,
    InstantSearch,
    SearchBox as SSearchBox,
    Highlight,
    Hits,
    useSearchBox,
} from "react-instantsearch-hooks-web";
import {
    useLocation,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from "react-router-dom";
import { SearchBoxInner } from "./SearchBox";
import { StaticToPath } from "./StaticToPath";

const _SearchBox: FC = () => {
    let location = useLocation();
    const searchParams = createSearchParams(location.search);
    const searchClient = (globalThis as any).instantMeiliSearch(
        __Search_Origin__,
        __Search_Key__,
        {
            placeholderSearch: false,
            finitePagination: true,
            primaryKey: "id",
            limitPerRequest: 30,
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
                    <SearchBoxInner
                        defaultValue={searchParams.get("q") || ""}
                        queryHook={debounce((text, search) => {
                            if (text) {
                                search(text);
                            }
                        }, 500)}
                    />

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
const PPanel = () => {
    const nav = useNavigate();
    const jumpTo = (hit: { belongTo: string; id: string }) => {
        nav(StaticToPath(hit));
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
