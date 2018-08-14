import axios from 'axios';
import * as types from './action-types';

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
export function operationDeleteRequestsIsSuccess(payload) {
    return {
        type: types.OPERATION_DELETE_DATA_SUCCESS,
        payload
    };
}
export function operationCreateRequestsIsSuccess(payload) {
    return {
        type: types.OPERATION_СREATE_DATA_SUCCESS,
        payload
    };
}
export function goodAdd(url, values) {
    return (dispatch) => {
        dispatch(operationIsLoading(true));
        axios.post(url, values)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(operationIsLoading(false));
                console.log(response.data)
                return response.data;
            })
            .then((element) => dispatch(operationCreateRequestsIsSuccess(element)))
            .catch(() => {
                dispatch(operationIsLoading(false));
                dispatch(operationHasErrored(true));
            });
    };
}
export function goodsChangeData(url, values) {
    return (dispatch) => {
        dispatch(operationIsLoading(true));
        axios.put(url, values)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(operationIsLoading(false));
                console.log(response.data)
                return response.data;
            })
            .then((element) => dispatch(operationChangeRequestsIsSuccess(element)))
            .catch(() => {
                dispatch(operationIsLoading(false));
                dispatch(operationHasErrored(true));
            });
    };
}
export function deleteGood(url) {
    return (dispatch) => {
        dispatch(operationIsLoading(true));
        axios.delete(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(operationIsLoading(false));
                console.log(response.data);
                dispatch(operationDeleteRequestsIsSuccess(response.data));
                return response.data;
            })
            .catch(() => {
                dispatch(operationIsLoading(false));
                dispatch(operationHasErrored(true));
            });
    };
}
// export function deleteGood(url) {
//     return (dispatch) => {
//         return axios.delete(url)
//             .then(res => {
//                 console.log(res);
//                 console.log(res.data);
//             })
//     }
// }
export function changeInput(inputName, value, id) {
    return {
        type: types.CHANGE_INPUT,
        payload: { inputName, value, id }
    }
}
// export function goodsChangeData1(url, values) {
//     return (dispatch) => {
//         return axios.put(url, values)
//             .then(function (response) {
//                 console.log(response);
//                 if (response.status == 200) {
//                     console.log('delete');
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };
// }

// export function goodsPostData(url, good) {
//     return (dispatch) => {
//         return axios.post(url, good)
//             .then(response => {
//                 dispatch(createBookSuccess(response.data))
//             })
//             .catch(error => {
//                 throw (error);
//             });
//     };
// }
