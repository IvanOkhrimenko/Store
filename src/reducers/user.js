import * as types from '../actions/action-types';

const initialState = JSON.parse(window.localStorage.getItem('rr_user')) || {}

export default function userstate(state = initialState, action) {

    switch (action.type) {

        case types.LOGIN_REQUEST:
            console.log(action)
            return state

        case types.LOGIN_SUCCESS:
            // TODO
            console.log(action.payload)
            return { ...state, name: action.payload.name, isAuthenticated: action.payload.isAuthenticated }

        case types.LOGIN_FAIL:
            // TODO
            return state

        case types.LOGOUT_SUCCESS:
            // TODO
            return state

        default:
            return state
    }
}
