import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    ust_allunitsubunit: [],
    pt_allpeople_unchanged: [],
    pt_allpeople: [], // displayed on pt_table
    ust_selectedUnit: '',
    ust_selectedSubunit: '',
    ust_editmodal: false,
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_ALL_UNIT_SUBUNIT:
            return state.set('ust_allunitsubunit', action.data);
        case constants.GET_ALL_PEOPLE:
            return state.set('pt_allpeople_unchanged', action.data).set('pt_allpeople', action.data);
        case constants.CHANGE_UST_SELECTED_UNIT:
            return state.merge(fromJS({
                ust_selectedUnit: action.unitname,
                ust_selectedSubunit: '',
                pt_allpeople: action.data
            }))
        case constants.CHANGE_UST_SELECTED_SUBUNIT:
            return state.merge(fromJS({
                ust_selectedUnit: '',
                ust_selectedSubunit: action.subunitname,
                pt_allpeople: action.data
            }))
        case constants.SHOW_UST_EDIT_MODAL:
            return state.set('ust_editmodal', action.data);
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge(fromJS({
                ust_allunitsubunit: [],
                pt_allpeople_unchanged: [],
                pt_allpeople: [],
                ust_selectedUnit: '',
                ust_selectedSubunit: '',
                ust_editmodal: false,
            }))
        default:
            return state;
    }
}

export default reducer;