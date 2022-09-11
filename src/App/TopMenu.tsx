import { FunctionComponent } from "react";
import { Space } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import { SearchBox } from "../Search/SearchBox";
import { useSlot } from "../Server";
import { useUnmount } from "ahooks";

export const TopMenu: FunctionComponent<{}> = (args) => {
    const { slots, destroy } = useSlot({ position: "header-right" });

    const nav = useNavigate();
    useUnmount(() => {
        destroy();
    });
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
            <Space
                align="center"
                size="medium"
                style={{
                    fontSize: "1.3rem",
                }}>
                {slots.map((Temp) => {
                    return <Temp key={(Temp as any).id} />;
                })}
            </Space>
        </nav>
    );
};
