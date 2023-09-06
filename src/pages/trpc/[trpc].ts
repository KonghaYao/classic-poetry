import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { APIRoute } from 'astro';
import { appRouter } from '../../backend/main';

export const all: APIRoute = (opts) => {
    return fetchRequestHandler({
        endpoint: '/trpc',
        req: opts.request,
        router: appRouter,
        createContext: () => ({}),
    });
};