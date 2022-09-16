import { FunctionComponent } from "react";
import { Space } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import { useSlot } from "../Server";
import { useUnmount } from "ahooks";
import "./TopMenu.css";
export const TopMenu: FunctionComponent<{}> = (args) => {
    const { slots, destroy } = useSlot({ position: "header-right" });

    const nav = useNavigate();

    useUnmount(() => {
        destroy();
    });
    return (
        <nav className="box-row top-menu">
            <div className="top-menu-title" onClick={() => nav("/")}>
                中华诗词大典
            </div>
            <div style={{ flex: "1" }}></div>
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
