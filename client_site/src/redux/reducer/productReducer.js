import * as actions from '../action/actionType'


const initialState = {
    products: [], // Initialize products as an empty array
    cart: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_PRODUCT:
            return {
                ...state,
                products: action.payload,
            };
        case actions.ADD_TO_CART:
            const {product, quantity} = action.payload;

            // Check if the product is already in the cart
            const existingCartItemIndex = state.cart.findIndex(
                (cartItem) => cartItem.product.id === product.id
            );

            if (existingCartItemIndex !== -1) {
                // If the product already exists in the cart, update its quantity
                const updatedCart = [...state.cart];
                updatedCart[existingCartItemIndex] = {
                    ...updatedCart[existingCartItemIndex],
                    quantity: updatedCart[existingCartItemIndex].quantity + quantity,
                };

                return {
                    ...state,
                    cart: updatedCart,
                };
            } else {
                // If the product is not in the cart, add it
                return {
                    ...state,
                    cart: [...state.cart, {product, quantity}],
                };
            }
        case actions.INCREMENT_CART_ITEM:
            return {
                ...state,
                cart: state.cart.map((cartItem) =>
                    cartItem.product.id === action.payload.id
                        ? {...cartItem, quantity: cartItem.quantity + 1}
                        : cartItem
                ),
            };

        case actions.DECREMENT_CART_ITEM:
            return {
                ...state,
                cart: state.cart.map((cartItem) =>
                    cartItem.product.id === action.payload.id
                        ? {...cartItem, quantity: cartItem.quantity - 1}
                        : cartItem
                ),
            };

        case actions.REMOVE_CART:
            return {
                ...state,
                cart: state.cart.filter((cartItem) => cartItem.product.id !== action.payload.id),
            }
        default:
            return state;
    }
};
export default productReducer;
