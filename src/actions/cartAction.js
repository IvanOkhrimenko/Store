
import * as types from './action-types';
export function addToCart(payload) {

    return {
        type: types.ADD_TO_CART,
        payload: payload
    }
}

export function updateCart(name, value) {
    return {
        type: types.UPDATE_CART,
        payload: { name, value }
    }
}
export function syncQuantity(payload) {
    return {
        type: types.SYNC_QUANTITY,
        payload: payload
    }
}
export function removeItem(payload) {
    return {
        type: types.REMOVE_ITEM,
        payload: payload
    }
}

export function updateQuantity(payload) {
    return {
        type: types.UPDATE_QUANTITY,
        payload: payload
    }
}