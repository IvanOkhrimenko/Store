import * as types from '../actions/action-types';

const initialState = {
    users: [],
    hasErrored: false,
    isLoading: false,
    searchFilter: '',
    visibilityFilter: 'SHOW_ALL',
    addForm: false,
    changeForm: { changeForm: false, id: null },
};





const usersReducer = function reducer(state = initialState, action) {
    switch (action.type) {
        case types.USERS_FETCH_DATA_REJECT:
            return {
                ...state,
                hasErrored: action.hasErrored,
            };
        case types.USERS_FETCH_DATA_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case types.USER_VISIBLE_OPERATION_FORM:
            console.log(action.payload.changeForm)
            return {
                ...state,
                addForm: action.payload.addForm.addForm,
                changeForm: { changeForm: action.payload.changeForm.changeForm, id: action.payload.changeForm.id }
            };

        case types.USERS_FETCH_DATA_SUCCESS:
            console.log(action)
            return {
                ...state,
                users: action.users.reverse().reduce(function (result, item) {
                    result[item._id] = item;
                    return result;
                }, {})
            };

        case types.FIND_USERS:
            return {
                ...state,
                searchFilter: action.searchFilter,
            };


        case types.USERS_SET_VISIBILITY_FILTER:
            return {
                ...state,
                visibilityFilter: action.visibilityFilter,

            }

        case types.USER_INPUT_CHANGE:
            console.log(action.payload)

            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.id]: {
                        ...state.users[action.payload.id],
                        [action.payload.inputName]: action.payload.value,
                    }
                }
            }

        case types.USER_OPERATION_DATA_REJECT:
            return {
                ...state,
                user_operation_HasErrored: action.user_operation_HasErrored,
            };
        case types.USER_OPERATION_DATA_REQUEST:
            return {
                ...state,
                user_operation_isLoading: action.user_operation_isLoading,
            };

        case types.USER_OPERATION_CHANGE_DATA_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    name: action.payload.name,
                    last_name: action.payload.last_name,
                    email: action.payload.email,
                    password: action.payload.password,
                    role: action.payload.role
                }

            }
        case types.USER_OPERATION_DELETE_DATA_SUCCESS:
            console.log(state.users, action.payload.id)
            const { users: { [action.payload.id]: deletedUser, ...restUsers }, ...rest } = state;
            return {
                ...rest,
                users: restUsers
            }
        case types.USER_OPERATION_СREATE_DATA_SUCCESS:
            console.log({ [action.payload._id]: action.payload });
            return {
                ...state,
                users: {
                    [action.payload._id]: action.payload,
                    ...state.users

                }
            }
        default:
            return state;
    }
};

export default usersReducer;

