import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    all_budget: [],
    confirm_modal: false,
    receipt_number: '',
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
    form_data: {
        pay: {},
        pro: {},
        pur: {},
        rei: {},
        tra: {},
        trarei: {},
    },
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        // logout()
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge(fromJS({
                all_budget: [],
                confirm_modal: false,
                receipt_number: '',
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
                form_data: {
                    pay: {},
                    pro: {},
                    pur: {},
                    rei: {},
                    tra: {},
                    trarei: {},
                },
            }))
        case constants.RESET_CONFIRMMODAL_RECEIPTNUMBER:
            return state.set('confirm_modal', false).set('receipt_number', '');
        // componentDidMount()
        case constants.GET_ALL_BUDGET:
            return state.set('all_budget', action.data);
        // getPayAnInvoiceForm()
        case constants.SUBMIT_PAYANINVOICE:
            return state.setIn(['form_data', 'pay'], action.pay_formdata).set('confirm_modal', true);
        // getProcardReceipt()
        case constants.SUBMIT_PROCARDRECEIPT:
            return state.setIn(['form_data', 'pro'], action.pro_formdata).set('confirm_modal', true);
        // getPurchaseRequestForm()
        case constants.SUBMIT_PURCHASEREQUEST:
            return state.setIn(['form_data', 'pur'], action.pur_formdata).set('confirm_modal', true);
        // getReimbursementForm()
        case constants.CHANGE_REIMBURSEMENTFOR:
            return state.setIn(['rei', 'whetherReimbursementFor'], action.data);
        case constants.CHANGE_PREFERREDPAYMENTMETHOD:
            return state.setIn(['rei', 'preferredPaymentMethod'], action.data);
        case constants.SUBMIT_REIMBURSEMENT:
            return state.setIn(['form_data', 'rei'], action.rei_formdata).set('confirm_modal', true);
        // getTravelRequestForm()
        case constants.CHANGE_WHETHERUNITPAYFLIGHT:
            return state.setIn(['tra', 'whetherUnitPayFlight'], action.data);
        case constants.CHANGE_WHETHERUNITPAYHOTEL:
            return state.setIn(['tra', 'whetherUnitPayHotel'], action.data);
        case constants.SUBMIT_TRAVELREQUEST:
            return state.setIn(['form_data', 'tra'], action.tra_formdata).set('confirm_modal', true);
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
        case constants.SUBMIT_TRAVELREIMBURSEMENT: 
            return state.setIn(['form_data', 'trarei'], action.trarei_formdata).set('confirm_modal', true);
        // getConfirmModal()
        case constants.UPDATE_RECEIPTNUMBER:
            return state.merge(fromJS({
                confirm_modal: false,
                receipt_number: action.data,
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
                form_data: {
                    pay: {},
                    pro: {},
                    pur: {},
                    rei: {},
                    tra: {},
                    trarei: {},
                },
            }))
        // render()
        case constants.SUBMIT_ANOTHERREQUEST:
            return state.set('receipt_number', '');
        default:
            return state;
    }
}

export default reducer;