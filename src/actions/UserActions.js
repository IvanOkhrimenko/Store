import * as types from './action-types';

export function login(payload) {
    return (dispatch) => {

        dispatch({
            type: types.LOGIN_REQUEST
        })

        setTimeout(() => {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: {
                    name: payload.name,
                    isAuthenticated: true
                }
            })
            dispatch({
                type: types.ROUTING,
                payload: {
                    method: 'push', //или, например, replace
                    nextUrl: '/admin'
                }
            })
        }, 1000)
    }
}

export function logout() {
    return {
        type: types.LOGOUT_SUCCESS
    }
}

