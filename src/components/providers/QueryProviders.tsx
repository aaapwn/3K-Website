"use client";

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
    children: Readonly<React.ReactNode>;
};

const QueryProviders = ({ children } : Props) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProviders