import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { autoRehydrate, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
//	Reducers
import goodsReducer from './goods';
import cartReducer from './cart';
import adminReducer from './admin';
import usersReducer from './users';
// const rootPersistConfig = {
//     key: 'root',
//     storage: storage,
//     blacklist: ['auth']
// }
// const authPersistConfig = {
//     key: 'auth',
//     storage: storage,
//     blacklist: ['somethingTemporary']
// }
//	Combine reducers
const reducers = combineReducers({
    goodsState: goodsReducer,
    cartState: cartReducer,
    adminState: adminReducer,
    usersState: usersReducer
});

export default reducers;
