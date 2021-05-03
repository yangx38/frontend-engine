import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    login: false,
    profileObj: {},
    user: {
        role: '',
        submitterSubunitsOfGivenNetId: '',
        fiscalStaffSubunitsOfGivenNetId: ''
    },
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_ROLE:
            return state.setIn(['user', 'role'], action.role);
        case constants.CHANGE_SUBMITTER_SUBUNITS_OF_GIVEN_NETID:
            return state.setIn(['user', 'submitterSubunitsOfGivenNetId'], action.data);
        case constants.CHANGE_FISCAL_STAFF_SUBUNITS_OF_GIVEN_NETID:
            return state.setIn(['user', 'fiscalStaffSubunitsOfGivenNetId'], action.data);
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
                    submitterSubunitsOfGivenNetId: '',
                    fiscalStaffSubunitsOfGivenNetId: ''
                },
            })
        default:
            return state;
    }
}

export default reducer;