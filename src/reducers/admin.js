import * as types from '../actions/action-types';

const initialState = {
    addForm: false,
    changeForm: { changeForm: false, id: null },
};

const adminReducer = function reducer(state = initialState, action) {
    switch (action.type) {
        case types.PRODUCT_VISIBLE_OPERATION_FORM:
            console.log(action.payload.changeForm)
            return {
                ...state,
                addForm: action.payload.addForm.addForm,
                changeForm: { changeForm: action.payload.changeForm.changeForm, id: action.payload.changeForm.id }
            };
            
        default:
            return state;
    }
};

export default adminReducer;

