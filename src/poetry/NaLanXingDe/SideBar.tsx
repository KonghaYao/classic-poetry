import { FC } from "react";
import { FetchData, Tagger } from "./NaLanXingDe";
import { SideBarInner } from "../components/SideBarInner";

export const SideBar: FC<{ poetryId: string; data: FetchData }> = (props) => {
    return (
        <SideBarInner
            {...props}
            root="/nalanxingde"
            Tagger={Tagger}></SideBarInner>
    );
};
