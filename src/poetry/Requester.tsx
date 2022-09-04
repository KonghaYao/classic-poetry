import { Empty } from "@arco-design/web-react";
import { IconClose, IconLoading } from "@arco-design/web-react/icon";
import { useRequest } from "ahooks";

export const Requester = function <T>(props: {
    url: string;
    element: (data: T) => JSX.Element;
}) {
    const { data, loading, error } = useRequest<T, any>(() =>
        fetch(props.url).then((res) => res.json())
    );

    return (
        <>
            {loading && (
                <Empty
                    icon={
                        <div
                            style={{
                                background: "#f2994b",
                                display: "inline-flex",
                                borderRadius: "50%",
                                width: 50,
                                height: 50,
                                fontSize: 30,
                                alignItems: "center",
                                color: "white",
                                justifyContent: "center",
                            }}>
                            <IconLoading />
                        </div>
                    }
                    description="加载数据中"
                />
            )}
            {error && (
                <Empty
                    icon={
                        <div
                            style={{
                                background: "var(--red-6)",
                                display: "inline-flex",
                                borderRadius: "50%",
                                width: 50,
                                height: 50,
                                fontSize: 30,
                                alignItems: "center",
                                color: "white",
                                justifyContent: "center",
                            }}>
                            <IconClose />
                        </div>
                    }
                    description="数据加载错误了"
                />
            )}
            {!error && !loading && props.element(data!)}
        </>
    );
};
