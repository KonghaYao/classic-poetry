import { FC } from "react";
import { FetchData, Tagger } from "./HuaJianJi";
import { SideBarInner } from "../components/BookGenerator/SideBarInner";
export const SideBar: FC<{ poetryId: string; data: FetchData }> = (props) => {
    return (
        <SideBarInner
            {...props}
            root="/huajianji"
            Tagger={Tagger}></SideBarInner>
    );
};
