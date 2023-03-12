import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { createServer } from "../src/index.ts";

const server = createServer({
    "/": () => {
        return new Response("null");
    },
    "/get": {
        handle() {
            console.log("进入2");
            return new Response("get");
        },
        plugins: [
            async (ctx, next) => {
                console.log("进入1");
                await next();
                ctx.res = new Response(ctx.res!.body, {
                    headers: { "access-allow": "*" },
                });
            },
        ],
    },
});
const baseURL = (path: string) => {
    return new Request("https://example.com" + path);
};
Deno.test(async function normal() {
    const data = await server(baseURL("/")).then((res) => res.text());
    assertEquals(data, "null");
});
Deno.test(async function middlewareTest() {
    const data = await server(baseURL("/get")).then((res) => res.headers);
    assertEquals(data.get("access-allow"), "*");
});
