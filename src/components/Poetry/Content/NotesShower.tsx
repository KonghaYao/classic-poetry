import { Books } from "../store/book";
import { useStore } from "@nanostores/react";
/** 显示脚注的组件 */
export const NotesShower = () => {
    const data = useStore(Books);
    return (
        <>
            <nav class="whitespace-pre-wrap">{data.notes}</nav>
        </>
    );
};
