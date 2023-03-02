import { Menu } from "@arco-design/web-react";
import { useStore } from "@nanostores/react";
import { Books } from "../store/book";
import { useBookIndexMapper } from "../../CatalogueList";
export const SideIndex = () => {
    const matched = useStore(Books);
    const { data } = useBookIndexMapper({ name: matched.belongToName });
    return (
        <nav className="overflow-scroll h-[80vh] rounded-md">
            <Menu
                className="overflow-scroll w-40 m-0 flex-1 "
                selectedKeys={[matched.id]}
                ellipsis>
                {/* <Menu.Item key="side-index">
        <NavLink to={'/'}>索引</NavLink>
    </Menu.Item> */}
                {data?.list.map((i) => {
                    return (
                        <Menu.Item
                            className="long-list-item"
                            key={i.id}
                            defaultValue={i.title}
                            onClick={() => {
                                location.href = `/poetry/${i.id}`;
                            }}>
                            {i.title}
                        </Menu.Item>
                    );
                })}
            </Menu>
        </nav>
    );
};
