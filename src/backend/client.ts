import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './main';
const origin = globalThis.document ? 'https://chinese-poetry.netlify.app' : "http://localhost:4321"
export const client = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: origin + '/trpc',
        }),
    ],
});