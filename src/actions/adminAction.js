import axios from 'axios';
import * as types from './action-types';

export function product_operationHasErrored(bool) {
    return {
        type: types.PRODUCT_OPERATION_DATA_REJECT,
        product_operation_HasErrored: bool,
    };
}
export function product_operationIsLoading(bool) { // for DELETE,PUT requests
    return {
        type: types.PRODUCT_OPERATION_DATA_REQUEST,
        product_operation_isLoading: bool,
    };
}

export function product_operationChangeRequestsIsSuccess(element) {
    console.log('element', element)
    return {
        type: types.PRODUCT_OPERATION_CHANGE_DATA_SUCCESS,
        payload: element
    };
}
export function product_operationDeleteRequestsIsSuccess(payload) {
    return {
        type: types.PRODUCT_OPERATION_DELETE_DATA_SUCCESS,
        payload
    };
}
export function product_operationCreateRequestsIsSuccess(payload) {

    return {
        type: types.PRODUCT_OPERATION_СREATE_DATA_SUCCESS,
        payload
    };
}
export function goodAdd(url, values) {
    return (dispatch) => {
        dispatch(product_operationIsLoading(true));
        axios.post(url, values)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(product_operationIsLoading(false));
                console.log(response.data)
                return response.data;
            })
            .then((element) => dispatch(product_operationCreateRequestsIsSuccess(element)))
            .catch(() => {
                dispatch(product_operationIsLoading(false));
                dispatch(product_operationHasErrored(true));
            });
    };
}
export function goodsChangeData(url, values) {
    return (dispatch) => {
        dispatch(product_operationIsLoading(true));
        axios.put(url, values)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(product_operationIsLoading(false));
                console.log(response.data)
                dispatch(product_operationChangeRequestsIsSuccess(response.data));
                return response.data;
            })
            .catch(() => {
                dispatch(product_operationIsLoading(false));
                dispatch(product_operationHasErrored(true));
            });
    };
}
export function deleteGood(url) {
    return (dispatch) => {
        dispatch(product_operationIsLoading(true));
        axios.delete(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(product_operationIsLoading(false));
                console.log(response.data);
                dispatch(product_operationDeleteRequestsIsSuccess(response.data));
                return response.data;
            })
            .catch(() => {
                dispatch(product_operationIsLoading(false));
                dispatch(product_operationIsLoading(false));
                dispatch(product_operationHasErrored(true));
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
export function visibleProductOperationForm(addForm, changeForm) {
    return {
        type: types.PRODUCT_VISIBLE_OPERATION_FORM,
        payload: { addForm, changeForm }
    };
}
export function productChangeInput(inputName, value, id) {
    return {
        type: types.PRODUCT_INPUT_CHANGE,
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
