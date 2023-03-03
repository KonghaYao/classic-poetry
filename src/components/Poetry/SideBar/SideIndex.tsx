import { Drawer, Menu } from "@arco-design/web-react";
import { useStore } from "@nanostores/react";
import { Books } from "../store/book";
import { InfiniteInfo, useCatalogueListLoad } from "../../CatalogueList";
import { useRef } from "react";
import { modelControl } from "../store/modelControl";
export const SideIndex = ({ visible }: { visible: boolean }) => {
    const matched = useStore(Books);
    const ref = useRef<HTMLDivElement>(null);
    const { data, loadingMore, noMore } = useCatalogueListLoad({
        ref,
        name: matched.belongToName,
    });
    return (
        <Drawer
            width={332}
            title={<span className="cursor-auto">{matched.belongToName}</span>}
            visible={visible}
            onCancel={() => {
                modelControl.setKey("showing", "void");
            }}
            footer={null}>
            <nav
                className="overflow-scroll h-[80vh] rounded-md max-w-xs"
                ref={ref}>
                <ul>
                    {/* <Menu.Item key="side-index">
        <NavLink to={'/'}>索引</NavLink>
    </Menu.Item> */}
                    {data?.list.map((i, index) => {
                        return (
                            <a href={`/poetry/${i.id}`} key={"side-" + i.id}>
                                <li
                                    className=" cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden"
                                    key={i.id}
                                    title={i.title}>
                                    <span className="w-8 pr-2 text-center">
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
