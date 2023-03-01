import { usePagination, useRequest } from "ahooks";

export const CatalogueList = (props: { name: string }) => {
    console.log(props.name);
    const { data, error, loading } = usePagination(({ current, pageSize }) => {
        const p = new URLSearchParams();
        p.set("name", props.name);
        p.set("pageSize", pageSize.toString());
        p.set("page", current.toString());
        return fetch(`/book/query.json?` + p.toString())
            .then<{
                total: number;
                data: { id: string; title: string }[];
            }>((res) => res.json())
            .then((res) => {
                return { total: res.total, list: res.data };
            });
    });
    return (
        <section className="flex flex-wrap" style={{ fontSize: "1.5rem" }}>
            {(data?.list ?? []).map((i, index) => {
                return (
                    <a
                        href={`/poetry/${i.id}`}
                        key={"to-" + i.id}
                        className="text-lg">
                        <nav
                            className="long-list-item px-2 py-1 hover:brightness-110"
                            style={{
                                textAlign: "center",
                            }}>
                            {i.title}
                        </nav>
                    </a>
                );
            })}
        </section>
    );
};
