import * as types from '../actions/action-types';
const initialState = []

const cartReducer = function reducer(state = initialState, action) {
    // Our goal here is to perform actions on cart items using "Immutable update patterns"
    // Mutating the State directly can lead to performance issues as it could unnecessarily 
    // re-render the component.
    switch (action.type) {
        case types.ADD_TO_CART:

            // This adds new item to the cart array, in this the State without mutating it.
            if (state[action.payload.id]) {
                return {
                    ...state,
                    [action.payload.id]: {
                        ...state[action.payload.id],
                        quantity: state[action.payload.id].quantity + 1
                    }
                }
            }
            else {
                return {
                    ...state,
                    [action.payload.id]: action.payload
                }
            }

        case types.UPDATE_CART:
            // This finds the item that is already available in the cart array and updates 
            // the item's quantity without mutating directly the State

            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    quantity: action.payload.value
                }

            }

        case types.REMOVE_ITEM:
            // Removes the item from cart array without directly mutating the state.
            // The Array.prototype.filter() method prevents us from mutating the array
            // return Object.keys(state)
            //     .filter(key => key !== action.payload.id)
            //     .reduce((result, current) => {
            //         result[current] = state[current];
            //         return result;
            //     }, {});
            const { [action.payload.id]: deletedItem, ...rest } = state;
            return rest;

        default:
            return state;
    }
}
export default cartReducer;