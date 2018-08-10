import * as types from '../actions/action-types';
const initialState = []

const cartReducer = function reducer(state = initialState, action) {
    // Our goal here is to perform actions on cart items using "Immutable update patterns"
    // Mutating the State directly can lead to performance issues as it could unnecessarily 
    // re-render the component.
    switch (action.type) {
        case types.ADD_TO_CART:

            // This adds new item to the cart array, in this the State without mutating it.
            // return {
            //     ...state, [action.payload.item]: action.payload
            // }
            // if (state.items[action.payload.item]) {
            let kek = state.find(x => x.item === action.payload.item) !== undefined;

            console.log(action.payload.quantity)
            if (kek == true) {
                state.map(thisItem => thisItem.item === action.payload.item ? thisItem.quantity = thisItem.quantity + 1 : null)
                return [
                    ...state
                ]
            } else {
                return [
                    ...state,
                    action.payload
                ];
            }
        // [action.payload.item]: {
        //     ...state.items[action.payload.item],
        //     quantity: state.items[action.payload.item].quantity + 1,
        // },

        //     }
        // } else {
        //     return {
        //         ...state, items: { [action.payload.item]: action.payload }
        //     };
        // }


        case types.UPDATE_CART:
            console.log('value', action.payload);
            // This finds the item that is already available in the cart array and updates 
            // the item's quantity without mutating directly the State
            const itemIndex = state.findIndex(i => i.item === action.payload.name);
            state[itemIndex].quantity = state[itemIndex].quantity = action.payload.value
            return [
                ...state
            ]
        
        case types.REMOVE_ITEM: {
            // Removes the item from cart array without directly mutating the state.
            // The Array.prototype.filter() method prevents us from mutating the array
            const itemIndex = state.findIndex(i => i.item === action.payload);

            // if (state[itemIndex].quantity > 1) {
            //     state[itemIndex].quantity = state[itemIndex].quantity - 1
            //     return [
            //         ...state
            //     ]
            // } else {
                return state.filter((item, index) => index != itemIndex);
            // }
        }
        default:
            return state;
    }
}
export default cartReducer;