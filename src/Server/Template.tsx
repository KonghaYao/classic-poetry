import { createContext, FC, memo, ReactNode, useState } from "react";

import mitt from "mitt";
import { useMount, useUnmount } from "ahooks";

type SlotType = FC;
type SlotsType<Key extends string> = Record<Key, SlotType>;
type SlotListType<Key extends string> = Record<Key, SlotType[]>;

export function createServer<
    DataType extends {},
    SlotNames extends string,
    SlotListNames extends string
>(init?: Partial<DataType>) {
    let lastUpdate: Partial<DataType> = init!;
    const UISlotsList = {} as SlotListType<SlotListNames>;
    const UISlots = {} as SlotsType<SlotNames>;
    const UIChannel = mitt<{
        register: (
            | { slot: SlotNames; list?: false }
            | { slot: SlotListNames; list: true }
        ) & { component: FC<DataType> };
        /** 修改 store 的状态 */
        update:
            | Partial<DataType>
            | ((lastData: Partial<DataType>) => Partial<DataType>);
    }>();

    const DataContext = createContext<Partial<DataType>>(init!);
    UIChannel.on("register", ({ slot, component: Comp, list }) => {
        // 外包一层，传递参数
        const wrapped = () => (
            <DataContext.Consumer>
                {(data) => <Comp {...(data as any)}></Comp>}
            </DataContext.Consumer>
        );
        if (list) {
            // 更新状态
            UISlotsList[slot] = [...(UISlotsList[slot] || []), wrapped];
        } else {
            UISlots[slot] = wrapped;
        }
    });
    UIChannel.on("update", (data) => {
        if (typeof data === "function") {
            lastUpdate = data(lastUpdate);
        } else {
            lastUpdate = data;
        }
    });

    /** 用于外包一个组件，使其内部可以写一个 Template 来渲染 Slot */
    function Template<T>(
        InnerUI: FC<
            T & {
                Slots: SlotsType<SlotNames>;
                SlotList: SlotListType<SlotListNames>;
            }
        >
    ): FC<T> {
        return (props: T) => {
            const [Slots, setSlots] = useState<SlotsType<SlotNames>>(UISlots);
            const [SlotList, setSlotList] =
                useState<SlotListType<SlotListNames>>(UISlotsList);
            const updateSlots = ({ list }: { list?: boolean }) => {
                list
                    ? setSlotList({ ...UISlotsList })
                    : setSlots({ ...UISlots });
            };
            const updateData = (data: any) => setData(data);
            const [data, setData] = useState<Partial<DataType>>(lastUpdate);
            useMount(() => {
                UIChannel.on("register", updateSlots);
                UIChannel.on("update", updateData);
            });
            // ! 记得 off
            useUnmount(() => {
                UIChannel.off("register", updateSlots);
                UIChannel.off("update", updateData);
            });

            return (
                <DataContext.Provider value={data!}>
                    <InnerUI
                        {...props}
                        Slots={Slots}
                        SlotList={SlotList}></InnerUI>
                </DataContext.Provider>
            );
        };
    }
    return {
        Template,
        controller: UIChannel,
        DataContext,
    };
}

export const SlotMap = memo(
    (props: {
        list: SlotType[];
        children?: (i: SlotType, index: number) => ReactNode;
    }) => {
        const mapper =
            props.children ||
            ((I: SlotType, index: number) => <I key={"name-" + index} />);

        return <>{props.list?.map(mapper)}</>;
    }
);
