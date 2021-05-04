import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    all_budget: [],
    traRei: {
        reimbursedBefore: '',
        requestForSelf: '',
        whetherCitizen: '',
        whetherPersonalTravelInclude: '',
    },
    rei: {
        whetherReimbursementFor: '',
        preferredPaymentMethod: '',
    },
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        // logout()
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge(fromJS({
                all_budget: [],
                traRei: {
                    reimbursedBefore: '',
                    requestForSelf: '',
                    whetherCitizen: '',
                    whetherPersonalTravelInclude: '',
                },
                rei: {
                    whetherReimbursementFor: '',
                },
            }))
        // componentDidMount()
        case constants.GET_ALL_BUDGET:
            return state.set('all_budget', action.data);
        // getTravelRequestForm()
        // getTravelReimbursementForm()
        case constants.CHANGE_REIMBURSEBEFORE:
            return state.setIn(['traRei', 'reimbursedBefore'], action.data);
        case constants.CHANGE_REQUESTFORSELF:
            return state.setIn(['traRei', 'requestForSelf'], action.data);
        case constants.CHANGE_WHTHERCITIZEN:
            return state.setIn(['traRei', 'whetherCitizen'], action.data);
        case constants.CHANGE_WHETHERPERSONALTRAVELINCLUDE:
            return state.setIn(['traRei', 'whetherPersonalTravelInclude'], action.data);
        // getPayAnInvoiceForm()
        // getProcardReceipt()
        // getPurchaseRequestForm()
        // getReimbursementForm()
        case constants.CHANGE_REIMBURSEMENTFOR:
            return state.setIn(['rei', 'whetherReimbursementFor'], action.data);
        case constants.CHANGE_PREFERREDPAYMENTMETHOD:
            return state.setIn(['rei', 'preferredPaymentMethod'], action.data);
        default:
            return state;
    }
}

export default reducer;