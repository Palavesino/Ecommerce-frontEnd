
import React, { useContext, createContext, ReactNode, useReducer } from 'react';
import { cartReducer, initialState, CART_ACTION_TYPES } from '../reducers/cartReducer';
import { OrderDetail } from '../interface/OrderDetails';
import { Product } from '../interface/Product';


type CartContextProps = {
    cart: OrderDetail[];
    setCart: (cart: OrderDetail[]) => void;
    // ingredientQuantities: { [ingredientId: number]: number };
    addToCart: (item: Product) => void;
    removeFromCart: (item: Product) => void;
    //updateQuantity: (itemId: number, quantity: number) => void;
    decreaseCartQuantity: (item: Product) => void;
    clearCart: () => void;
};

// Crear el contexto del carrito
export const CartContext = createContext<CartContextProps | undefined>(undefined);

// Hook personalizado para usar el contexto del carrito
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const addToCart = (product: Product ) => dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, payload: product });
    const removeFromCart = (product: Product ) => dispatch({ type: CART_ACTION_TYPES.REMOVE_FROM_CART, payload: product })
    const clearCart = () => dispatch({ type: CART_ACTION_TYPES.CLEAR_CART });
    const setCart = (cart: OrderDetail[]) => dispatch({ type: CART_ACTION_TYPES.SET_CART, newState: cart })
    const decreaseCartQuantity = (product: Product) => dispatch({ type: CART_ACTION_TYPES.DECREASE_CART_QUANTITY, payload: product });
    return { state, addToCart, removeFromCart, clearCart, decreaseCartQuantity, setCart };
}
// Proveedor del contexto del carrito
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { state, addToCart, removeFromCart, clearCart, decreaseCartQuantity, setCart } = useCartReducer();

    return (
        <CartContext.Provider value={{ cart: state, setCart, addToCart, removeFromCart, clearCart, decreaseCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
