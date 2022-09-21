import { IconDelete } from "@arco-design/web-react/icon";
import { FC } from "react";
import { DataType } from "../ContextMenu";

export const Close: FC<DataType> = ({ highlighter, lookingId }) => {
    return (
        <div onClick={() => highlighter.remove(lookingId)}>
            <IconDelete></IconDelete>
        </div>
    );
};
