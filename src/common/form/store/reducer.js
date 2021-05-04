import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    tra: {
        legal_firstname: '',
        legal_lastname: '',
        departure: '',
        destination: '',
        departing_date: '',
        returning_date: '',
        reason: '',
        budget_list: [ 
            { budget_number: '', amount: '' },
        ],
    }
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.UPDATE_FIRSTNAME:
            return state.setIn(['tra', 'legal_firstname'], action.value);
        case constants.UPDATE_LASTNAME:
            return state.setIn(['tra', 'legal_lastname'], action.value);
        case constants.UPDATE_DEPARTURE:
            return state.setIn(['tra', 'departure'], action.value);
        case constants.UPDATE_DESTINATION:
            return state.setIn(['tra', 'destination'], action.value);
        case constants.UPDATE_DEPARTING_AND_RETURNING_TIME:
            return state.setIn(['tra', 'departing_date'], action.value[0]).setIn(['tra', 'returning_date'], action.value[1]);
        case constants.UPDATE_REASON:
            return state.setIn(['tra', 'reason'], action.value);
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge(fromJS({
                tra: {
                    legal_firstname: '',
                    legal_lastname: '',
                    departure: '',
                    destination: '',
                    departing_date: '',
                    returning_date: '',
                    reason: '',
                }
            }))
        default:
            return state;
    }
}

export default reducer;