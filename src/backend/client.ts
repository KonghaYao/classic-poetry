import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './main';
const origin = globalThis.document ? '' : import.meta.env.PUBLIC_TRPC_URL
export const client = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: origin + '/trpc',
        }),
    ],
});