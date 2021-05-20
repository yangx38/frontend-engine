import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGIN = 'login/CHANGE_TO_LOGIN';
export const CHANGE_TO_LOGOUT = 'login/CHANGE_TO_LOGOUT';
export const CHANGE_ROLE = 'login/CHANGE_ROLE';
export const CHANGE_FISCAL_STAFF_UNITS_OF_GIVEN_NETID = 'login/CHANGE_FISCAL_STAFF_UNITS_OF_GIVEN_NETID';
export const CHANGE_APPROVER_BUDGET_NUMBERS_OF_GIVEN_NETID = 'login/CHANGE_APPROVER_BUDGET_NUMBERS_OF_GIVEN_NETID';
export const CHANGE_SUBMITTER_SUBUNITS_OF_GIVEN_NETID = 'login/CHANGE_SUBMITTER_SUBUNITS_OF_GIVEN_NETID';

export const changeLogin = (profile) => ({
    type: CHANGE_TO_LOGIN,
    profile: fromJS(profile)
})
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
var role = '';
var fiscalStaffUnitsOfGivenNetId = [];
var approverBudgetNumberssOfGivenNetId = [];
var submitterSubunitsOfGivenNetId = [];
// .then() 
// 如果返回新的Promise, 那么下一级.then()会在新的Promise状态改变之后执行
// 如果返回其他任何值, 则会立即执行下一级.then()
// make sure the sequence is 1, 2, 3
export const initializeUserData = (netId) => {
    role = '';
    fiscalStaffUnitsOfGivenNetId = [];
    approverBudgetNumberssOfGivenNetId = [];
    submitterSubunitsOfGivenNetId = [];
    return (dispatch) => {
        return checkWhetherUserIsSystemAdministrator(netId)
            .then(res => checkWhetherUserIsFiscalStaff(netId))
            .then(res => checkWhetherUserIsApprover(netId))
            .then(res => checkWhetherUserIsSubmitter(netId))
            .then(res => {
                console.log('4 -- role', role)
                console.log('4 -- submitterSubunitsOfGivenNetId', submitterSubunitsOfGivenNetId)
                console.log('4 -- approverBudgetNumberssOfGivenNetId', approverBudgetNumberssOfGivenNetId)
                console.log('4 -- fiscalStaffSubunitsOfGivenNetId', fiscalStaffUnitsOfGivenNetId)
                dispatch(changeRole(role))
                dispatch(changeFiscalStaffUnitsOfGivenNetId(fiscalStaffUnitsOfGivenNetId))
                dispatch(changeApproverBudgetNumberssOfGivenNetId(approverBudgetNumberssOfGivenNetId))
                dispatch(changeSubmitterSubunitsOfGivenNetId(submitterSubunitsOfGivenNetId))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
const checkWhetherUserIsSystemAdministrator = (netId) => {
    return axios.get(`http://localhost:8080/api/login/checkWhetherUserIsSystemAdministrator/${netId}`)
        .then(res => {
            console.log('1 -- checkWhetherUserIsSystemAdministrator', res.data)
            if (res.data === 1) role = 'system administrator';
        })
        .catch(error => {
            console.log(error)
        })
}
const checkWhetherUserIsFiscalStaff = (netId) => {
    return axios.get(`http://localhost:8080/api/login/checkWhetherUserIsFiscalStaff/${netId}`)
        .then(res => {
            console.log('2 -- checkWhetherUserIsFiscalStaff', res.data)
            const fiscalStaffUnitsOfGivenNetIdLength = res.data.fiscalStaffUnitsOfGivenNetId.length;
            if (fiscalStaffUnitsOfGivenNetIdLength > 0) fiscalStaffUnitsOfGivenNetId = res.data.fiscalStaffUnitsOfGivenNetId;
            if (role === '') {
                if (fiscalStaffUnitsOfGivenNetIdLength > 0) role = 'fiscal staff'
            }
        })
        .catch(error => {
            console.log(error)
        })
}
const checkWhetherUserIsApprover = (netId) => {
    return axios.get(`http://localhost:8080/api/login/checkWhetherUserIsApprover/${netId}`)
        .then(res => {
            console.log('3 -- checkWhetherUserIsApprover', res.data)
            const approverBudgetNumberssOfGivenNetIdLength = res.data.approverBudgetNumberssOfGivenNetId.length;
            if (approverBudgetNumberssOfGivenNetIdLength > 0) approverBudgetNumberssOfGivenNetId = res.data.approverBudgetNumberssOfGivenNetId;
            if (role === '') {
                if (approverBudgetNumberssOfGivenNetIdLength > 0) role = 'approver'
            }
        })
        .catch(error => {
            console.log(error)
        })
}
const checkWhetherUserIsSubmitter = (netId) => {
    return axios.get(`http://localhost:8080/api/login/checkWhetherUserIsSubmitter/${netId}`)
        .then(res => {
            console.log('4 -- checkWhetherUserIsSubmitter', res.data)
            const submitterSubunitsOfGivenNetIdLength = res.data.submitterSubunitsOfGivenNetId.length;
            if (submitterSubunitsOfGivenNetIdLength > 0) submitterSubunitsOfGivenNetId = res.data.submitterSubunitsOfGivenNetId;
            if (role === '') {
                if (submitterSubunitsOfGivenNetIdLength > 0) role = 'submitter'
            }
        })
        .catch(error => {
            console.log(error)
        })
}
const changeRole = (role) => ({
    type: CHANGE_ROLE,
    role
})
const changeFiscalStaffUnitsOfGivenNetId = (data) => ({
    type: CHANGE_FISCAL_STAFF_UNITS_OF_GIVEN_NETID,
    data: fromJS(data)
})
const changeApproverBudgetNumberssOfGivenNetId = (data) => ({
    type: CHANGE_APPROVER_BUDGET_NUMBERS_OF_GIVEN_NETID,
    data: fromJS(data)
})
const changeSubmitterSubunitsOfGivenNetId = (data) => ({
    type: CHANGE_SUBMITTER_SUBUNITS_OF_GIVEN_NETID,
    data: fromJS(data)
})