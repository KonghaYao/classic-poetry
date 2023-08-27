import { getIndex } from "../backend/getClient";
import { Atom, atom, usePaginationStack } from "@cn-ui/reactive";

export const CatalogueList = (props: { name: string }) => {
    const ref = atom<HTMLDivElement | null>(null);
    const { dataSlices, currentData, refetch } = usePaginationStack(
        async (pageNumber: number, maxPage: Atom<number>) => {
            return getIndex()
                .search("", {
                    filter: `belongToName = '${props.name}'`,
                    limit: 30,
                    offset: pageNumber * 30,
                    attributesToRetrieve: [
                        "author",
                        "belongToName",
                        "id",
                        "title",
                    ],
                })
                .then((res) => res.hits)
                .finally(() => maxPage((i) => i++));
        },
        {}
    );
    // const { data, error, loading } = useBookIndexMapper(props);
    return (
        <section class="box-col no-scroll link-list" ref={ref}>
            <ul class="flex flex-wrap justify-between text-2xl">
                {(dataSlices() ?? []).flat().map((i) => {
                    return (
                        <a href={`/poetry/${i.id}`} class="text-lg">
                            <li class="long-list-item px-2 py-1 hover:brightness-110 ">
                                {i.title}
                            </li>
                        </a>
                    );
                })}
                <div class="w-full flex justify-center items-center text-sm">
                    {currentData() &&
                        currentData().length === 0 &&
                        "没有更多啦"}
                    {currentData.loading() && "加载中"}
                </div>
            </ul>
        </section>
    );
};
