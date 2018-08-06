import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
//	Reducers
import goodsReducer from './goods';

//	Combine reducers
const reducers = combineReducers({
    goodsState: goodsReducer,
    form: formReducer
});

export default reducers;
