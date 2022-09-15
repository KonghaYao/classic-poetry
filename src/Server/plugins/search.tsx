import { IconSearch } from "@arco-design/web-react/icon";
import { NavLink } from "react-router-dom";
import { useServer } from "..";

const component = () => {
    return (
        <NavLink to="/search">
            <IconSearch></IconSearch>
        </NavLink>
    );
};
export const applySearchButton = () => {
    useServer().register({
        id: "search",
        position: "header-right",
        component,
    });
};
