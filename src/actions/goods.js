import axios from 'axios';
import * as types from './action-types';

export function goodsHasErrored(bool) {
    return {
        type: types.GOODS_FETCH_DATA_REJECT,
        hasErrored: bool,
    };
}

export function goodsIsLoading(bool) {
    return {
        type: types.GOODS_FETCH_DATA_REQUEST,
        isLoading: bool,
    };
}

export function operationHasErrored(bool) {
    return {
        type: types.OPERATION_DATA_REJECT,
        operation_HasErrored: bool,
    };
}
export function operationIsLoading(bool) { // for DELETE,PUT requests
    return {
        type: types.OPERATION_DATA_REQUEST,
        operation_isLoading: bool,
    };
}

export function operationChangeRequestsIsSuccess(element) {
    return {
        type: types.OPERATION_CHANGE_DATA_SUCCESS,
        element
    };
}

export function goodsFetchDataSuccess(goods) {
    return {
        type: types.GOODS_FETCH_DATA_SUCCESS,
        goods,
    };
}
export function createGoodSuccess(good) {
    return {
        type: types.CREATE_GOOD_SUCCESS,
        good,
    };
}
export function goodsFetchData(url) {
    return (dispatch) => {
        dispatch(goodsIsLoading(true));
        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(goodsIsLoading(false));
                console.log(response.data)
                return response.data;
            })
            .then(goods => dispatch(goodsFetchDataSuccess(goods)))
            .catch(() => {
                dispatch(goodsIsLoading(false));
                dispatch(goodsHasErrored(true));
            });
    };
}
export function goodsSetFilter(visibilityFilter) {
    return {
        type: types.GOODS_SET_VISIBILITY_FILTER,
        visibilityFilter,
    };
}
export function goodsLoadMore(limit) {
    return {
        type: types.GOODS_LOAD_MORE,
        limit,
    };
}

export function goodsResetLimit() {
    return {
        type: types.GOODS_RESET_LIMIT,
        limit: 8,
    };
}

export function goodsSearch(searchFilter) {
    return {
        type: types.FIND_GOODS,
        searchFilter,
    };
}
