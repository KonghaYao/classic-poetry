import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './main';
export const client = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: import.meta.env.PUBLIC_TRPC_URL + '/trpc',
        }),
    ],
});