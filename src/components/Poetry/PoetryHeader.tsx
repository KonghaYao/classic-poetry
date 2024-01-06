import { useStore } from "@nanostores/solid";
import { BookSetting, Books } from "./store/book";
export const PoetryHeader = () => {
    const store = useStore(BookSetting);

    const matched = useStore(Books)();
    const textCount = matched.content.split("\n").reduce((col, cur) => {
        const m: string = cur.replace(/[^\u4e00-\u9fff\uf900-\ufaff]/g, "");
        return col + m.length;
    }, 0);
    return (
        <header class={`poetry-header mx-2`}>
            <main>
                <span class="title">{matched.title}</span>
                <span class="subtitle">{matched.subTitle}</span>
            </main>
            <div class="flex-1"></div>
            <aside class="flex gap-2">
                <div>
                    全文
                    <span style={{ "font-size": "1.125em" }}>{textCount}</span>
                    字
                </div>

                <button
                    class="w-4 aspect-square cursor-pointer"
                    onClick={() => {
                        const dir = store().direction === "row" ? "col" : "row";
                        BookSetting.setKey("direction", dir);
                    }}>
                    🅰️
                </button>
                {/* {MoreList()} */}
            </aside>
        </header>
    );
};
// function MoreList() {
//     return (
//         <Popover
//             trigger="click"
//             content={
//                 <ul>
//                     <Button
//                         icon={<IconRefresh class="mr-2" />}
//                         onClick={() => {
//                             BookSetting.setKey(
//                                 "direction",
//                                 BookSetting.get().direction === "row"
//                                     ? "col"
//                                     : "row"
//                             );
//                         }}>
//                         横竖切换
//                     </Button>
//                 </ul>
//             }>
//             <IconList class="w-4 aspect-square cursor-pointer"></IconList>
//         </Popover>
//     );
// }
