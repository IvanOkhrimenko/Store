import * as types from '../actions/action-types';

const cartReducer = function reducer(state = {}, action) {
    // Our goal here is to perform actions on cart items using "Immutable update patterns"
    // Mutating the State directly can lead to performance issues as it could unnecessarily 
    // re-render the component.
    switch (action.type) {
        case types.ADD_TO_CART:
            console.log(state);
            // This adds new item to the cart array, in this the State without mutating it.
            // return {
            //     ...state, [action.payload.item]: action.payload
            // }
            if (state[action.payload.item]) {
                return {
                    ...state,
                    [action.payload.item]: {
                        ...state[action.payload.item],
                        quantity: state[action.payload.item].quantity + 1,
                    },
                }
            } else {
                return {
                    ...state, [action.payload.item]: action.payload
                };
            }


        case types.UPDATE_CART:
            // This finds the item that is already available in the cart array and updates 
            // the item's quantity without mutating directly the State
            return state.map((item, index) => {
                if (index !== action.index) {
                    return item;
                }

                return [
                    ...state,
                    ...action.payload
                ]
            });
        case types.REMOVE_ITEM: {

            // Removes the item from cart array without directly mutating the state.
            // The Array.prototype.filter() method prevents us from mutating the array

            const itemIndex = state.findIndex(i => i.item === action.payload);
            return state.filter((item, index) => index != itemIndex);
        }

        default:
            return state;
    }


}
export default cartReducer;