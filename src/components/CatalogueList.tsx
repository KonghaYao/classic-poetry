import { useInfiniteScroll } from "ahooks";
import React, { useRef } from "react";
import { getIndex } from "../backend/getClient";
export const useCatalogueListLoad = ({
    ref,
    name,
}: {
    ref: React.RefObject<HTMLDivElement>;
    name: string;
}) => {
    return useInfiniteScroll(
        async (a) => {
            const ThisCount = a?.next || 0;
            const res = await getIndex().search("", {
                filter: `belongToName = '${name}'`,
                limit: 30,
                offset: ThisCount * 30,
                attributesToRetrieve: ["author", "belongToName", "id", "title"],
            });
            console.log(res);
            return {
                list: res.hits || [],
                next: res.hits?.length === 0 ? null : ThisCount + 1,
            };
        },
        {
            threshold: 30,
            target: ref,
            isNoMore: (d) => d?.next === null,
        }
    );
};

export const CatalogueList = (props: { name: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const query = useCatalogueListLoad({ ref, name: props.name });
    // const { data, error, loading } = useBookIndexMapper(props);
    return (
        <section class="box-col no-scroll link-list" ref={ref}>
            <ul class="flex flex-wrap justify-between text-2xl">
                {(query.data?.list ?? []).map((i) => {
                    return (
                        <a
                            href={`/poetry/${i.id}`}
                            key={"to-" + i.id}
                            class="text-lg">
                            <li
                                class="long-list-item px-2 py-1 hover:brightness-110 "
                                style={{
                                    textAlign: "center",
                                }}>
                                {i.title}
                            </li>
                        </a>
                    );
                })}
                <InfiniteInfo {...query}></InfiniteInfo>
            </ul>
        </section>
    );
};
export const InfiniteInfo = ({
    noMore,
    loadingMore,
}: Pick<ReturnType<typeof useInfiniteScroll>, "noMore" | "loadingMore">) => {
    return (
        <div class="w-full flex justify-center items-center text-sm">
            {noMore && "没有更多啦"}
            {loadingMore && "加载中"}
        </div>
    );
};
