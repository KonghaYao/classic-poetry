import { Button, Message } from "@arco-design/web-react";
import { IconDelete } from "@arco-design/web-react/icon";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { DataType } from "../ContextMenu";
import { BookNotes } from "../../NoteBar/BookNote";
export const Close: FC<DataType> = ({ highlighter, lookingId }) => {
    let TwiceCheck = false;
    return (
        <Button
            onClick={() => {
                if (TwiceCheck) {
                    highlighter.remove(lookingId);
                    BookNotes.removeNote(lookingId);
                } else {
                    TwiceCheck = true;
                    Message.warning("请再次点击确认删除");
                }
            }}>
            <IconDelete fontSize={20}></IconDelete>
        </Button>
    );
};
