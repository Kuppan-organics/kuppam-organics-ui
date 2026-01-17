import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useGetApiCart,
  usePostApiCart,
  usePutApiCartItemId,
  useDeleteApiCartItemId,
  useDeleteApiCart,
  getGetApiCartQueryKey,
} from '@/api/generated/cart/cart';
import { CartItem, Product } from '@/lib/types';
import type { CartItem as ApiCartItem } from '@/api/generated/models';
import { queryConfig } from '@/lib/queryConfig';
import { toast } from 'sonner';

const LOCAL_STORAGE_CART_KEY = 'kuppam_cart';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  syncLocalCartToAPI: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to map API cart item to local CartItem
const mapApiCartItemToCartItem = (apiItem: ApiCartItem, index: number): CartItem | null => {
  if (!apiItem.product) return null;
  return {
    id: apiItem.product.id || `item-${index}`,
    name: apiItem.product.name,
    description: apiItem.product.description,
    price: apiItem.product.discountedPrice || apiItem.product.price,
    image: apiItem.product.images?.[0] || '/placeholder.svg',
    category: apiItem.product.category?.toLowerCase() || "uncategorized",
    weight: '1 kg',
    inStock: (apiItem.product.stock || 0) > 0,
    quantity: apiItem.quantity || 1,
  };
};

// Helper to get localStorage cart
const getLocalStorageCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper to save to localStorage
const saveLocalStorageCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>(getLocalStorageCart());

  // Update token state when it changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    // Also check on mount/update
    const currentToken = localStorage.getItem('token');
    if (currentToken !== token) {
      setToken(currentToken);
    }
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [token]);

  // Fetch cart from API (only if user is logged in) with optimized caching
  const { data: cartData, isLoading: apiLoading } = useGetApiCart({
    query: { 
      enabled: !!token,
      ...queryConfig.cart,
    },
  });

  const addToCartMutation = usePostApiCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetApiCartQueryKey() });
      },
    },
  });

  const updateCartItemMutation = usePutApiCartItemId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetApiCartQueryKey() });
      },
    },
  });

  const removeCartItemMutation = useDeleteApiCartItemId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetApiCartQueryKey() });
        toast.success('Item removed from cart');
      },
      onError: (error) => {
        console.error('Failed to remove item from cart:', error);
        toast.error('Failed to remove item. Please try again.');
      },
    },
  });

  const clearCartMutation = useDeleteApiCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetApiCartQueryKey() });
      },
    },
  });

  // Sync localStorage cart to API when user logs in
  const syncLocalCartToAPI = useCallback(async () => {
    if (!token || localCartItems.length === 0) return;

    try {
      // First, fetch the current API cart to see what's already there
      const currentCart = await queryClient.fetchQuery({
        queryKey: getGetApiCartQueryKey(),
        queryFn: async () => {
          const response = await fetch('http://localhost:3000/api/cart', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          return response.json();
        },
      });

      // Add each item from localStorage to API cart
      for (const item of localCartItems) {
        const existingItem = currentCart?.cart?.items?.find(
          (apiItem: ApiCartItem) => apiItem.product?.id === item.id
        );

        if (existingItem && existingItem.product?.id) {
          // Update quantity if item exists
          await updateCartItemMutation.mutateAsync({
            itemId: existingItem.product.id,
            data: {
              quantity: (existingItem.quantity || 0) + item.quantity,
            },
          });
        } else {
          // Add new item
          await addToCartMutation.mutateAsync({
            data: {
              productId: item.id,
              quantity: item.quantity,
            },
          });
        }
      }

      // Clear localStorage cart after successful sync
      setLocalCartItems([]);
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
      
      // Refresh API cart
      queryClient.invalidateQueries({ queryKey: getGetApiCartQueryKey() });
    } catch (error) {
      console.error('Failed to sync cart to API:', error);
    }
  }, [token, localCartItems, addToCartMutation, updateCartItemMutation, queryClient]);

  // Determine which cart to use: API cart if logged in, localStorage if not
  const apiItems: CartItem[] = cartData?.cart?.items
    ? cartData.cart.items
        .map(mapApiCartItemToCartItem)
        .filter((item): item is CartItem => item !== null)
    : [];

  const items: CartItem[] = token ? apiItems : localCartItems;
  const isLoading = token ? apiLoading : false;

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      if (token) {
        // User is logged in - use API
        const existingItem = cartData?.cart?.items?.find(
          (item) => item.product?.id === product.id
        );

        if (existingItem && existingItem.product?.id) {
          // Update quantity - using product ID as itemId
          const currentQuantity = existingItem.quantity || 0;
          updateCartItemMutation.mutate({
            itemId: existingItem.product.id,
            data: {
              quantity: currentQuantity + quantity,
            },
          });
        } else {
          // Add new item
          addToCartMutation.mutate({
            data: {
              productId: product.id,
              quantity,
            },
          });
        }
      } else {
        // User is not logged in - use localStorage
        setLocalCartItems((prev) => {
          const existing = prev.find((item) => item.id === product.id);
          let newItems: CartItem[];
          
          if (existing) {
            newItems = prev.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...prev, { ...product, quantity }];
          }
          
          saveLocalStorageCart(newItems);
          return newItems;
        });
      }
    },
    [token, cartData, addToCartMutation, updateCartItemMutation]
  );

  const removeItem = useCallback(
    (productId: string) => {
      if (token) {
        // User is logged in - use API
        // The API uses product ID as the itemId for cart items
        removeCartItemMutation.mutate({ itemId: productId });
      } else {
        // User is not logged in - use localStorage
        setLocalCartItems((prev) => {
          const newItems = prev.filter((item) => item.id !== productId);
          saveLocalStorageCart(newItems);
          return newItems;
        });
        toast.success('Item removed from cart');
      }
    },
    [token, removeCartItemMutation]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      if (token) {
        // User is logged in - use API
        updateCartItemMutation.mutate({
          itemId: productId,
          data: { quantity },
        });
      } else {
        // User is not logged in - use localStorage
        setLocalCartItems((prev) => {
          const newItems = prev.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          saveLocalStorageCart(newItems);
          return newItems;
        });
      }
    },
    [token, updateCartItemMutation, removeItem]
  );

  const clearCart = useCallback(() => {
    if (token) {
      // User is logged in - use API
      clearCartMutation.mutate();
    } else {
      // User is not logged in - use localStorage
      setLocalCartItems([]);
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    }
  }, [token, clearCartMutation]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
        syncLocalCartToAPI,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
