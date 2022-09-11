import { Button, Result, Space } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const nav = useNavigate();
    return (
        <Result
            status="404"
            subTitle="没有发现文章哦"
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
