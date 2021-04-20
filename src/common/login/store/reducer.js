import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    login: false,
    profileObj: {},
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_TO_LOGIN: 
            return state.merge({
                login: true,
                profileObj: action.profile,
            });
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge({
                login: false,
                profileObj: {},
            })
        default:
            return state;
    }
}

export default reducer;