import { Button, Form, Switch } from "@arco-design/web-react";
import { FC, useState } from "react";
import { useSetting } from "..";
import { History } from "../../History";
import { Hint } from "./Hint";

export const HistoryManager: FC<{}> = () => {
    const { setting, server } = useSetting();
    const [size, setSize] = useState(History.cache.length);
    return (
        <Form layout="vertical">
            <Form.Item label="跟踪阅读记录">
                <Switch
                    defaultChecked={setting.poetry.history.enable}
                    onChange={(val) => {
                        if (val === false) {
                            History.clear("*");
                        } else {
                            History.restart();
                        }
                        server.emit("change", {
                            poetry: { history: { enable: val } },
                        });
                        setSize(History.cache.length);
                    }}></Switch>
                <Hint message="关闭将会删除您的阅读记录, 重启页面将会执行效果"></Hint>
            </Form.Item>
            <Form.Item label="清空阅读记录">
                {size}
                <Button
                    onClick={() => {
                        History.clear("*");
                        setSize(History.cache.length);
                    }}>
                    请慎重点击
                </Button>
            </Form.Item>
        </Form>
    );
};
