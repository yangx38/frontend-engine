import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'pages/fiscalstaff/approverequests/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_FORMSFROMFISCALSTAFFNETID = 'pages/fiscalstaff/approverequests/GET_FORMSFROMFISCALSTAFFNETID';
// getFormTable()
export const SET_FT_SELECTEDDETAILS = 'pages/fiscalstaff/approverequests/SET_FT_SELECTEDDETAILS';
// From FiscalStaffDetailPage
export const BACK_TO_TABLE = 'pages/fiscalstaff/approverequests/BACK_TO_TABLE';

// **************** Actions ****************
// logout()
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
// componentDidMount()
const getFormsFromFiscalStaffNetIdAction = (data) => ({
    type: GET_FORMSFROMFISCALSTAFFNETID,
    data: fromJS(data)
})
export const getFormsFromFiscalStaffNetId = (netId) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/form/getFormsFromFiscalStaffNetId/${netId}`)
            .then(res => {
                console.log('Pages, approverequests, getFormsFromFiscalStaffNetId, res.data', res.data);
                dispatch(getFormsFromFiscalStaffNetIdAction(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
            
    }
}
// getFormTable()
export const directToRequestDetailsPage = (data) => ({
    type: SET_FT_SELECTEDDETAILS,
    data: fromJS(data)
})
// From FiscalStaffDetailPage
export const backToTable = () => ({
    type: BACK_TO_TABLE,
})