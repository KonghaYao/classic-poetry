import { FC } from "react";
import { FetchData, Tagger } from "./NanTang";
import { SideBarInner } from "../components/SideBarInner";
export const SideBar: FC<{ poetryId: string; data: FetchData }> = (props) => {
    return (
        <SideBarInner {...props} root="/nantang" Tagger={Tagger}></SideBarInner>
    );
};
