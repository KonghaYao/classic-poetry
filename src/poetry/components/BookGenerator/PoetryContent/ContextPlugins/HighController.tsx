import { Button } from "@arco-design/web-react";
import { IconDelete } from "@arco-design/web-react/icon";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { DataType } from "../ContextMenu";
import { BookNotes } from "./BookNote";
export const Close: FC<DataType> = ({ highlighter, lookingId }) => {
    return (
        <Button
            onClick={() => {
                highlighter.remove(lookingId);
                BookNotes.removeNote(lookingId);
            }}>
            <IconDelete fontSize={20}></IconDelete>
        </Button>
    );
};
