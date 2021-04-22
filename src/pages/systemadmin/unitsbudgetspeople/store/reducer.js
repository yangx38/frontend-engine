import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    unitsubunit: [],
    isModalVisible: false,
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_ALL_UNIT_SUBUNIT:
            return state.set('unitsubunit', action.data);
        case constants.CHANGE_IS_MODAL_VISIBLE:
            return state.set('isModalVisible', action.visible);
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge({
                unitsubunit: [],
                isModalVisible: false,
            })
        default:
            return state;
    }
}

export default reducer;