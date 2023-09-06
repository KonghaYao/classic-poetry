import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { getClient } from './getClient';

const t = initTRPC.create();

const procedure = t.procedure;
const router = t.router;
const searchIndex = getClient()

/** 简单的异步数据缓存函数 */
const cacheStore = <T extends (data: any) => Promise<any>>(fn: T) => {
    const store = new Map<string, unknown>()
    return (async (ctx) => {
        const key = JSON.stringify(ctx.input)
        if (store.has(key)) {
            console.log('命中缓存', key)
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
        id: z.string().nullish()
    })).query(cacheStore(({ input }) => {
        return searchIndex.getDocument(input.id!) as Promise<{ title: string, content: string }>
    }))
});

export type AppRouter = typeof appRouter;
