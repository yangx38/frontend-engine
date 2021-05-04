import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    all_budget: [],
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_ALL_BUDGET:
            return state.set('all_budget', action.data);
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge(fromJS({
                all_budget: [],
            }))
        default:
            return state;
    }
}

export default reducer;