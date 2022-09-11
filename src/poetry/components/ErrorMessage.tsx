import { Button, Empty, Result, Space } from "@arco-design/web-react";
import { IconClose } from "@arco-design/web-react/icon";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorMessage: FC<{ message?: string }> = (props) => {
    const nav = useNavigate();
    return (
        <Empty
            className="box-col"
            style={{ height: "100%", justifyContent: "center" }}
            icon={
                <IconClose color="var(--divide-red)" fontSize={30}></IconClose>
            }
            description={
                <Space direction="vertical">
                    <div>{props.message || "发生错误了"}</div>
                    <Space>
                        <Button onClick={() => nav(-1)} type="secondary">
                            上一页
                        </Button>
                        <Button onClick={() => nav("/")} type="secondary">
                            首页
                        </Button>
                    </Space>
                </Space>
            }></Empty>
    );
};
