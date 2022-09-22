import { Button, Space } from "@arco-design/web-react";
import {
    IconBook,
    IconLeft,
    IconUnorderedList,
} from "@arco-design/web-react/icon";
import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { sidebarServer } from "../SideBar/server";
import { BookContext } from "../BookContext";
import { NoteBarServer } from "../NoteBar";

const PageHeader: FC<{
    title: string;
    subTitle?: string;
    onBack: Function;
    children: React.ReactNode;
}> = (props) => {
    return (
        <div className={`poetry-header `}>
            <div>
                <span className="title">{props.title}</span>
                <span className="subtitle">{props.subTitle}</span>
            </div>
            <div className="flex-1"></div>
            <div>{props.children}</div>
        </div>
    );
};

export const PoetryHeader: FC = () => {
    const nav = useNavigate();
    return (
        <BookContext.Consumer>
            {(info) => {
                const matched = info!.matched;
                const textCount = matched.content.reduce((col, cur) => {
                    const m: string = cur.replace(
                        /[^\u4e00-\u9fff\uf900-\ufaff]/g,
                        ""
                    );
                    return col + m.length;
                }, 0);
                return (
                    <PageHeader
                        title={matched.title}
                        subTitle={matched.subTitle}
                        onBack={() => {
                            nav(info!.root);
                        }}>
                        {/* // TODO 勘误功能 */}
                        <Space>
                            <div>
                                全文
                                <span style={{ fontSize: "1.125em" }}>
                                    {textCount}
                                </span>
                                字
                            </div>
                            <div
                                onClick={() => {
                                    sidebarServer.emit("toggleVisible");
                                }}>
                                <IconUnorderedList />
                            </div>
                            <div
                                onClick={() => {
                                    NoteBarServer.emit("toggle");
                                }}>
                                <IconBook />
                            </div>
                        </Space>
                    </PageHeader>
                );
            }}
        </BookContext.Consumer>
    );
};
