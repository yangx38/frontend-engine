import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'common/form/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_ALL_BUDGET = 'common/form/GET_ALL_BUDGET';
// getTravelRequestForm()
// getTravelReimbursementForm()
export const CHANGE_REIMBURSEBEFORE = 'common/form/CHANGE_REIMBURSEBEFORE';
export const CHANGE_REQUESTFORSELF = 'common/form/CHANGE_REQUESTFORSELF';
export const CHANGE_WHTHERCITIZEN = 'common/form/CHANGE_WHTHERCITIZEN';
export const CHANGE_WHETHERPERSONALTRAVELINCLUDE = 'common/form/CHANGE_WHETHERPERSONALTRAVELINCLUDE';
// getPayAnInvoiceForm()
// getProcardReceipt()
// getPurchaseRequestForm()
// getReimbursementForm()
export const CHANGE_REIMBURSEMENTFOR = 'common/form/CHANGE_REIMBURSEMENTFOR';
export const CHANGE_PREFERREDPAYMENTMETHOD = 'common/form/CHANGE_PREFERREDPAYMENTMETHOD';

// **************** Actions ****************
// logout()
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
// componentDidMount()
const getAllBudgetsAction = (data) => ({
    type: GET_ALL_BUDGET,
    data: fromJS(data)
})
export const getAllBudgets = () => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/systemadmin/getAllBudgets`)
            .then(res => {
                console.log('Pages, unitsbudgetspeople, getAllBudgets, res.data', res.data);
                dispatch(getAllBudgetsAction(res.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
// getTravelRequestForm()
// getTravelReimbursementForm()
export const traRei_changeReimbursedBefore = (data) => ({
    type: CHANGE_REIMBURSEBEFORE,
    data
})
export const traRei_changeRequestForSelf = (data) => ({
    type: CHANGE_REQUESTFORSELF,
    data
})
export const traRei_changeWhetherCitizen = (data) => ({
    type: CHANGE_WHTHERCITIZEN,
    data
})
export const traRei_changeWhetherPersonalTravelInclude = (data) => ({
    type: CHANGE_WHETHERPERSONALTRAVELINCLUDE,
    data
})
// getPayAnInvoiceForm()
// getProcardReceipt()
// getPurchaseRequestForm()
// getReimbursementForm()
export const rei_changeReimbursedFor = (data) => ({
    type: CHANGE_REIMBURSEMENTFOR,
    data
})
export const rei_changePreferredPaymentMethod = (data) => ({
    type: CHANGE_PREFERREDPAYMENTMETHOD,
    data
})