import { FunctionComponent } from "react";
import { Button, Menu, Space } from "@arco-design/web-react";
import { FontChange } from "./FontChange";
import { ThemeChange } from "./ThemeChange";
import { useSetting } from "../Setting";
import { IconSettings } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";

export const TopMenu: FunctionComponent<{}> = (args) => {
    const { init, server } = useSetting();
    const nav = useNavigate();
    return (
        <nav
            className="box-row"
            style={{
                padding: "1rem 2rem",
                boxShadow: "var(--shadow)",
            }}>
            <div
                style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                onClick={() => nav("/")}>
                中华诗词大典
            </div>
            <div style={{ flex: "1" }}></div>
            <Space size="small" align="center">
                <ThemeChange></ThemeChange>
                {init()}
                <div
                    onClick={() => {
                        server.emit("toggle", true);
                    }}>
                    <IconSettings
                        style={{
                            fontSize: "1.125rem",
                        }}
                    />
                </div>
            </Space>
        </nav>
    );
};
