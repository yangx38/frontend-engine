import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    ft_allforms: [],
    ft_selected_formdata: '',
    selected_budgetIdx: '',
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        // logout()
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge(fromJS({
                ft_allforms: [],
                ft_selected_formdata: '',
                selected_budgetIdx: '',
            }))
        // componentDidMount()
        case constants.GET_FORMSFROMAPPROVERNETID:
            return state.set('ft_allforms', action.data);
        case constants.SET_FT_SELECTEDDETAILS:
            return state.set('ft_selected_formdata', action.data);
        // From ApproverDetailPage
        case constants.SELECT_BUDGET:
            return state.set('selected_budgetIdx', action.idx);
        case constants.BACK_TO_TABLE:
            return state.set('ft_selected_formdata', '').set('selected_budgetIdx', '');
        case constants.APPROVE_SELECTEDBUDGET:
            const ft_selected_formdataJS = state.get('ft_selected_formdata').toJS();
            const { used_budget } = ft_selected_formdataJS;
            let used_budgetCopy = JSON.parse(JSON.stringify(used_budget)); 
            const { approvers, status } = used_budgetCopy[action.idx];
            used_budgetCopy[action.idx] = {...used_budgetCopy[action.idx], approver_comment: action.comment, approver_comment_time: action.timestamp};
            for (let i = 0; i < approvers.length; i++) {
                if(approvers[i] === action.netId) {
                    status[i] = 1;
                    break;
                }
            }
            const mewft_selected_formdataJS = {...ft_selected_formdataJS, used_budget: used_budgetCopy}
            return state.set('ft_selected_formdata', fromJS(mewft_selected_formdataJS));
        default:
            return state;
    }
}

export default reducer;