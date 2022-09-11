import { Button, Empty, Result, Space } from "@arco-design/web-react";
import { IconLoading } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";

export const Loading = () => {
    const nav = useNavigate();
    return (
        <Result
            status="404"
            subTitle="没有发现文章哦"
            className="box-col"
            icon={<IconLoading fontSize={30} />}
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
