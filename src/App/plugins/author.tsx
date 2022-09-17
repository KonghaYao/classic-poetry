import { Avatar } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { TopMenuController } from "../TopMenu";

const component: FC = () => {
    return (
        <NavLink to="/contribute">
            <Avatar size={32}>
                <img alt="avatar" src="/avatar.png" />
            </Avatar>
        </NavLink>
    );
};
export const applyAuthor = () => {
    TopMenuController.emit("register", {
        slot: "Button",
        component,
        list: true,
    });
};
