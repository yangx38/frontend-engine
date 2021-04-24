import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    unitsubunit: [],
    addMoal: false,
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_ALL_UNIT_SUBUNIT:
            return state.set('unitsubunit', action.data);
        case constants.SHOW_ADD_MODAL: 
            return state.set('addMoal', action.visible);
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge({
                unitsubunit: [],
                addMoal: false,
            })
        default:
            return state;
    }
}

export default reducer;