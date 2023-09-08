import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { getClient } from './getClient';

const t = initTRPC.create();

const procedure = t.procedure;
const router = t.router;
const searchIndex = getClient()

/** 简单的异步数据缓存函数 */
const cacheStore = <T extends (data: any) => Promise<any>>(fn: T, condition: (input: Parameters<T>[0]) => boolean = () => true) => {
    const store = new Map<string, unknown>()
    return (async (ctx) => {
        const key = JSON.stringify(ctx.input)
        if (store.has(key) && condition(ctx)) {
            // console.log('命中缓存', key)
            return store.get(key)
        }
        return fn(ctx).then(res => {
            store.set(key, res)
            return res
        })
    }) as T
}
export const appRouter = router({
    getSinglePoetry: procedure.input(z.object({
        id: z.string()
    })).query(cacheStore(({ input }) => {
        return searchIndex.getDocument<{ title: string, content: string }>(input.id!)
    })),
    searchPoetryNameInSection: procedure.input(z.object({
        search: z.string(),
        belongToName: z.string(),
        page: z.number()
    })).query(cacheStore(({ input }) => {
        return searchIndex.search<{
            id: number,
            title: string,
            "author": string,
            "belongToName": string,
        }>(input.search, {
            filter: `belongToName = '${input.belongToName}'`,
            limit: 40,
            offset: input.page * 40,
            attributesToRetrieve: ["author", "belongToName", "id", "title"],
        })
    }, (data) => data.input.search.length <= 5)),
});

export type AppRouter = typeof appRouter;
