import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    ft_allforms: [],
    ft_selected_formdata: '',
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        // logout()
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge(fromJS({
                ft_allforms: [],
                ft_selected_formdata: '',
            }))
        // componentDidMount()
        case constants.GET_FORMSFROMAPPROVERNETID:
            return state.set('ft_allforms', action.data);
        case constants.SET_FT_SELECTEDDETAILS:
            return state.set('ft_selected_formdata', action.data);
        default:
            return state;
    }
}

export default reducer;