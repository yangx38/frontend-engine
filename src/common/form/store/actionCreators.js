import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'common/form/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_ALL_BUDGET = 'common/form/GET_ALL_BUDGET';
// getPayAnInvoiceForm()
export const SUBMIT_PAYANINVOICE = 'common/form/SUBMIT_PAYANINVOICE';
// getProcardReceipt()
export const SUBMIT_PROCARDRECEIPT = 'common/form/SUBMIT_PROCARDRECEIPT';
// getPurchaseRequestForm()
export const SUBMIT_PURCHASEREQUEST = 'common/form/SUBMIT_PURCHASEREQUEST';
// getReimbursementForm()
export const CHANGE_REIMBURSEMENTFOR = 'common/form/CHANGE_REIMBURSEMENTFOR';
export const CHANGE_PREFERREDPAYMENTMETHOD = 'common/form/CHANGE_PREFERREDPAYMENTMETHOD';
export const SUBMIT_REIMBURSEMENT = 'common/form/SUBMIT_REIMBURSEMENT';
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
// getProcardReceipt()
export const onFinishProcardReceiptForm = (data) => {
    // Procard Receipt · Card Information
    const { pro_cardholder } = data;
    // Procard Receipt · Vendor Information
    const { pro_vendorname, pro_vendoremail, pro_vendorphone, pro_vendorwebsite } = data;
    // Procard Receipt · Items
    const { pro_items } = data;
    var pro_allitems = []
    if (pro_items) {
        pro_items.map((pro_item, idx) => {
            const { expensedescription, businesspurpose, category, fullamount, wassalestaxpaid, budget_firstnumber } = pro_item;
            
            var pro_budgets = []; 
            // budget_fisrt
            const { budget_firstamount, budget_firsttask, budget_firstproject, budget_firstoption, budget_rest } = pro_item;
            const pro_budget = { budget_firstnumber, budget_firstamount, budget_firsttask: budget_firsttask || '', budget_firstproject: budget_firstproject || '', budget_firstoption: budget_firstoption || '' }
            pro_budgets.push(pro_budget)
            // budget_rest
            if (budget_rest && budget_rest.length > 0) {
                budget_rest.map((budget_rest_peritem) => {
                    const { budget_restnumbers, budget_restamounts, budget_firsttask, budget_firstproject, budget_firstoption } = budget_rest_peritem;
                    const pro_budget_rest = { budget_restnumbers, budget_restamounts, budget_firsttask: budget_firsttask || '', budget_firstproject: budget_firstproject || '', budget_firstoption: budget_firstoption || '' }
                    pro_budgets.push(pro_budget_rest)
                })
            }
            console.log('pro_budgets', pro_budgets)
            var pro_attachments = [];
            // attachment
            const { attachment } = pro_item;
            if (attachment && attachment.length > 0) {
                attachment.map((att) => {
                    const { name, response } = att; 
                    if (response) {
                        const { url } = response; const pay_perattachment = { name, url };
                        pro_attachments.push(pay_perattachment)
                    }
                })
            }
            const pro_peritem = { expensedescription: expensedescription || '', businesspurpose: businesspurpose || '', category: category || '', fullamount, wassalestaxpaid: wassalestaxpaid || '', pro_budgets, pro_attachments };
            pro_allitems.push(pro_peritem);
        })
        console.log('pro_allitems', pro_allitems)
    }

    const pro_formdata = {
        pro_cardholder,
        pro_vendorname, pro_vendoremail: pro_vendoremail || '', pro_vendorphone: pro_vendorphone || '', pro_vendorwebsite: pro_vendorwebsite || '',
        pro_allitems
    }
    return { type: SUBMIT_PROCARDRECEIPT, pro_formdata }
}
// getPurchaseRequestForm()
export const onFinishPurchaseRequestForm = (data) => {
    // Purchase Request · Shipping Address
    const { pur_fullname, pur_addressline1, pur_addressline2, pur_city, pur_state, pur_zipcode, pur_country } = data;
    // Purchase Request · Vendor Information
    const { pur_vendorname, pur_vendoremail, pur_vendorphone, pur_vendorwebsite } = data;
    // Purchase Request · Items
    const { pur_items } = data;
    var pur_allitems = []
    if (pur_items) {
        pur_items.map((pur_item, idx) => {
            const { expensedescription, businesspurpose, category, quantity, unitprice, budget_firstnumber } = pur_item;
            
            var pur_budgets = []; 
            // budget_fisrt
            const { budget_firstamount, budget_firsttask, budget_firstproject, budget_firstoption, budget_rest } = pur_item;
            const pur_budget = { budget_firstnumber, budget_firstamount, budget_firsttask: budget_firsttask || '', budget_firstproject: budget_firstproject || '', budget_firstoption: budget_firstoption || '' }
            pur_budgets.push(pur_budget)
            // budget_rest
            if (budget_rest && budget_rest.length > 0) {
                budget_rest.map((budget_rest_peritem) => {
                    const { budget_restnumbers, budget_restamounts, budget_firsttask, budget_firstproject, budget_firstoption } = budget_rest_peritem;
                    const pur_budget_rest = { budget_restnumbers, budget_restamounts, budget_firsttask: budget_firsttask || '', budget_firstproject: budget_firstproject || '', budget_firstoption: budget_firstoption || '' }
                    pur_budgets.push(pur_budget_rest)
                })
            }
            console.log('pur_budgets', pur_budgets)
            var pur_attachments = [];
            // attachment
            const { attachment } = pur_item;
            if (attachment && attachment.length > 0) {
                attachment.map((att) => {
                    const { name, response } = att; 
                    if (response) {
                        const { url } = response; const pur_perattachment = { name, url };
                        pur_attachments.push(pur_perattachment)
                    }
                })
            }
            const pay_peritem = { expensedescription: expensedescription || '', businesspurpose: businesspurpose || '', category, quantity, unitprice, pur_budgets, pur_attachments };
            pur_allitems.push(pay_peritem);
        })
        console.log('pur_allitems', pur_allitems)
    }
    
    const pur_formdata = {
        pur_fullname, pur_addressline1, pur_addressline2: pur_addressline2 || '', pur_city, pur_state, pur_zipcode, pur_country,
        pur_vendorname, pur_vendoremail: pur_vendoremail || '', pur_vendorphone: pur_vendorphone || '', pur_vendorwebsite: pur_vendorwebsite || '',
        pur_allitems
    }
    console.log('pur_formdata', pur_formdata)
    return { type: SUBMIT_PURCHASEREQUEST, pur_formdata }
}
// getReimbursementForm()
export const rei_changeReimbursedFor = (data) => ({
    type: CHANGE_REIMBURSEMENTFOR,
    data
})
export const rei_changePreferredPaymentMethod = (data) => ({
    type: CHANGE_PREFERREDPAYMENTMETHOD,
    data
})
export const onFinishReimbursementForm = (data) => {
    // Reimbursement · Requester Information
    const { rei_reimbursementfor, rei_requestforself_name, rei_requestforself_affiliation, rei_requestforself_email, rei_individualtobereimbursed } = data;
    // Reimbursement · Delivery Method
    const { rei_preferredpaymentmethod, rei_fullname, rei_addressline1, rei_addressline2, rei_city, rei_state, rei_zipcode, rei_country } = data;
    // Reimbursement · Items
    const { rei_items } = data;
    var rei_allitems = []
    if (rei_items) {
        rei_items.map((rei_item, idx) => {
            const { expensedescription, businesspurpose, category, fullamount, wassalestaxpaid, budget_firstnumber } = rei_item;
            
            var rei_budgets = []; 
            // budget_fisrt
            const { budget_firstamount, budget_firsttask, budget_firstproject, budget_firstoption, budget_rest } = rei_item;
            const rei_budget = { budget_firstnumber, budget_firstamount, budget_firsttask: budget_firsttask || '', budget_firstproject: budget_firstproject || '', budget_firstoption: budget_firstoption || '' }
            rei_budgets.push(rei_budget)
            // budget_rest
            if (budget_rest && budget_rest.length > 0) {
                budget_rest.map((budget_rest_peritem) => {
                    const { budget_restnumbers, budget_restamounts, budget_firsttask, budget_firstproject, budget_firstoption } = budget_rest_peritem;
                    const rei_budget_rest = { budget_restnumbers, budget_restamounts, budget_firsttask: budget_firsttask || '', budget_firstproject: budget_firstproject || '', budget_firstoption: budget_firstoption || '' }
                    rei_budgets.push(rei_budget_rest)
                })
            }
            console.log('rei_budgets', rei_budgets)
            var rei_attachments = [];
            // attachment
            const { attachment } = rei_item;
            if (attachment && attachment.length > 0) {
                attachment.map((att) => {
                    const { name, response } = att; 
                    if (response) {
                        const { url } = response; const rei_perattachment = { name, url };
                        rei_attachments.push(rei_perattachment)
                    }
                })
            }
            const rei_peritem = { expensedescription: expensedescription || '', businesspurpose: businesspurpose || '', category, fullamount, wassalestaxpaid: wassalestaxpaid || '', rei_budgets, rei_attachments };
            rei_allitems.push(rei_peritem);
        })
        console.log('rei_allitems', rei_allitems)
    }
    
    const rei_formdata = {
        rei_reimbursementfor, rei_requestforself_name: rei_requestforself_name || '', rei_requestforself_affiliation: rei_requestforself_affiliation || '', rei_requestforself_email: rei_requestforself_email || '', rei_individualtobereimbursed,
        rei_preferredpaymentmethod, rei_fullname: rei_fullname || '', rei_addressline1: rei_addressline1 || '', rei_addressline2: rei_addressline2 || '', rei_city: rei_city || '', rei_state: rei_state || '', rei_zipcode: rei_zipcode || '', rei_country: rei_country || '',
        rei_allitems
    }
    console.log('rei_formdata', rei_formdata)
    return { type: SUBMIT_REIMBURSEMENT, rei_formdata }
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
