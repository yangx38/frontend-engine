import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'pages/unitsbudgetspeople/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_ALL_UNIT_SUBUNIT = 'pages/unitsbudgetspeople/GET_ALL_UNIT_SUBUNIT';
export const GET_ALL_PEOPLE = 'pages/unitsbudgetspeople/GET_ALL_PEOPLE';
export const GET_ALL_BUDGETS = 'pages/unitsbudgetspeople/GET_ALL_BUDGETS';
export const CHANGE_UST_SELECTED_SUBUNIT = 'pages/unitsbudgetspeople/CHANGE_UST_SELECTED_SUBUNIT';
export const CHANGE_UST_SELECTED_UNIT = 'pages/unitsbudgetspeople/CHANGE_UST_SELECTED_UNIT';
export const SHOW_UST_EDIT_MODAL = 'pages/unitsbudgetspeople/SHOW_UST_EDIT_MODAL';

// **************** Actions ****************
// logout()
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
// componentDidMount()
const getAllUnitSubunitAction = (data) => ({
    type: GET_ALL_UNIT_SUBUNIT,
    data: fromJS(data)
})
export const getAllUnitSubunit = () => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/systemadmin/getAllUnitSubunit`)
            .then(res => {
                console.log('Pages, unitsbudgetspeople, getAllUnitSubunit, res.data', res.data);
                dispatch(getAllUnitSubunitAction(res.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
var allPeople = [];
const getAllPeopleAction = (data) => ({
    type: GET_ALL_PEOPLE,
    data: fromJS(data)
})
export const getAllPeople = () => {
    allPeople = [];
    return (dispatch) => {
        return getAllSubmitters()
            .then(res => getAllFiscalStaffs())
            .then(res => {
                dispatch(getAllPeopleAction(allPeople))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
const getAllSubmitters = () => {
    return axios.get(`http://localhost:8080/api/systemadmin/getAllSubmitter`)
        .then(res => {
            if (res.data.length > 0) allPeople = allPeople.concat(res.data);
        })
        .catch(error => {
            console.log(error)
        })
}
const getAllFiscalStaffs = () => {
    return axios.get(`http://localhost:8080/api/systemadmin/getAllFiscalStaff`)
        .then(res => {
            if (res.data.length > 0) allPeople = allPeople.concat(res.data);
        })
        .catch(error => {
            console.log(error)
        })
}
const getAllBudgetsAction = (data) => ({
    type: GET_ALL_BUDGETS,
    data: fromJS(data)
})
export const getAllBudgets = () => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/systemadmin/getAllBudgets`)
            .then(res => {
                console.log('Pages, unitsbudgetspeople, getAllBudgets, res.data', res.data);
                const allBudgetsJS = res.data;
                var allBudgets_ForTable = [];
                allBudgetsJS.map(budget => {
                    const { approvers, budgetnumber, budgetname, startdate, enddate, key } = budget;
                    var renamedApprover = [];
                    approvers.map(approver => {
                        const { name, netId, amount, key } = approver;
                        var newAmount = '';
                        if (amount === -1) newAmount = 'infinity';
                        else newAmount = amount;
                        renamedApprover.push({ 'budgetnumber': name, 'budgetname': netId, 'startdate': newAmount, 'key': key })
                    })
                    allBudgets_ForTable.push({ 'children': renamedApprover, 'budgetnumber': budgetnumber, 'budgetname': budgetname, 'startdate': startdate, 'enddate': enddate, 'key': key })
                })
                dispatch(getAllBudgetsAction(allBudgets_ForTable))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
// getUnitSubunitTable()
const changePTfromSelectedUnitAction = (unitname, allPeopleOfUnit) => ({
    type: CHANGE_UST_SELECTED_UNIT,
    unitname,
    data: fromJS(allPeopleOfUnit)
})
export const changePTfromSelectedUnit = (unitname, pt_allpeople_unchangedJS) => {
    return (dispatch) => {
        var allPeopleOfUnit = [];
        pt_allpeople_unchangedJS.map((people) => {
            const { unit } = people;
            if (unit === unitname) allPeopleOfUnit.push(people);
        })
        dispatch(changePTfromSelectedUnitAction(unitname, allPeopleOfUnit))
    }
}
const changePTfromSelectedSubunitAction = (subunitname, allPeopleOfSubunit) => ({
    type: CHANGE_UST_SELECTED_SUBUNIT,
    subunitname,
    data: fromJS(allPeopleOfSubunit)
})
export const changePTfromSelectedSubunit = (subunitname, pt_allpeople_unchangedJS) => {
    return (dispatch) => {
        var allPeopleOfSubunit = [];
        const subunitname_short = subunitname.split('@')[0];
        pt_allpeople_unchangedJS.map((people) => {
            const { subunit } = people;
            if (subunit === subunitname_short) allPeopleOfSubunit.push(people);
        })
        dispatch(changePTfromSelectedSubunitAction(subunitname, allPeopleOfSubunit))
    }
}
export const showUSTEditModal = (data) => ({
    type: SHOW_UST_EDIT_MODAL,
    data
})
