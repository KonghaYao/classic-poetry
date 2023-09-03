import { SystemPlugin } from "../system";
import { ImSearch } from "solid-icons/im";
export class SearchPlugin extends SystemPlugin {
    config = {
        position: "header" as const,
    };
    render() {
        return (
            <a class="cursor-pointer" href="/search">
                <ImSearch />
            </a>
        );
    }
}
