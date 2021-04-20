import axios from 'axios';
import { fromJS } from 'immutable';

var role = '';

export const CHANGE_TO_LOGIN = 'login/CHANGE_TO_LOGIN';
export const CHANGE_TO_LOGOUT = 'login/CHANGE_TO_LOGOUT';
export const CHANGE_ROLE = 'login/CHANGE_ROLE';

export const changeLogin = (profile) => ({
    type: CHANGE_TO_LOGIN,
    profile: fromJS(profile)
})
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
const changeRole = (role) => ({
    type: CHANGE_ROLE,
    role
})
export const initializeUserData = (netId) => {
    return (dispatch) => {
        return checkWhetherUserIsSystemAdministrator(netId)
            .then(res => {
                role = '';
                console.log('Login, initializeUserData, res', res) 
                console.log('1 -- checkWhetherUserIsSystemAdministrator', res) 
                if (res === 1) role = 'system administrator';
            })
            //.then(res => getSubunitListAsFiscalStaff(netId)) // TODO: need to check whether fiscal staff
            // .then(res => getSubunitListAsApprover(netId)) // 
            .then(res => {
                console.log('4 -- role', role)
                dispatch(changeRole(role))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
const checkWhetherUserIsSystemAdministrator = (netId) => {
    return axios.get(`http://localhost:8080/api/checkWhetherUserIsSystemAdministrator/${netId}`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            console.log(error)
        })
}