import { Drawer, Menu } from "@arco-design/web-react";
import { useStore } from "@nanostores/solid";
import { Books } from "../store/book";
import { useCatalogueListLoad } from "../../CatalogueList";
import { modelControl } from "../store/modelControl";
import { atom } from "@cn-ui/reactive";
export const SideIndex = ({ visible }: { visible: boolean }) => {
    const matched = useStore(Books);
    const ref = atom<HTMLDivElement | null>(null);
    const { dataSlices } = useCatalogueListLoad(matched().belongToName);
    return (
        <Drawer
            width={332}
            title={<span class="cursor-auto">{matched.belongToName}</span>}
            visible={visible}
            onCancel={() => {
                modelControl.setKey("showing", "void");
            }}
            footer={null}>
            <nav class="overflow-scroll h-[80vh] rounded-md max-w-xs" ref={ref}>
                <ul>
                    {/* <Menu.Item key="side-index">
        <NavLink to={'/'}>索引</NavLink>
    </Menu.Item> */}
                    {data?.list.map((i, index) => {
                        return (
                            <a href={`/poetry/${i.id}`} key={"side-" + i.id}>
                                <li
                                    class=" cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden"
                                    key={i.id}
                                    title={i.title}>
                                    <span class="w-8 pr-2 text-center">
                                        {index}
                                    </span>{" "}
                                    {i.title}
                                </li>
                            </a>
                        );
                    })}
                    <InfiniteInfo {...{ loadingMore, noMore }}></InfiniteInfo>
                </ul>
            </nav>
        </Drawer>
    );
};
