import { Empty } from "@arco-design/web-react";
import { IconClose } from "@arco-design/web-react/icon";

export const NotFound = () => {
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
            description="404 没有发现文章"
        />
    );
};
