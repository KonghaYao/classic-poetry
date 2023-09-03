import { SystemPlugin } from "../system";
import { RiUserFacesAccountCircleLine } from "solid-icons/ri";
export class ContributePlugin extends SystemPlugin {
    config = {
        position: "header" as const,
    };
    render() {
        return (
            <a href="/contribute" class="cursor-pointer">
                <RiUserFacesAccountCircleLine />
            </a>
        );
    }
}
