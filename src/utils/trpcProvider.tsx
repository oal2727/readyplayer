"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { trpc } from '@/lib/trpc/client';
import { httpBatchLink, loggerLink } from '@trpc/client'
import SuperJSON from 'superjson'

function getBaseUrl() {
	if (typeof window !== 'undefined') {
		// In the browser, we return a relative URL
		return ''
	}
	// When rendering on the server, we return an absolute URL

	// reference for vercel.com
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}

	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`
}


export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
	transformer: SuperJSON,
      links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}