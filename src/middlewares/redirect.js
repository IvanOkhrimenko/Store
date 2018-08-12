import { browserHistory } from 'react-router'

import * as types from '../actions/action-types'


export const redirect = store => next => action => { //eslint-disable-line no-unused-vars

    if (action.payload != undefined) {

        if (action.payload.nextUrl != undefined) {

            console.log(browserHistory)
            if (action.type === types.ROUTING) {
                browserHistory.push('/admin')
            }
        }
        return next(action)
    }
}
