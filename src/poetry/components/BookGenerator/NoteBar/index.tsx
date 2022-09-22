import { Button, Collapse, Drawer } from "@arco-design/web-react";
import { useMount, useUnmount } from "ahooks";
import mitt from "mitt";
import { FC, useState } from "react";
import { NoteWriter } from "../PoetryContent/ContextPlugins/SimpleNote";
import { useHighlight } from "../PoetryContent/ContextPlugins/useHighLight";
import { BookNotes } from "./BookNote";

export const NoteBarServer = mitt<{
    toggle?: boolean;
}>();
export const NoteBar: FC = () => {
    const [visible, setVis] = useState(false);
    const changeVis = (bool?: boolean) => {
        setVis(bool ?? !visible);
    };
    useMount(() => {
        NoteBarServer.on("toggle", changeVis);
    });
    useUnmount(() => {
        NoteBarServer.off("toggle", changeVis);
    });
    const { getHighlighter } = useHighlight();
    return (
        <Drawer
            width={332}
            title={<span>你的笔记</span>}
            visible={visible}
            placement="left"
            unmountOnExit={true}
            footer={null}
            onCancel={() => setVis(false)}>
            <Collapse bordered={false} lazyload style={{ maxWidth: 1180 }}>
                {BookNotes.watchingBook?.data.map((i) => {
                    return (
                        <Collapse.Item
                            key={i.highlight.source.id}
                            header={i.highlight.source.text}
                            name={i.highlight.source.id}>
                            <Button
                                onClick={() => {
                                    const highlighter = getHighlighter();
                                    const dom = highlighter.getDoms(
                                        i.highlight.source.id
                                    )[0];
                                    setVis(false);
                                    dom.scrollIntoView();
                                }}>
                                点击跳转
                            </Button>
                            <NoteWriter
                                lookingId={i.highlight.source.id}></NoteWriter>
                        </Collapse.Item>
                    );
                })}
            </Collapse>
        </Drawer>
    );
};
