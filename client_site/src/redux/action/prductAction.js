import * as actions from './actionType'
import axios from "axios";

// Action creator for getting products
export const getProduct = () => {
    return (dispatch) => {
        axios
            .get('https://dummyjson.com/products')
            .then((response) => {
                const products = response.data.products;
                dispatch({type: actions.GET_PRODUCT, payload: products});
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    };
};

// Action creator for adding a product to the cart
export const addToCart = (product, quantity = 1) => ({
    type: actions.ADD_TO_CART,
    payload: {product, quantity},
});

// Action creator for updating the cart (e.g., changing quantity)
export const updateCart = (updatedProduct) => ({
    type: actions.UPDATE_CART,
    payload: updatedProduct,
});

// Action creator for removing an item from the cart
export const removeCart = (product) => ({
    type: actions.REMOVE_CART,
    payload: product,
});

export const incrementCartItem = (cartItem) => ({
    type: actions.INCREMENT_CART_ITEM,
    payload: cartItem
})

export const decrementCartItem = (cartItem) => ({
    type: actions.DECREMENT_CART_ITEM,
    payload: cartItem
})