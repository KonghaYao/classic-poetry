import localforage from "localforage";
import { Setting } from "../../Setting/Setting";

let count = -1;
localforage.setDriver(localforage.LOCALSTORAGE);

export const BookStore = {
    store: undefined as undefined | typeof localforage,
    ready: Promise.resolve(false).then(async () => {
        BookStore.store = localforage.createInstance({
            name: "book-store",
        });
        return true;
    }),

    pickRoot(root: string | string[]) {
        if (typeof root === "string") return root;
        count++;
        console.log(count);
        return root[count % root.length];
    },
    /** 不要直接使用，使用 getBook 直接获取 */
    async fetchData(path: string, fullPath = false) {
        return fetch(
            fullPath ? path : this.pickRoot(Setting.poetry.root) + "/" + path,
            { cache: "force-cache" }
        ).then((res) => res.json());
    },
    async refresh(path: string, fullPath = false) {
        const data = await this.fetchData(path, fullPath);
        this.store!.setItem(path, data); // 不进行等待
        return data;
    },

    /** path 为仓库下的地址 */
    async getBook<T>(path: string, fullPath = false): Promise<T> {
        return this.ready
            .then(() => {
                return this.store!.getItem<Object>(path);
            })
            .then(async (res) => {
                if (res) {
                    return res;
                } else {
                    return this.refresh(path, fullPath);
                }
            });
    },
};
