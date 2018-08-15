import axios from 'axios';
import * as types from './action-types';

export function usersHasErrored(bool) {
    return {
        type: types.USERS_FETCH_DATA_REJECT,
        hasErrored: bool,
    };
}

export function usersIsLoading(bool) {
    return {
        type: types.USERS_FETCH_DATA_REQUEST,
        isLoading: bool,
    };
}

export function usersFetchDataSuccess(users) {
    return {
        type: types.USERS_FETCH_DATA_SUCCESS,
        users,
    };
}
export function usersFetchData(url) {
    return (dispatch) => {
        dispatch(usersIsLoading(true));
        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(usersIsLoading(false));
                console.log(response.data)
                return response.data;
            })
            .then(users => dispatch(usersFetchDataSuccess(users)))
            .catch(() => {
                dispatch(usersIsLoading(false));
                dispatch(usersHasErrored(true));
            });
    };
}
export function usersSetFilter(visibilityFilter) {
    return {
        type: types.USERS_SET_VISIBILITY_FILTER,
        visibilityFilter,
    };
}

export function usersSearch(searchFilter) {
    return {
        type: types.FIND_USERS,
        searchFilter,
    };
}

export function usersOperationHasErrored(bool) {
    return {
        type: types.USER_OPERATION_DATA_REJECT,
        operation_HasErrored: bool,
    };
}
export function usersOperationIsLoading(bool) { // for DELETE,PUT requests
    return {
        type: types.USER_OPERATION_DATA_REQUEST,
        operation_isLoading: bool,
    };
}

export function usersOperationChangeRequestsIsSuccess(element) {
    return {
        type: types.USER_OPERATION_CHANGE_DATA_SUCCESS,
        payload: element
    };
}
export function usersOperationDeleteRequestsIsSuccess(payload) {
    return {
        type: types.USER_OPERATION_DELETE_DATA_SUCCESS,
        payload
    };
}
export function usersOperationCreateRequestsIsSuccess(payload) {
    return {
        type: types.USER_OPERATION_СREATE_DATA_SUCCESS,
        payload
    };
}
export function userAdd(url, values) {
    
    return (dispatch) => {
        dispatch(usersOperationIsLoading(true));
        axios.post(url, values)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(usersOperationIsLoading(false));
                console.log(response.data)
                return response.data;
            })
            .then((element) => dispatch(usersOperationCreateRequestsIsSuccess(element)))
            .catch(() => {
                dispatch(usersOperationIsLoading(false));
                dispatch(usersOperationHasErrored(true));
            });
    };
} export function userChangeData(url, values) {
    console.log(values, url)
    return (dispatch) => {
        dispatch(usersOperationIsLoading(true));
        axios.put(url, values)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(usersOperationIsLoading(false));
                console.log(response.data)
                return response.data;
            })
            .then((element) => dispatch(usersOperationChangeRequestsIsSuccess(element)))
            .catch(() => {
                dispatch(usersOperationIsLoading(false));
                dispatch(usersOperationHasErrored(true));
            });
    };
}
export function deleteUser(url) {
    return (dispatch) => {
        dispatch(usersOperationIsLoading(true));
        axios.delete(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(usersOperationIsLoading(false));
                console.log(response.data);
                dispatch(usersOperationDeleteRequestsIsSuccess(response.data));
                return response.data;
            })
            .catch(() => {
                dispatch(usersOperationIsLoading(false));
                dispatch(usersOperationIsLoading(false));
                dispatch(usersOperationHasErrored(true));
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
export function visibleUserOperationForm(addForm, changeForm) {
    return {
        type: types.USER_VISIBLE_OPERATION_FORM,
        payload: { addForm, changeForm }
    };
}
export function userChangeInput(inputName, value, id) {
    return {
        type: types.USER_INPUT_CHANGE,
        payload: { inputName, value, id }
    }
}