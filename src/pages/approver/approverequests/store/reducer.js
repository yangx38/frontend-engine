import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    ft_allforms: [],
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        // logout()
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge(fromJS({
                ft_allforms: [],
            }))
        // componentDidMount()
        case constants.GET_FORMSFROMAPPROVERNETID:
            return state.set('ft_allforms', action.data);
        default:
            return state;
    }
}

export default reducer;