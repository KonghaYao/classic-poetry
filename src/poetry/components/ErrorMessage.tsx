import { Empty } from "@arco-design/web-react";
import { IconClose } from "@arco-design/web-react/icon";
import { FC } from "react";

export const ErrorMessage: FC<{ message?: string }> = (props) => {
    return (
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
            description={props.message || "数据加载错误了"}
        />
    );
};
