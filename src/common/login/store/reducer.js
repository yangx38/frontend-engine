import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    login: false,
    profileObj: {},
    user: {
        role: '',
        fiscalStaffUnitsOfGivenNetId: '',
        approverBudgetNumberssOfGivenNetId: '',
        submitterSubunitsOfGivenNetId: '',
    },
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_ROLE:
            return state.setIn(['user', 'role'], action.role);
        case constants.CHANGE_FISCAL_STAFF_UNITS_OF_GIVEN_NETID:
            return state.setIn(['user', 'fiscalStaffUnitsOfGivenNetId'], action.data);
        case constants.CHANGE_APPROVER_BUDGET_NUMBERS_OF_GIVEN_NETID:
            return state.setIn(['user', 'approverBudgetNumberssOfGivenNetId'], action.data);
        case constants.CHANGE_SUBMITTER_SUBUNITS_OF_GIVEN_NETID:
            return state.setIn(['user', 'submitterSubunitsOfGivenNetId'], action.data);
        case constants.CHANGE_TO_LOGIN: 
        return state.merge(fromJS({
                login: true,
                profileObj: action.profile,
            }));
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge(fromJS({
                login: false,
                profileObj: {},
                user: {
                    role: '',
                    fiscalStaffUnitsOfGivenNetId: '',
                    approverBudgetNumberssOfGivenNetId: '',
                    submitterSubunitsOfGivenNetId: '',
                },
            }))
        default:
            return state;
    }
}

export default reducer;