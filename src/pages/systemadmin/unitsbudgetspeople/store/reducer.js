import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    ust_allunitsubunit: [],
    pt_allpeople: [],
    ust_selectedUnit: '',
    ust_selectedSubunit: '',
    ust_editmodal: false,
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge({
                ust_allunitsubunit: [],
                ust_selectedUnit: '',
                ust_selectedSubunit: '',
                ust_editmodal: false,
            })
        case constants.GET_ALL_UNIT_SUBUNIT:
            return state.set('ust_allunitsubunit', action.data);
        case constants.GET_ALL_PEOPLE:
            return state.set('pt_allpeople', action.data);
        case constants.CHANGE_UST_SELECTED_UNIT:
            return state.merge({
                ust_selectedUnit: action.data,
                ust_selectedSubunit: '',
            })
        case constants.CHANGE_UST_SELECTED_SUBUNIT:
            return state.merge({
                ust_selectedUnit: '',
                ust_selectedSubunit: action.data,
            })
        case constants.SHOW_UST_EDIT_MODAL:
            return state.set('ust_editmodal', action.data);
        default:
            return state;
    }
}

export default reducer;