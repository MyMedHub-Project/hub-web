"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode, FC } from "react";
import { QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

const ReactQueryProvider: FC<{ children: ReactNode }> = ({ children }) => (
	<QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default ReactQueryProvider;
