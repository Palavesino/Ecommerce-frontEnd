import { OrderDetail } from "../interface/OrderDetails";
import { Product } from "../interface/Product";

export const initialState: OrderDetail[] = JSON.parse(window.localStorage.getItem('cart') || '[]');

interface CountActionProps {
    type: string;
    payload?: Product;
    newState?: OrderDetail[];
}

// Tipos de acciones del carrito
export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
    DECREASE_CART_QUANTITY: 'DECREASE_CART_QUANTITY',
    SET_CART: 'SET_CART',
} as const;
// update localStorage with state for cart
export const updateLocalStorage = (state: OrderDetail[]) => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state: OrderDetail[], action: CountActionProps): OrderDetail[] => {
    const { type: actionType, payload: actionPayload, newState } = action;
    switch (actionType) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            if (actionPayload) {

                const productInCartIndex = state.findIndex(i => i.item.id === actionPayload.id)
                const newState = productInCartIndex >= 0 ? [
                    ...state.slice(0, productInCartIndex),
                    {
                        ...state[productInCartIndex],
                        quantity: state[productInCartIndex].quantity + 1,
                        subtotal: (state[productInCartIndex].quantity + 1) * actionPayload.price.sellPrice
                    },
                    ...state.slice(productInCartIndex + 1)
                ] : [
                    ...state,
                    {
                        quantity: 1,
                        subtotal: actionPayload.price.sellPrice,
                        ...{ item: actionPayload as Product}
                    }
                ];
                updateLocalStorage(newState);
                return newState;
            }
            return state;
        }
        case CART_ACTION_TYPES.DECREASE_CART_QUANTITY: {
            if (actionPayload) {
                const productInCartIndex = state.findIndex(i => i.item.id === actionPayload.id)
                if (productInCartIndex >= 0) {
                    if (state[productInCartIndex].quantity > 1) {
                        const newState = [
                            ...state.slice(0, productInCartIndex),
                            {
                                ...state[productInCartIndex], quantity: state[productInCartIndex].quantity - 1,
                                subtotal: (state[productInCartIndex].quantity - 1) * actionPayload.price.sellPrice
                            },
                            ...state.slice(productInCartIndex + 1)
                        ]
                        updateLocalStorage(newState);
                        return newState;
                    }
                }
            }
            return state;
        }
        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            if (actionPayload) {
                const newState = state.filter(i => i.item.id !== actionPayload.id)
                updateLocalStorage(newState)
                return newState;
            }
            return state;
        }
        case CART_ACTION_TYPES.CLEAR_CART: {
            updateLocalStorage([]);
            return [];
        }
        case CART_ACTION_TYPES.SET_CART: {
            if (newState) {
                updateLocalStorage(newState);
                return newState;
            }
            updateLocalStorage([]);
            return state;
        }
        default:
            return state;
    }
};