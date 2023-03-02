import { Tabs } from "@arco-design/web-react";
import TabPane from "@arco-design/web-react/es/Tabs/tab-pane";
import { SideIndex } from "./SideIndex";
import { useStore } from "@nanostores/react";
import { modelControl } from "../store/modelControl";
export const ModelControl = () => {
    const { showing } = useStore(modelControl);
    return (
        <Tabs activeTab={showing} renderTabHeader={() => <></>}>
            <TabPane key="index" title="Tab 1">
                <SideIndex></SideIndex>
            </TabPane>
            <TabPane key="void" title="Tab 1"></TabPane>
        </Tabs>
    );
};
