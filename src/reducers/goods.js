import * as types from '../actions/action-types';

const initialState = {
    goods: [],
    hasErrored: false,
    isLoading: false,
    limit: 10,
    searchFilter: '',
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
                goods: action.goods,
            };


        case types.CREATE_GOOD_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.good)
            ];
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

        default:
            return state;
    }
};

export default goodsReducer;

