import { Button, Empty, Result, Space } from "@arco-design/web-react";
import { IconLoading } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";

export const Loading = () => {
    const nav = useNavigate();
    return (
        <Empty
            className="box-col"
            style={{ height: "100%", justifyContent: "center" }}
            icon={
                <IconLoading
                    spin
                    color="var(--divide-gold)"
                    fontSize={30}></IconLoading>
            }
            description={
                <Space direction="vertical">
                    <div>加载数据中，请稍等</div>
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
