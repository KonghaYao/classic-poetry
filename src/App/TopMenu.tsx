import { Space } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import "./TopMenu.css";
import { createServer, SlotMap } from "../Server/Template";
import { memo } from "react";

///

const { Template, controller } = createServer<{}, "", "Button">({
    name: "header-right",
});

export { controller as TopMenuController };

export const TopMenu = Template<{}>(({ SlotList }) => {
    const nav = useNavigate();
    return (
        <nav className="box-row top-menu">
            <div className="top-menu-title" onClick={() => nav("/")}>
                中华诗词大典
            </div>
            <div style={{ flex: "1" }}></div>
            <nav
                className="box-row"
                style={{
                    fontSize: "1.3rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "40vmin",
                }}>
                <SlotMap list={SlotList.Button}></SlotMap>
            </nav>
        </nav>
    );
});
