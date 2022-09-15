import { IconSearch } from "@arco-design/web-react/icon";
import { NavLink, useNavigate } from "react-router-dom";
import { useServer } from "..";

const component = () => {
    const nav = useNavigate();
    return <IconSearch onClick={() => nav("/search")}></IconSearch>;
};
export const applySearchButton = () => {
    useServer().register({
        id: "search",
        position: "header-right",
        component,
    });
};
