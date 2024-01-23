'use client'
import React from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

type Props = {
    children: React.ReactNode
}

export default function Provider({children}: Props) {
  return (
    <QueryClientProvider client={new QueryClient()}>
    {children}
    </QueryClientProvider>
  )
}