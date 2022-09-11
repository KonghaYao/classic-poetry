import React, { FunctionComponent, Suspense, useState } from "react";
import { Avatar, Tooltip } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import { SearchBox } from "../Search/SearchBox";
import { useSlot } from "../Server";

export const TopMenu: FunctionComponent<{}> = (args) => {
    const { slots } = useSlot({ position: "header-right" });

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
                {slots.map((Temp) => (
                    <Temp key={(Temp as any).id} />
                ))}

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
