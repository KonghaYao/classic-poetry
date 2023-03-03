import { useInfiniteScroll } from "ahooks";
import React, { useRef } from "react";
export const useCatalogueListLoad = ({
    ref,
    name,
}: {
    ref: React.RefObject<HTMLDivElement>;
    name: string;
}) => {
    return useInfiniteScroll(
        (a) => {
            const p = new URLSearchParams();
            p.set("name", name);
            p.set("limit", "100");
            p.set("page", a?.next || 1);
            return fetch(`/book/query.json?` + p.toString())
                .then<{
                    total: number;
                    data: { id: string; title: string }[];
                    next: number;
                }>((res) => res.json())
                .then((res) => {
                    return {
                        list: res.data,
                        next: res.next,
                        total: res.total,
                    };
                });
        },
        {
            threshold: 30,
            target: ref,
            isNoMore: (d) => d?.next === null,
        }
    );
};

export const CatalogueList = (props: { name: string }) => {
    console.log(props.name);
    const ref = useRef<HTMLDivElement>(null);

    const query = useCatalogueListLoad({ ref, name: props.name });
    // const { data, error, loading } = useBookIndexMapper(props);
    return (
        <section className="box-col no-scroll link-list" ref={ref}>
            <ul
                className="flex flex-wrap justify-between text-2xl"
                style={{ fontSize: "1.5rem" }}>
                {(query.data?.list ?? []).map((i, index) => {
                    return (
                        <a
                            href={`/poetry/${i.id}`}
                            key={"to-" + i.id}
                            className="text-lg">
                            <li
                                className="long-list-item px-2 py-1 hover:brightness-110 "
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
        <div className="w-full flex justify-center items-center text-sm">
            {noMore && "没有更多啦"}
            {loadingMore && "加载中"}
        </div>
    );
};
