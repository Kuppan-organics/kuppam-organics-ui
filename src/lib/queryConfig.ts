import { QueryClient, DefaultOptions } from "@tanstack/react-query";

/**
 * Query configuration for different data types
 * These settings optimize caching and reduce unnecessary API calls
 */

// Default options for all queries
const defaultOptions: DefaultOptions = {
  queries: {
    // Data is considered fresh for 5 minutes (won't refetch automatically)
    staleTime: 5 * 60 * 1000, // 5 minutes
    
    // Unused data stays in cache for 10 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    
    // Don't refetch on window focus (reduces unnecessary requests)
    refetchOnWindowFocus: false,
    
    // Refetch on mount if data is stale
    refetchOnMount: true,
    
    // Refetch on reconnect if data is stale
    refetchOnReconnect: true,
    
    // Retry failed requests once
    retry: 1,
    
    // Retry delay increases exponentially
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  mutations: {
    // Retry mutations once on failure
    retry: 1,
  },
};

/**
 * Query-specific configurations
 * Override default options for specific query types
 */
export const queryConfig = {
  // Products - can be cached longer as they don't change frequently
  products: {
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  },
  
  // Product details - cache for a while
  productDetails: {
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  },
  
  // User profile - should be relatively fresh
  userProfile: {
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true, // Refetch when user returns to app
  },
  
  // Cart - should be fresh but can cache briefly
  cart: {
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  },
  
  // Orders - can cache for a bit
  orders: {
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  },
  
  // Admin data - should be fresh
  admin: {
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  },
  
  // Categories - rarely change, cache for a long time
  categories: {
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
  },
};

/**
 * Create and configure QueryClient with optimized settings
 */
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions,
  });
};
