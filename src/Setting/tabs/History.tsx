import { Button, Form, Switch } from "@arco-design/web-react";
import { FC } from "react";
import { useSetting } from "..";
import { History } from "../../History";
import { Hint } from "./Hint";

export const HistoryManager: FC<{}> = () => {
    const { setting, server } = useSetting();
    return (
        <Form>
            <Form.Item label="跟踪阅读记录">
                <Switch
                    defaultChecked={setting.poetry.history.enable}
                    onChange={(val) => {
                        if (val === false) {
                            History.clear("*");
                        }
                        server.emit("change", {
                            poetry: { history: { enable: val } },
                        });
                    }}></Switch>
                <Hint message="关闭将会删除您的阅读记录"></Hint>
            </Form.Item>
            <Form.Item label="清空阅读记录">
                <Button onClick={() => History.clear("*")}> 请慎重点击</Button>
            </Form.Item>
        </Form>
    );
};
