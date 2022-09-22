import { Button, Input, Message } from "@arco-design/web-react";
import {
    IconBook,
    IconCheck,
    IconEdit,
    IconPen,
} from "@arco-design/web-react/icon";
import { FC, useState } from "react";
import { ContextMenuController, DataType } from "../ContextMenu";
import { BookNotes } from "../../NoteBar/BookNote";
/** 内容模块 */
export const NoteWriter: FC<{ lookingId: string }> = ({ lookingId }) => {
    const Note = BookNotes.getNote(lookingId);
    const [writingMode, setMode] = useState(false);
    const [value, setValue] = useState(Note?.note?.text ?? "");
    return (
        <div>
            {writingMode ? (
                <Input.TextArea
                    value={value}
                    onChange={(str) => {
                        setValue(str);
                    }}></Input.TextArea>
            ) : (
                <div className="notes">{Note?.note?.text || "空空如也"}</div>
            )}
            <header className="box-row control-bar">
                {writingMode ? (
                    <IconCheck
                        fontSize={20}
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
                            Message.success("保存笔记成功");
                        }}></IconCheck>
                ) : (
                    <IconPen
                        fontSize={20}
                        onClick={() => {
                            setMode(true);
                            setValue(Note?.note?.text || "");
                            Message.info("注意点击保存按钮");
                        }}></IconPen>
                )}
            </header>
        </div>
    );
};
export const SimpleNote: FC<DataType> = () => {
    return (
        <Button
            onClick={() => {
                ContextMenuController.emit("update", (data) => {
                    data.title = "你的笔记";
                    return data;
                });
                ContextMenuController.emit("register", {
                    slot: "Header",
                    component: NoteWriter,
                });
            }}>
            <IconEdit fontSize={20}></IconEdit>
        </Button>
    );
};
