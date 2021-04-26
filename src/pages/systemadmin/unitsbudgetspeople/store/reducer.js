import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    unitsubunit: [],
    addMoal: false,
    editModal: false,
    selectedUnit: '',
    selectedSubunit: '',
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_ALL_UNIT_SUBUNIT:
            return state.set('unitsubunit', action.data);
        case constants.SHOW_ADD_MODAL:
            return state.set('addMoal', action.visible);
        case constants.SHOW_EDIT_MODAL:
            return state.set('editModal', action.visible);
        case constants.CHANGE_SELECTED_SUBUNIT:
            return state.merge({
                selectedUnit: '',
                selectedSubunit: action.key
            })
        case constants.CHANGE_SELECTED_UNIT:
            return state.merge({
                selectedUnit: action.key,
                selectedSubunit: ''
            })
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge({
                unitsubunit: [],
                addMoal: false,
                editModal: false,
                selectedUnit: '',
                selectedSubunit: '',
            })
        default:
            return state;
    }
}

export default reducer;