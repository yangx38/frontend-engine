import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    all_budget: [],
    tra: {
        whetherUnitPayFlight: '',
        whetherUnitPayHotel: '',
    },
    traRei: {
        reimbursedBefore: '',
        requestForSelf: '',
        whetherCitizen: '',
        whetherPersonalTravelInclude: '',
        claimMealPerDiem: '',
        mealProvided: '',
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
                tra: {
                    whetherUnitPayFlight: '',
                    whetherUnitPayHotel: '',
                },
                traRei: {
                    reimbursedBefore: '',
                    requestForSelf: '',
                    whetherCitizen: '',
                    whetherPersonalTravelInclude: '',
                    claimMealPerDiem: '',
                    mealProvided: '',
                },
                rei: {
                    whetherReimbursementFor: '',
                    preferredPaymentMethod: '',
                },
            }))
        // componentDidMount()
        case constants.GET_ALL_BUDGET:
            return state.set('all_budget', action.data);
        // getTravelRequestForm()
        case constants.CHANGE_WHETHERUNITPAYFLIGHT:
            return state.setIn(['tra', 'whetherUnitPayFlight'], action.data);
        case constants.CHANGE_WHETHERUNITPAYHOTEL:
            return state.setIn(['tra', 'whetherUnitPayHotel'], action.data);
        // getTravelReimbursementForm()
        case constants.CHANGE_REIMBURSEBEFORE:
            return state.setIn(['traRei', 'reimbursedBefore'], action.data);
        case constants.CHANGE_REQUESTFORSELF:
            return state.setIn(['traRei', 'requestForSelf'], action.data);
        case constants.CHANGE_WHTHERCITIZEN:
            return state.setIn(['traRei', 'whetherCitizen'], action.data);
        case constants.CHANGE_WHETHERPERSONALTRAVELINCLUDE:
            return state.setIn(['traRei', 'whetherPersonalTravelInclude'], action.data);
        case constants.CHANGE_CLAIMMEALPERDIEM:
            return state.setIn(['traRei', 'claimMealPerDiem'], action.data);
        case constants.CHANGE_WASMEALPROVIDED:
            return state.setIn(['traRei', 'mealProvided'], action.data);
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