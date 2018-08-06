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

export function goodsPostData(url, good) {
    return (dispatch) => {
        return axios.post(url, good)
            .then(response => {
                // Dispatch a synchronous action
                // to handle data
                dispatch(createBookSuccess(response.data))
            })
            .catch(error => {
                throw (error);
            });
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

                return response.data;
            })
            .then(goods => dispatch(goodsFetchDataSuccess(goods)))
            .catch(() => {
                dispatch(goodsIsLoading(false));
                dispatch(goodsHasErrored(true));
            });
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
        limit: 10,
    };
}

export function goodsSearch(searchFilter) {
    return {
        type: types.FIND_GOODS,
        searchFilter,
    };
}
