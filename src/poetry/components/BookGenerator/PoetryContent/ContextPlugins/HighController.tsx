import { Popconfirm } from "@arco-design/web-react";
import { IconDelete } from "@arco-design/web-react/icon";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { DataType } from "../ContextMenu";
import { BookNotes } from "./BookNote";
export const Close: FC<DataType> = ({ highlighter, lookingId }) => {
    const location = useLocation();
    return (
        <Popconfirm
            title="确定删除？"
            onOk={() => {
                highlighter.remove(lookingId);
                BookNotes.removeNote(location.pathname, lookingId);
            }}>
            <IconDelete></IconDelete>
        </Popconfirm>
    );
};
