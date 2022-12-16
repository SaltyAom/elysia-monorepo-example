'use client'

import type { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function Provider({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
