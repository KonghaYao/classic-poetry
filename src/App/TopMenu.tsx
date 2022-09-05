import { FunctionComponent } from "react";
import { Button, Menu, Space } from "@arco-design/web-react";
import { FontChange } from "./FontChange";
import { ThemeChange } from "./ThemeChange";
import { useSetting } from "../Setting";
import { IconSettings } from "@arco-design/web-react/icon";
import { Navigate, useNavigate } from "react-router-dom";

export const TopMenu: FunctionComponent<{}> = (args) => {
    const { init, server } = useSetting();
    const nav = useNavigate();
    return (
        <Menu
            mode="horizontal"
            collapse={false}
            style={{
                borderBottom: "1px solid var(--divide-gold)",
            }}>
            <Space size="large" align="center">
                <div
                    style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                    onClick={() => nav("/")}>
                    中华诗词大典
                </div>
                <div style={{ flex: "1" }}></div>
                <FontChange />
                <ThemeChange></ThemeChange>
                {init()}
                <Button
                    onClick={() => {
                        server.emit("toggle", true);
                    }}>
                    <IconSettings />
                </Button>
            </Space>
        </Menu>
    );
};
