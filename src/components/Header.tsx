import { PluginRender } from "../plugins/system/usePluginRender";
export const GlobalHeader = () => {
    return (
        <header class="z-10 flex w-full py-2 px-4">
            <a href="/">
                <div class="text-xl">中华诗词大典</div>
            </a>
            <div class="flex-1"></div>
            <nav class=" text-lg flex flex-row gap-4 justify-between items-center ">
                <PluginRender position="header"></PluginRender>
            </nav>
        </header>
    );
};
