import axios from 'axios';
import * as types from './action-types';

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