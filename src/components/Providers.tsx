"use client"; // for React-Query`
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient(); // Create a new instance of QueryClient
//QueryClientProvider is a component that provides the client to the rest of the application

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Providers;
