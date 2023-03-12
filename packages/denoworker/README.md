# deno-server

It's a very easy plugin to create a

```ts
import { ConnInfo, serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createServer } from "https://esm.sh/deno-server/src/index.ts";
const S = createServer({
    "/": () => {
        return new Response("null");
    },
    "/get": {
        handle() {
            console.log("进入 2");
            return new Response("get");
        },
        plugins: [
            async (ctx, next) => {
                console.log("进入 1");
                await next();
                ctx.res = new Response(ctx.res!.body, {
                    headers: { "access-allow": "*" },
                });
            },
        ],
    },
});

serve(S);
```
