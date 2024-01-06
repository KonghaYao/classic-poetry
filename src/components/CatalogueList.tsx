import {
    Atom,
    atom,
    DebounceAtom,
    useEffectWithoutFirst,
    usePaginationStack,
} from "@cn-ui/reactive";
import { Show } from "solid-js";
import { ImSearch } from "solid-icons/im";
import { client } from "../backend/client";
export const useCatalogueListLoad = (name: string, searchText = atom("")) =>
    usePaginationStack(async (pageNumber: number, maxPage: Atom<number>) => {
        return client.searchPoetryNameInSection
            .query({
                page: pageNumber,
                belongToName: name,
                search: searchText(),
            })
            .then((res) => res.hits)
            .finally(() => maxPage((i) => i++));
    }, {});

/** 特别为 input 组件使用的事件绑定 */
function AtomToModel<T>(a: Atom<T>) {
    const oninput = (e: any) => {
        a(() => e.target.value);
    };
    return { "on:input": oninput, value: a() };
}
export const CatalogueList = (props: { name: string }) => {
    const ref = atom<HTMLDivElement | null>(null);
    const searchText = atom("");
    const { dataSlices, currentData, next, resetStack } = useCatalogueListLoad(
        props.name,
        searchText
    );
    useEffectWithoutFirst(() => resetStack(), [DebounceAtom(searchText, 1000)]);
    return (
        <>
            <section class="flex flex-col no-scroll link-list" ref={ref}>
                <ul class="flex flex-wrap justify-between text-2xl gap-2">
                    {(dataSlices() ?? []).flat().map((i) => {
                        return (
                            <a
                                href={`/poetry/${i.id}`}
                                class="text-lg bg-gray-100 dark:bg-gray-700 rounded-lg border-1 border-white p-2 text-[#496884] dark:text-[#a3b9cc]">
                                <li class="long-list-item  hover:brightness-110">
                                    {i.title}
                                </li>
                            </a>
                        );
                    })}
                    <Show
                        when={currentData()?.length}
                        fallback={
                            <span class="text-lg bg-gray-100 dark:bg-gray-700 rounded-lg border-1 border-white p-2 text-yellow-500 w-full cursor-pointer text-center flex-none">
                                {currentData()?.length === 0 && "没有更多啦"}
                                {currentData.loading() && "加载中"}
                            </span>
                        }>
                        <span
                            class="text-lg bg-gray-100 dark:bg-gray-700 rounded-lg border-1 border-white p-2 text-yellow-500 w-full cursor-pointer text-center flex-none"
                            onclick={next}>
                            加载更多
                        </span>
                    </Show>
                </ul>
            </section>
            <div class="flex gap-4 flex-row rounded-lg bg-gray-100 dark:bg-gray-700 p-2 items-center mb-4">
                <ImSearch />
                <input
                    type="text"
                    class="outline-none flex-1 bg-transparent"
                    {...AtomToModel(searchText)}
                />
            </div>
        </>
    );
};
