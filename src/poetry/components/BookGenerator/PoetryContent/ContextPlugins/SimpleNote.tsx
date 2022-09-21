import { Button, Input } from "@arco-design/web-react";
import {
    IconBook,
    IconCheck,
    IconEdit,
    IconPen,
} from "@arco-design/web-react/icon";
import { FC, useState } from "react";
import { ContextMenuController, DataType } from "../ContextMenu";
import { BookNotes } from "./BookNote";
/** 内容模块 */
const component: FC<DataType> = ({ lookingId }) => {
    const Note = BookNotes.getNote(lookingId);
    const [writingMode, setMode] = useState(false);
    const [value, setValue] = useState(Note?.note?.text ?? "");
    return (
        <div>
            <header className="box-row">
                <div>你的笔记</div>
                {writingMode ? (
                    <IconCheck
                        onClick={() => {
                            if (Note!.note) {
                                Note!.note!.text = value!;
                            } else {
                                Note!.note = {
                                    text: value,
                                };
                            }
                            BookNotes.saveBook();
                            setMode(false);
                        }}></IconCheck>
                ) : (
                    <IconPen
                        onClick={() => {
                            setMode(true);
                            setValue(Note?.note?.text || "");
                        }}></IconPen>
                )}
            </header>
            {writingMode ? (
                <Input.TextArea
                    value={value}
                    onChange={(str) => {
                        setValue(str);
                    }}></Input.TextArea>
            ) : Note?.note?.text ? (
                <div>{Note?.note.text}</div>
            ) : (
                <div>空空如也</div>
            )}
        </div>
    );
};
export const SimpleNote: FC<DataType> = () => {
    return (
        <Button
            onClick={() => {
                ContextMenuController.emit("register", {
                    slot: "Header",
                    component,
                });
            }}>
            <IconEdit fontSize={20}></IconEdit>
        </Button>
    );
};
