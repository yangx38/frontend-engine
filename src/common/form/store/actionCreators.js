import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'common/form/CHANGE_TO_LOGOUT';
export const SET_CONFIRMMODAL = 'common/form/SET_CONFIRMMODAL';
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
export const SUBMIT_TRAVELREQUEST = 'common/form/SUBMIT_TRAVELREQUEST';
// getTravelReimbursementForm()
export const CHANGE_REIMBURSEBEFORE = 'common/form/CHANGE_REIMBURSEBEFORE';
export const CHANGE_REQUESTFORSELF = 'common/form/CHANGE_REQUESTFORSELF';
export const CHANGE_WHTHERCITIZEN = 'common/form/CHANGE_WHTHERCITIZEN';
export const CHANGE_WHETHERPERSONALTRAVELINCLUDE = 'common/form/CHANGE_WHETHERPERSONALTRAVELINCLUDE';
export const CHANGE_CLAIMMEALPERDIEM = 'common/form/CHANGE_CLAIMMEALPERDIEM';
export const CHANGE_WASMEALPROVIDED = 'common/form/CHANGE_WASMEALPROVIDED';
export const SUBMIT_TRAVELREIMBURSEMENT = 'common/form/SUBMIT_TRAVELREIMBURSEMENT';

// **************** Actions ****************
// logout()
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
export const setConfirmModal = () => ({
    type: SET_CONFIRMMODAL
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
            const pay_budget = { budget_number: budget_firstnumber, budget_amount: budget_firstamount, budget_task: budget_firsttask || '', budget_project: budget_firstproject || '', budget_option: budget_firstoption || '' }
            pay_budgets.push(pay_budget)
            // budget_rest
            if (budget_rest && budget_rest.length > 0) {
                budget_rest.map((budget_rest_peritem) => {
                    const { budget_restnumbers, budget_restamounts, budget_firsttask, budget_firstproject, budget_firstoption } = budget_rest_peritem;
                    const pay_budget_rest = { budget_number: budget_restnumbers, budget_amount: budget_restamounts, budget_task: budget_firsttask || '', budget_project: budget_firstproject || '', budget_option: budget_firstoption || '' }
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
            const pro_budget = { budget_number: budget_firstnumber, budget_amount: budget_firstamount, budget_task: budget_firsttask || '', budget_project: budget_firstproject || '', budget_option: budget_firstoption || '' }
            pro_budgets.push(pro_budget)
            // budget_rest
            if (budget_rest && budget_rest.length > 0) {
                budget_rest.map((budget_rest_peritem) => {
                    const { budget_restnumbers, budget_restamounts, budget_firsttask, budget_firstproject, budget_firstoption } = budget_rest_peritem;
                    const pro_budget_rest = { budget_number: budget_restnumbers, budget_amount: budget_restamounts, budget_task: budget_firsttask || '', budget_project: budget_firstproject || '', budget_option: budget_firstoption || '' }
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
            const pur_budget = { budget_number: budget_firstnumber, budget_amount: budget_firstamount, budget_task: budget_firsttask || '', budget_project: budget_firstproject || '', budget_option: budget_firstoption || '' }
            pur_budgets.push(pur_budget)
            // budget_rest
            if (budget_rest && budget_rest.length > 0) {
                budget_rest.map((budget_rest_peritem) => {
                    const { budget_restnumbers, budget_restamounts, budget_firsttask, budget_firstproject, budget_firstoption } = budget_rest_peritem;
                    const pur_budget_rest = { budget_number: budget_restnumbers, budget_amount: budget_restamounts, budget_task: budget_firsttask || '', budget_project: budget_firstproject || '', budget_option: budget_firstoption || '' }
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
            const rei_budget = { budget_number: budget_firstnumber, budget_amount: budget_firstamount, budget_task: budget_firsttask || '', budget_project: budget_firstproject || '', budget_option: budget_firstoption || '' }
            rei_budgets.push(rei_budget)
            // budget_rest
            if (budget_rest && budget_rest.length > 0) {
                budget_rest.map((budget_rest_peritem) => {
                    const { budget_restnumbers, budget_restamounts, budget_firsttask, budget_firstproject, budget_firstoption } = budget_rest_peritem;
                    const rei_budget_rest = { budget_number: budget_restnumbers, budget_amount: budget_restamounts, budget_task: budget_firsttask || '', budget_project: budget_firstproject || '', budget_option: budget_firstoption || '' }
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
export const onFinishTravelRequestForm = (data) => {
    // Travel Request · Travel Information
    const { tra_legalfirstname, tra_legallastname, tra_departure, tra_destination, tra_departingreturningdate, tra_reason } = data;
    const tra_departingdate = tra_departingreturningdate[0]._d.toString().substring(0, 15);
    const tra_returning = tra_departingreturningdate[1]._d.toString().substring(0, 15);
    // budgets
    const { tra_budget_firstnumber, tra_budget_firstamount, tra_budget_firsttask, tra_budget_firstoption, tra_budget_firstproject } = data;
    var tra_budgets = []
    const tra_budget = { budget_number: tra_budget_firstnumber, budget_amount: tra_budget_firstamount, budget_task: tra_budget_firsttask || '', budget_option: tra_budget_firstoption || '', budget_project: tra_budget_firstproject || '' }
    tra_budgets.push(tra_budget)
    const { tra_budget_rest } = data;
    if (tra_budget_rest && tra_budget_rest.length > 0) {
        tra_budget_rest.map((budget_rest_peritem) => {
            const { budget_restnumbers, budget_restamounts, budget_task, budget_project, budget_option } = budget_rest_peritem;
            const budget_rest = { budget_number: budget_restnumbers, budget_amount: budget_restamounts, budget_task: budget_task || '', budget_project: budget_project || '', budget_option: budget_option || '' }
            tra_budgets.push(budget_rest)
        })
    }
    // Would you like unit to pay the flight?
    const { tra_whetherunitpayflight } = data;
    var tra_unitpayflight = {};
    if (tra_whetherunitpayflight === 'Yes') {
        const { tra_birthday, tra_airline, tra_flightnumber, tra_flightfrom, tra_flightto, tra_unitpayflight_departingreturningdate, tra_unitpayflight_amount, tra_flightreference } = data;
        const tra_unitpayflight_birthday = tra_birthday._d.toString().substring(0, 15);
        var tra_unitpayflight_departingdate = '';
        var tra_unitpayflight_returningdate = '';
        if (tra_unitpayflight_departingreturningdate) {
            tra_unitpayflight_departingdate = tra_unitpayflight_departingreturningdate[0]._d.toString().substring(0, 15);
            tra_unitpayflight_returningdate = tra_unitpayflight_departingreturningdate[1]._d.toString().substring(0, 15);
        }
        tra_unitpayflight = { tra_unitpayflight_birthday, tra_airline: tra_airline || '', tra_flightnumber: tra_flightnumber || '', tra_flightfrom: tra_flightfrom || '', tra_flightto: tra_flightto || '', tra_unitpayflight_departingdate: tra_unitpayflight_departingdate || '', tra_unitpayflight_returningdate: tra_unitpayflight_returningdate || '', tra_unitpayflight_amount: tra_unitpayflight_amount || '', tra_flightreference: tra_flightreference || '' }
    }
    // Would you like unit to pay the hotel?
    const { tra_whetherunitpayhotel } = data;
    var tra_unitpayhotel = {};
    if (tra_whetherunitpayhotel == 'Yes') {
        const { tra_hotelname, tra_unitpayhotel_address, tra_unitpayhotel_numberofpeople, tra_unitpayhotel_zip, tra_unitpayhotel_checkincheckoutdate, tra_unitpayhotel_amount, tra_unitpayhotel_link, tra_unitpayhotel_hotelnote } = data;
        var tra_unitpayhotel_checkkindate = '';
        var tra_unitpayhotel_checkoutdate = '';
        if (tra_unitpayhotel_checkincheckoutdate) {
            tra_unitpayhotel_checkkindate = tra_unitpayhotel_checkincheckoutdate[0]._d.toString().substring(0, 15);
            tra_unitpayhotel_checkoutdate = tra_unitpayhotel_checkincheckoutdate[1]._d.toString().substring(0, 15);
        }
        tra_unitpayhotel = { tra_hotelname: tra_hotelname || '', tra_unitpayhotel_address: tra_unitpayhotel_address || '', tra_unitpayhotel_numberofpeople: tra_unitpayhotel_numberofpeople || '', tra_unitpayhotel_zip: tra_unitpayhotel_zip || '', tra_unitpayhotel_checkkindate: tra_unitpayhotel_checkkindate || '', tra_unitpayhotel_checkoutdate: tra_unitpayhotel_checkoutdate || '',  tra_unitpayhotel_amount: tra_unitpayhotel_amount || '', tra_unitpayhotel_link: tra_unitpayhotel_link || '', tra_unitpayhotel_hotelnote: tra_unitpayhotel_hotelnote || '' };
    }

    const tra_formdata = {
        tra_legalfirstname, tra_legallastname, tra_departure, tra_destination, tra_departingdate, tra_returning, tra_reason,
        tra_budgets,
        tra_whetherunitpayflight, tra_unitpayflight,
        tra_whetherunitpayhotel, tra_unitpayhotel,
    }
    console.log('tra_formdata', tra_formdata)
    return { type: SUBMIT_TRAVELREQUEST, tra_formdata }
}
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
export const onFinishTravelReimbursementForm = (data) => {
    // Travel Reimbursement · Travel Reimbursement
    const { trarei_reimbursedbefore, trarei_referencenumber, trarei_requestforself, trarei_requestforself_name, trarei_requestforself_affiliation, trarei_requestforself_email } = data;
    // budgets
    const { trarei_budget_firstnumber, trarei_budget_firstamount, trarei_budget_firsttask, trarei_budget_firstoption, trarei_budget_firstproject } = data;
    var trarei_budgets = []
    const trarei_budget = { budget_number: trarei_budget_firstnumber, budget_amount: trarei_budget_firstamount, budget_task: trarei_budget_firsttask || '', budget_option: trarei_budget_firstoption || '', budget_project: trarei_budget_firstproject || '' }
    trarei_budgets.push(trarei_budget)
    const { trarei_budget_rest } = data;
    if (trarei_budget_rest && trarei_budget_rest.length > 0) {
        trarei_budget_rest.map((budget_rest_peritem) => {
            const { budget_restnumbers, budget_restamounts, budget_task, budget_project, budget_option } = budget_rest_peritem;
            const budget_rest = { budget_number: budget_restnumbers, budget_amount: budget_restamounts, budget_task: budget_task || '', budget_project: budget_project || '', budget_option: budget_option || '' }
            trarei_budgets.push(budget_rest)
        })
    }
    //  US Citizen or Permanent Resident?
    const { trarei_whethercitizen, trarei_whethercitizen_passport, trarei_whethercitizen_i94 } = data;
    var trarei_passport = [];
    if (trarei_whethercitizen_passport && trarei_whethercitizen_passport.length > 0) {
        trarei_whethercitizen_passport.map((att) => {
            const { name, response } = att; 
            if (response) {
                const { url } = response; const trarei_perattachment = { name, url };
                trarei_passport.push(trarei_perattachment)
            }
        })
    }
    var trarei_i94 = [];
    if (trarei_whethercitizen_i94 && trarei_whethercitizen_i94.length > 0) {
        trarei_whethercitizen_i94.map((att) => {
            const { name, response } = att; 
            if (response) {
                const { url } = response; const trarei_attachment_i94 = { name, url };
                trarei_i94.push(trarei_attachment_i94)
            }
        })
    }
    // Purpose of Travel
    const { trarei_purposeoftravel } = data;
    // Was personal travel included?
    const { trarein_whetherpersontravelinclude, trarei_departingreturningtime } = data;
    var trarei_departingtime = '';
    var trarei_returningtime = '';
    if (trarei_departingreturningtime) {
        trarei_departingtime = trarei_departingreturningtime[0]._d.toString().substring(0, 21);
        trarei_returningtime = trarei_departingreturningtime[1]._d.toString().substring(0, 21);
    }
    // Travel Reimbursement · Travel Costs
    // Service
    const { trarei_category, trarei_amount, trarei_attachment } = data;
    var trarei_cat_attachment = [];
    if (trarei_attachment && trarei_attachment.length > 0) {
        trarei_attachment.map((att) => {
            const { name, response } = att; 
            if (response) {
                const { url } = response; const trarei_cat_att = { name, url };
                trarei_cat_attachment.push(trarei_cat_att)
            }
        })
    }
    var trarei_services = [];
    const trarei_service = { category: trarei_category, amount: trarei_amount, attachment: trarei_cat_attachment };
    trarei_services.push(trarei_service);
    const { trarei_category_rest } = data;
    if (trarei_category_rest && trarei_category_rest.length > 0) {
        trarei_category_rest.map((cat_rest_peritem) => {
            const { category, amount, attachment} = cat_rest_peritem;
            var trarei_map_attachment = [];
            if (attachment && attachment.length > 0) {
                attachment.map((att) => {
                    const { name, response } = att; 
                    if (response) {
                        const { url } = response; const trarei_cat_att = { name, url };
                        trarei_map_attachment.push(trarei_cat_att)
                    }
                })
            }
            const trarei_rest = { category, amount, attachment: trarei_map_attachment };
            trarei_services.push(trarei_rest);
        })
    }
    // Meal Per Diem
    // Are you claiming meal per diem?
    const { trarei_whetherclaimmealperdiem, trarei_date_date, trarei_date_checkbox, trarei_meal_amount } = data;
    var trarei_date_datespec = '';
    if (trarei_date_date) {
        trarei_date_datespec = trarei_date_date._d.toString().substring(0, 15);
    }
    var trarei_claimingmeals = [];
    if (trarei_whetherclaimmealperdiem === 'Yes, specifc days and meals') {
        const trarei_claimingmeal = { date: trarei_date_datespec, meal: trarei_date_checkbox }
        trarei_claimingmeals.push(trarei_claimingmeal);
        const { trarei_date_rest } = data;
        if (trarei_date_rest && trarei_date_rest.length > 0) {
            trarei_date_rest.map((date_rest_peritem) => {
                const { date_restname, date_checkbox } = date_rest_peritem;
                var date_restname_val = '';
                if (date_restname) {
                    date_restname_val = date_restname._d.toString().substring(0, 15);
                }
                const date_rest = { date: date_restname_val || '', meal: date_checkbox || ''}
                trarei_claimingmeals.push(date_rest);
            })
        }
    }
    // Were meals provided to you?
    const { trarei_weremealprovided, trarei_mealdate_date, trarei_mealdate_checkbox } = data;
    var trarei_mealdate_datespec = '';
    if (trarei_mealdate_date) {
        trarei_mealdate_datespec = trarei_mealdate_date._d.toString().substring(0, 15);
    }
    var trarei_weremealprovided_arr = [];
    if (trarei_weremealprovided === 'Yes') {
        const trarei_weremeal = { date: trarei_mealdate_datespec, meal: trarei_mealdate_checkbox }
        trarei_weremealprovided_arr.push(trarei_weremeal);
        const { trarei_mealdate_rest } = data;
        if (trarei_mealdate_rest && trarei_mealdate_rest.length > 0) {
            trarei_mealdate_rest.map((date_rest_peritem) => {
                const { date_restname, date_checkbox } = date_rest_peritem;
                var date_restname_val = '';
                if (date_restname) {
                    date_restname_val = date_restname._d.toString().substring(0, 15);
                }
                const date_rest = { date: date_restname_val || '', meal: date_checkbox || ''}
                trarei_weremealprovided_arr.push(date_rest);
            })
        }
    }

    const trarei_formdata = {
        trarei_reimbursedbefore, trarei_referencenumber: trarei_referencenumber || '', trarei_requestforself, trarei_requestforself_name: trarei_requestforself_name || '', trarei_requestforself_affiliation: trarei_requestforself_affiliation || '', trarei_requestforself_email: trarei_requestforself_email || '',
        trarei_budgets,
        trarei_whethercitizen, trarei_passport, trarei_i94,
        trarei_purposeoftravel,
        trarein_whetherpersontravelinclude, trarei_departingtime: trarei_departingtime || '', trarei_returningtime: trarei_returningtime || '',
        trarei_services,
        trarei_whetherclaimmealperdiem, trarei_claimingmeals, trarei_meal_amount: trarei_meal_amount || '',
        trarei_weremealprovided, trarei_weremealprovided_arr
    }
    console.log('trareiformdata', trarei_formdata)
    return { type: SUBMIT_TRAVELREIMBURSEMENT, trarei_formdata }
}
var receipt_number = '';
// getConfirmModal()
export const submitForm = (netId, formType, unit, subunit, form_data, budgets) => {
    const timestamp = new Date(Date.now());
    const data = {
        'form_creator_netId': netId,
        'form_type': formType,
        'form_unit': unit,
        'form_subunit': subunit,
        form_data,
        'created_time': timestamp,
        // 'approvers_number_left': budgets.length,
        'status': 'under review'
    }
    receipt_number = '';
    return (dispatch) => {
        return createOneForm(data)
            .then(res => {
                budgets.map((budget) => {
                    const { budget_number, budget_amount } = budget;
                    const budgetnumber = budget_number.split(' - ')[0];
                    updateApproversOnForm(budgetnumber, budget_amount, receipt_number)
                })
            })
            .then(res => {
                //dispatch(changeFiscalStaffUnitsOfGivenNetId(fiscalStaffUnitsOfGivenNetId))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
const createOneForm = (data) => {
    const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    return fetch(`http://localhost:8080/api/form/createOneForm`, options)
        .then(res => res.json())
        .then(res => {
            console.log('1 -- receipt_number', res)
            receipt_number = res;
        })
        .catch(error => {
            console.log(error)
        })
}
const updateApproversOnForm = (budgetnumber, budget_amount, receipt_number) => {
    const data = { budgetnumber, budgetamount: budget_amount, receipt_number };
    const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    console.log('2 -- budget', data)
    return fetch(`http://localhost:8080/api/form/updateApproversOnForm`, options)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
}
