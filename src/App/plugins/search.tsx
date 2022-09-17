import { IconSearch } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";
import { TopMenuController } from "../TopMenu";

const component = () => {
    const nav = useNavigate();
    return <IconSearch onClick={() => nav("/search")}></IconSearch>;
};
export const applySearchButton = () => {
    TopMenuController.emit("register", {
        slot: "Button",
        component,
        list: true,
    });
};
