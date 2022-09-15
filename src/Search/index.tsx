import { Button, Space, Trigger } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import debounce from "lodash/debounce";
import { FC } from "react";
// fixed: 整个区块的样式被异步加载了
import {
    Pagination,
    InstantSearch,
    Highlight,
    Hits,
    RefinementList,
    useConnector,
    SortBy,
    CurrentRefinements,
} from "react-instantsearch-hooks-web";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { SearchBoxInner } from "./SearchBox";
import { StaticToPath } from "./StaticToPath";
import { Stats } from "./Stats";

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
                <main className=" search-content box box-col content-max">
                    <SearchBoxInner
                        defaultValue={searchParams.get("q") || ""}
                        queryHook={debounce((text, search) => {
                            if (text) {
                                search(text);
                            }
                        }, 500)}
                    />
                    <Stats></Stats>
                    <Space
                        align="center"
                        className="box-row"
                        style={{ margin: "0.125rem 0" }}>
                        <Trigger
                            unmountOnExit={false}
                            popup={() => (
                                <div className="refine-panel">
                                    <RefinementList
                                        attribute="belongToName"
                                        searchable={false}
                                        showMore={false}
                                        limit={20}
                                    />
                                </div>
                            )}>
                            <Button>
                                <IconPlus></IconPlus>
                            </Button>
                        </Trigger>
                        <CurrentRefinements
                            classNames={{
                                label: "none",
                            }}
                            includedAttributes={[
                                "belongToName",
                            ]}></CurrentRefinements>
                    </Space>

                    <div
                        className="flex-1"
                        style={{ overflow: "scroll", borderRadius: "8px" }}>
                        <PPanel></PPanel>
                    </div>
                    <Pagination
                        className="Pagination"
                        style={{ margin: "1rem 0 0 0" }}
                    />
                </main>
            </InstantSearch>
        </>
    );
};
export default _SearchBox;
const PPanel = () => {
    const nav = useNavigate();
    const jumpTo = (hit: { belongTo: string; id: string }) => {
        console.log(hit);
        const pos = StaticToPath(hit);
        console.log(pos);
        nav(pos);
    };
    return (
        <Hits
            hitComponent={({ hit }) => (
                <div
                    key={hit.id as string}
                    className="box box-col one-row"
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
                            style={{ maxWidth: "20rem" }}
                            hit={hit}
                        />

                        <div>
                            <Highlight attribute="author" hit={hit}></Highlight>
                            |
                            <Highlight
                                attribute="belongToName"
                                hit={hit}></Highlight>
                        </div>
                    </header>
                </div>
            )}
        />
    );
};
