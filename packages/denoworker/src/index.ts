import { pathToRegexp } from "https://esm.sh/path-to-regexp@6.2.1";
import compose from "https://esm.sh/koa-compose@4.1.0";
export * from "./proxy.ts";
export interface Handle {
    (req: Request): Response | Promise<Response>;
}
export interface HandleObj {
    handle: Handle;
    plugins?: Middleware[];
}
interface Context {
    req: Request;
    res?: Response;
}
export type Middleware = compose.Middleware<Context>;

export const createServer = (config: Record<string, Handle | HandleObj>) => {
    const handlesArr: Handle[] = Object.entries(config).map(([key, h]) => {
        const regexp = pathToRegexp(key);
        const obj = h instanceof Function ? { handle: h } : h;
        const composedFunc = compose([
            ...(obj.plugins ?? []),
            (async (ctx, next) => {
                const res = await obj.handle(ctx.req);
                ctx.res = res;
                return next();
            }) as Middleware,
        ]);
        return (req) =>
            new Promise<Response>((res, rej) => {
                const matched = regexp.exec(new URL(req.url).pathname);

                if (matched) {
                    const ctx: Context = {
                        req,
                    };
                    composedFunc(ctx).then(() => {
                        res(ctx.res!);
                    });
                } else {
                    /** @ts-ignore */
                    res(null);
                }
            });
    });
    return async (...args: Parameters<Handle>): Promise<Response> => {
        for (const iterator of handlesArr) {
            const res = await iterator(...args);

            if (res instanceof Response) {
                return res;
            }
        }
        return new Response(null, { status: 404 });
    };
};
