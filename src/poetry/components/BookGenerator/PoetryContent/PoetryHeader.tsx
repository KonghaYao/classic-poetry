import { PageHeader, Space } from "@arco-design/web-react";
import { IconUnorderedList } from "@arco-design/web-react/icon";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { sidebarServer } from "../SideBar/server";
import { BookContext } from "../BookContext";

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
                        backIcon
                        style={{
                            borderBottom: "2px solid var(--divide-red)",
                        }}
                        onBack={() => {
                            nav(info!.root);
                        }}
                        extra={
                            // TODO 勘误功能
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
                            </Space>
                        }
                    />
                );
            }}
        </BookContext.Consumer>
    );
};
