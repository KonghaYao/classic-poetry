import { SystemPlugin } from "../system";
import { ImSearch } from "solid-icons/im";
export class SearchPlugin extends SystemPlugin {
    config = {
        position: "header" as const,
    };
    render() {
        return (
            <a class="cursor-pointer" href="/search">
                <ImSearch />
            </a>
        );
    }
}
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import instantsearch from "instantsearch.js";
import "instantsearch.css/themes/satellite.css";

import {
    searchBox,
    clearRefinements,
    refinementList,
    configure,
    hits,
    pagination,
} from "instantsearch.js/es/widgets";
import { onCleanup, onMount } from "solid-js";
import { debounce } from "instantsearch.js/es/lib/utils";
const searchClient = instantMeiliSearch(
    "https://ms-7d12842fe386-5010.sgp.meilisearch.io", // Host
    "cda948750d1d469e892b40b5aaeeedbe70a18b0a0252477949bafaa8284ebf4c", // API key
    {
        placeholderSearch: true,
        finitePagination: true,
        primaryKey: "id",
    }
);

export const SearchPage = () => {
    const search = instantsearch({
        indexName: "poetries",
        routing: true,
        searchClient,
        stalledSearchDelay: 1000,
    });
    onMount(() => {
        search.addWidgets([
            searchBox({
                container: "#searchbox",
                queryHook: debounce(function (query, search) {
                    search(query);
                }, 1000),
            }),
            clearRefinements({
                container: "#clear-refinements",
            }),
            refinementList({
                container: "#genres-list",
                attribute: "belongToName",
            }),
            configure({
                hitsPerPage: 6,
                snippetEllipsisText: "...",
                attributesToSnippet: ["description:50"],
            }),
            hits({
                container: "#hits",
                templates: {
                    empty(hist, { html }) {
                        return html`<div>无数据</div>`;
                    },
                    item(hit, { html, components }) {
                        return html`<div
                            class="flex flex-col gap-2 w-full overflow-hidden ">
                            <div class="flex flex-row justify-between gap-4">
                                <a
                                    href="/poetry/${hit.id}"
                                    target="_self"
                                    class="flex-none max-w-xs line-clamp-1"
                                    title="${hit.title}">
                                    ${components.Highlight({
                                        hit,
                                        attribute: "title",
                                    })}
                                </a>
                                <a
                                    href="/author/${hit.id}"
                                    target="_self"
                                    class="flex-none">
                                    ${components.Highlight({
                                        hit,
                                        attribute: "author",
                                    })}
                                </a>
                            </div>
                            <div class="hit-description line-clamp-2">
                                ${components.Snippet({
                                    hit,
                                    attribute: "content",
                                })}
                            </div>
                        </div>`;
                    },
                },
            }),
            pagination({
                container: "#pagination",
            }),
        ]);

        search.start();
    });
    onCleanup(() => search.dispose());
    return (
        <div class="flex flex-row max-w-3xl m-auto w-full  pt-8 pb-4 h-full gap-8">
            <div class="left-panel">
                <div id="clear-refinements"></div>

                <h2>诗集</h2>
                <div id="genres-list"></div>
            </div>

            <div class="right-panel flex flex-col">
                <div id="searchbox" class="ais-SearchBox"></div>
                <div id="hits" class="flex-1 overflow-scroll"></div>
                <div id="pagination"></div>
            </div>
        </div>
    );
};
