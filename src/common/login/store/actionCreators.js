import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGIN = 'login/CHANGE_TO_LOGIN';
export const CHANGE_TO_LOGOUT = 'login/CHANGE_TO_LOGOUT';
export const CHANGE_ROLE = 'login/CHANGE_ROLE';
export const CHANGE_SUBMITTER_SUBUNITS_OF_GIVEN_NETID = 'login/CHANGE_SUBMITTER_SUBUNITS_OF_GIVEN_NETID';
export const CHANGE_FISCAL_STAFF_SUBUNITS_OF_GIVEN_NETID = 'login/CHANGE_FISCAL_STAFF_SUBUNITS_OF_GIVEN_NETID';

export const changeLogin = (profile) => ({
    type: CHANGE_TO_LOGIN,
    profile: fromJS(profile)
})
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
var role = '';
var submitterSubunitsOfGivenNetId = [];
var fiscalStaffSubunitsOfGivenNetId = [];
// .then() 
// 如果返回新的Promise, 那么下一级.then()会在新的Promise状态改变之后执行
// 如果返回其他任何值, 则会立即执行下一级.then()
// make sure the sequence is 1, 2, 3
export const initializeUserData = (netId) => {
    role = '';
    return (dispatch) => {
        return checkWhetherUserIsSystemAdministrator(netId)
            .then(res => checkWhetherUserIsFiscalStaffOrSubmitter(netId))
            .then(res => {
                console.log('3 -- role', role)
                console.log('3 -- submitterSubunitsOfGivenNetId', submitterSubunitsOfGivenNetId)
                console.log('3 -- fiscalStaffSubunitsOfGivenNetId', fiscalStaffSubunitsOfGivenNetId)
                dispatch(changeRole(role))
                dispatch(changeSubmitterSubunitsOfGivenNetId(submitterSubunitsOfGivenNetId))
                dispatch(changeFiscalStaffSubunitsOfGivenNetId(fiscalStaffSubunitsOfGivenNetId))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
const checkWhetherUserIsSystemAdministrator = (netId) => {
    return axios.get(`http://localhost:8080/api/login/checkWhetherUserIsSystemAdministrator/${netId}`)
        .then(res => {
            console.log('1 -- checkWhetherUserIsSystemAdministrator', res)
            if (res.data === 1) role = 'system administrator';
        })
        .catch(error => {
            console.log(error)
        })
}
const checkWhetherUserIsFiscalStaffOrSubmitter = (netId) => {
    return axios.get(`http://localhost:8080/api/login/checkWhetherUserIsFiscalStaffOrSubmitter/${netId}`)
        .then(res => {
            console.log('2 -- checkWhetherUserIsFiscalStaffOrSubmitter')
            const submitterSubunitsOfGivenNetIdLength = res.data.submitterSubunitsOfGivenNetId.length;
            const fiscalStaffSubunitsOfGivenNetIdLength = res.data.fiscalStaffSubunitsOfGivenNetId.length;
            if (submitterSubunitsOfGivenNetIdLength > 0) submitterSubunitsOfGivenNetId = res.data.submitterSubunitsOfGivenNetId;
            if (fiscalStaffSubunitsOfGivenNetIdLength > 0) fiscalStaffSubunitsOfGivenNetId = res.data.fiscalStaffSubunitsOfGivenNetId;
            if (role === '') {
                if (fiscalStaffSubunitsOfGivenNetIdLength > 0) role = 'fiscal staff'
                else if (submitterSubunitsOfGivenNetIdLength > 0) role = 'submitter'
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
const changeSubmitterSubunitsOfGivenNetId = (data) => ({
    type: CHANGE_SUBMITTER_SUBUNITS_OF_GIVEN_NETID,
    data: fromJS(data)
})
const changeFiscalStaffSubunitsOfGivenNetId = (data) => ({
    type: CHANGE_FISCAL_STAFF_SUBUNITS_OF_GIVEN_NETID,
    data: fromJS(data)
})