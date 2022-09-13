import { Avatar } from "@arco-design/web-react";
import { NavLink } from "react-router-dom";
import { useServer } from "..";

const component = () => {
    return (
        <NavLink to="/contribute">
            <Avatar size={32}>
                <img alt="avatar" src="/avatar.png" />
            </Avatar>
        </NavLink>
    );
};
export const applyAuthor = () => {
    useServer().register({
        id: "author-avatar",
        position: "header-right",
        component,
    });
};
