import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

import { save, load } from "redux-localstorage-simple"


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const initialState = {};
// const store = createStore(
//     reducers,
//     initialState,
//     composeEnhancers(applyMiddleware(thunk),
//     ));
/* eslint-enable */
const createStoreWithMiddleware
    = composeEnhancers(applyMiddleware(
        save(),
        thunk // Saving done here
    ))(createStore)




const store = createStoreWithMiddleware(
    reducers,

    load() // Loading done here
)

export default store;
