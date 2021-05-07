import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'common/form/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_ALL_BUDGET = 'common/form/GET_ALL_BUDGET';
// getPayAnInvoiceForm()
export const SUBMIT_PAYANINVOICE = 'common/form/SUBMIT_PAYANINVOICE';
// getTravelRequestForm()
export const CHANGE_WHETHERUNITPAYFLIGHT = 'common/form/CHANGE_WHETHERUNITPAYFLIGHT';
export const CHANGE_WHETHERUNITPAYHOTEL = 'common/form/CHANGE_WHETHERUNITPAYHOTEL';
// getTravelReimbursementForm()
export const CHANGE_REIMBURSEBEFORE = 'common/form/CHANGE_REIMBURSEBEFORE';
export const CHANGE_REQUESTFORSELF = 'common/form/CHANGE_REQUESTFORSELF';
export const CHANGE_WHTHERCITIZEN = 'common/form/CHANGE_WHTHERCITIZEN';
export const CHANGE_WHETHERPERSONALTRAVELINCLUDE = 'common/form/CHANGE_WHETHERPERSONALTRAVELINCLUDE';
export const CHANGE_CLAIMMEALPERDIEM = 'common/form/CHANGE_CLAIMMEALPERDIEM';
export const CHANGE_WASMEALPROVIDED = 'common/form/CHANGE_WASMEALPROVIDED';
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
// getPayAnInvoiceForm()
export const onFinishPayAnInvoiceForm = (data) => {
    // Pay an Invoice · Shipping Address
    const { pay_fullname, pay_addressline1, pay_addressline2, pay_city, pay_state, pay_zipcode, pay_country } = data;
    // Pay an Invoice · Vendor Information
    const { pay_vendorname, pay_vendoremail, pay_vendorphone, pay_vendorwebsite } = data;
    // Pay an Invoice · Items
    const { pay_items } = data;
    var pay_allitems = []
    if (pay_items) {
        pay_items.map((pay_item, idx) => {
            const { expensedescription, businesspurpose, category, fullamount, budget_firstnumber } = pay_item;
            
            var pay_budgets = []; 
            // budget_fisrt
            const { budget_firstamount, budget_firsttask, budget_firstproject, budget_firstoption, budget_rest } = pay_item;
            const pay_budget = { budget_firstnumber, budget_firstamount, budget_firsttask: budget_firsttask || '', budget_firstproject: budget_firstproject || '', budget_firstoption: budget_firstoption || '' }
            pay_budgets.push(pay_budget)
            // budget_rest
            if (budget_rest && budget_rest.length > 0) {
                budget_rest.map((budget_rest_peritem) => {
                    const { budget_restnumbers, budget_restamounts, budget_firsttask, budget_firstproject, budget_firstoption } = budget_rest_peritem;
                    const pay_budget_rest = { budget_restnumbers, budget_restamounts, budget_firsttask: budget_firsttask || '', budget_firstproject: budget_firstproject || '', budget_firstoption: budget_firstoption || '' }
                    pay_budgets.push(pay_budget_rest)
                })
            }
            console.log('pay_budgets', pay_budgets)
            var pay_attachments = [];
            // attachment
            const { attachment } = pay_item;
            if (attachment && attachment.length > 0) {
                attachment.map((att) => {
                    const { name, response } = att; 
                    if (response) {
                        const { url } = response; const pay_perattachment = { name, url };
                        pay_attachments.push(pay_perattachment)
                    }
                })
            }
            const pay_peritem = { expensedescription: expensedescription || '', businesspurpose: businesspurpose || '', category: category || '', fullamount, pay_budgets, pay_attachments };
            pay_allitems.push(pay_peritem);
        })
        console.log('pay_allitems', pay_allitems)
    }

    const pay_formdata = {
        pay_fullname, pay_addressline1, pay_addressline2: pay_addressline2 || '', pay_city, pay_state, pay_zipcode, pay_country,
        pay_vendorname, pay_vendoremail: pay_vendoremail || '', pay_vendorphone: pay_vendorphone || '', pay_vendorwebsite: pay_vendorwebsite || '',
        pay_allitems
    }
    console.log('pay_formdata', pay_formdata)
    return { type: SUBMIT_PAYANINVOICE, pay_formdata }
}
// getTravelRequestForm()
export const tra_changeWhetherUnitPayFlight = (data) => ({
    type: CHANGE_WHETHERUNITPAYFLIGHT,
    data
})
export const tra_changeWhetherUnitPayHotel = (data) => ({
    type: CHANGE_WHETHERUNITPAYHOTEL,
    data
})
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
export const traRei_changeClaimMealPerDiem = (data) => ({
    type: CHANGE_CLAIMMEALPERDIEM,
    data
})
export const traRei_changeWasMealProvided = (data) => ({
    type: CHANGE_WASMEALPROVIDED,
    data
})
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