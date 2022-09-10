import React, { FunctionComponent, useState } from "react";
import { Avatar, Button, Menu, Space, Tooltip } from "@arco-design/web-react";
import { ThemeChange } from "./ThemeChange";
import { useSetting } from "../Setting";
import { IconSettings } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";
import { SearchBox } from "../Search/SearchBox";
import { HistoryController } from "../History/Pannel";

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
                style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={() => nav("/")}>
                中华诗词大典
            </div>
            <div style={{ flex: "1" }}></div>
            <SearchBox></SearchBox>
            <nav
                className="box-row"
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "9rem",
                    fontSize: "1.3rem",
                }}>
                <ThemeChange></ThemeChange>
                {init()}

                <IconSettings
                    onClick={() => {
                        server.emit("toggle", true);
                    }}
                />
                <HistoryController></HistoryController>
                <Tooltip content="这个是辛苦劳累的作者">
                    <a
                        href="https://github.com/KonghaYao/classic-poetry"
                        target="_blank">
                        <Avatar size={32}>
                            <img alt="avatar" src="/avatar.png" />
                        </Avatar>
                    </a>
                </Tooltip>
            </nav>
        </nav>
    );
};
