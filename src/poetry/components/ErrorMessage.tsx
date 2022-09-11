import { Button, Empty, Result, Space } from "@arco-design/web-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorMessage: FC<{ message?: string }> = (props) => {
    const nav = useNavigate();
    return (
        <Result
            status="error"
            title="发生错误了"
            subTitle={props.message}
            className="box-col"
            style={{ height: "100%", justifyContent: "center" }}
            extra={
                <Space>
                    <Button onClick={() => nav(-1)} type="secondary">
                        上一页
                    </Button>
                    <Button onClick={() => nav("/")} type="secondary">
                        首页
                    </Button>
                </Space>
            }></Result>
    );
};
