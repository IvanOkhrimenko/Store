import * as types from '../actions/action-types';

const initialState = {
    goods: [],
    operation_isLoading: false,
    operation_HasErrored: false,
    hasErrored: false,
    isLoading: false,
    addForm: false,
    changeForm: false,
    limit: 8,
    searchFilter: '',
    visibilityFilter: 'SHOW_ALL',
};

const goodsReducer = function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GOODS_FETCH_DATA_REJECT:
            return {
                ...state,
                hasErrored: action.hasErrored,
            };
        case types.GOODS_FETCH_DATA_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case types.GOODS_FETCH_DATA_SUCCESS:
            return {
                ...state,
                goods: action.goods.reverse().reduce(function (result, item, index, array) {
                    result[item._id] = item;
                    return result;
                }, {})
            };

        case types.GOODS_LOAD_MORE:
            return {
                ...state,
                limit: state.limit + action.limit,
            };

        case types.GOODS_RESET_LIMIT:
            return {
                ...state,
                limit: action.limit,
            };

        case types.FIND_GOODS:
            return {
                ...state,
                searchFilter: action.searchFilter,
            };

        case types.GOODS_SET_VISIBILITY_FILTER:
            return {
                ...state,
                visibilityFilter: action.visibilityFilter,
            };
        case types.SYNC_QUANTITY: {
            const { quantity, item } = action.payload;
            state.goods.map(thisItem => thisItem.name === item ? thisItem.quantity = quantity : null)
            return {
                ...state
            }
        }



        case types.PRODUCT_INPUT_CHANGE:
            return {
                ...state,
                goods: {
                    ...state.goods,
                    [action.payload.id]: {
                        ...state.goods[action.payload.id],
                        [action.payload.inputName]: action.payload.value,
                    }
                }
            }

        case types.PRODUCT_OPERATION_DATA_REJECT:
            return {
                ...state,
                product_operation_HasErrored: action.product_operation_HasErrored,
            };
        case types.PRODUCT_OPERATION_DATA_REQUEST:
            return {
                ...state,
                product_operation_isLoading: action.product_operation_isLoading,
            };

        case types.PRODUCT_OPERATION_CHANGE_DATA_SUCCESS:
            console.log('PRODUCT', action.payload);
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    name: action.payload.name,
                    price: action.payload.price,
                    img: action.payload.img,
                    role: action.payload.role
                }
            }
        case types.PRODUCT_OPERATION_DELETE_DATA_SUCCESS:

            const { goods: { [action.payload.id]: deletedGood, ...restGoods }, ...rest } = state;
            return {
                ...rest,
                goods: restGoods
            }
        case types.PRODUCT_OPERATION_СREATE_DATA_SUCCESS:

            return {
                ...state,
                goods: {
                    [action.payload._id]: action.payload,
                    ...state.goods

                }
            }
        // [action.payload.id]: {
        //     ...state[action.payload.id],
        //     quantity: action.payload.quantity,
        //     price: action.payload.price,
        //     img: action.payload.img,
        //     role: action.payload.role


        // }

        // case types.VISIBLE_OPERATION_FORM:
        //     console.log(action.payload.changeForm)
        //     return {
        //         ...state,
        //         addForm: action.payload.addForm.addForm,
        //         changeForm: {changeForm:action.payload.changeForm.changeForm, id:action.payload.changeForm.id}

        //     };
        // // const { [action.element._id]: deletedItem, ...rest } = state;
        // // return rest;
        // // // return {
        // // //     ...state,
        // // //     goods: action.goods.reverse().reduce(function (result, item, index, array) {
        // // //         result[item._id] = item;
        // // //         return result;
        // // //     }, {})
        // // };
        default:
            return state;
    }
};
export default goodsReducer;

