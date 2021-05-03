import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    submit_form: {
        unit: '',
        subunit: '',
        formType: '',
    }
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.READ_SU_SELECTED_SUBUNIT_AND_FORM:
            return state.merge({
                submit_form: {
                    unit: action.unit,
                    subunit: action.subunit,
                    formType: action.formType,
                }
            })
        case constants.CHANGE_TO_LOGOUT:
            return state.merge({
                submit_form: {
                    unit: '',
                    subunit: '',
                    formType: '',
                }
            })
        default:
            return state;
    }
}

export default reducer;