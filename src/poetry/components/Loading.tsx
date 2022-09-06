import { Empty } from "@arco-design/web-react";
import { IconLoading } from "@arco-design/web-react/icon";

export const Loading = () => {
    return (
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
    );
};
