import { Input } from "@arco-design/web-react";
import { IconBook, IconCheck, IconPen } from "@arco-design/web-react/icon";
import { FC, useState } from "react";
import { ContextMenuController, DataType } from "../ContextMenu";
import { BookNotes } from "./BookNote";

export const SimpleNote: FC<DataType> = ({ lookingId }) => {
    const Note = BookNotes.getNote(lookingId);

    return (
        <IconBook
            fontSize={20}
            onClick={() => {
                ContextMenuController.emit("register", {
                    slot: "Header",
                    component: () => {
                        const [writingMode, setMode] = useState(false);
                        const [value, setValue] = useState(
                            Note?.note?.text ?? ""
                        );
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
                                                setMode(false);
                                            }}></IconCheck>
                                    ) : (
                                        <IconPen
                                            onClick={() =>
                                                setMode(true)
                                            }></IconPen>
                                    )}
                                </header>
                                {writingMode ? (
                                    <Input.TextArea
                                        value={value}
                                        onChange={(str) => {
                                            setValue(str);
                                        }}></Input.TextArea>
                                ) : (
                                    <div>{Note?.note?.text}</div>
                                )}
                            </div>
                        );
                    },
                });
            }}></IconBook>
    );
};
