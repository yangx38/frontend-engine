import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    login: false,
    profileObj: {},
    user: {
        role: '',
        unit: '',
        subunit: ''
    },
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_ROLE:
            return state.setIn(['user', 'role'], action.role);
        case constants.CHANGE_TO_LOGIN: 
            return state.merge({
                login: true,
                profileObj: action.profile,
            });
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge({
                login: false,
                profileObj: {},
                user: {
                    role: '',
                    unit: '',
                    subunit: ''
                },
            })
        default:
            return state;
    }
}

export default reducer;