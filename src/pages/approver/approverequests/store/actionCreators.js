import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'pages/approver/approverequests/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_FORMSFROMAPPROVERNETID = 'pages/approver/approverequests/GET_FORMSFROMAPPROVERNETID';
// getFormTable()
export const SET_FT_SELECTEDDETAILS = 'pages/approver/approverequests/SET_FT_SELECTEDDETAILS';

// **************** Actions ****************
// logout()
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
// componentDidMount()
const getFormsFromApproverNetIdAction = (data) => ({
    type: GET_FORMSFROMAPPROVERNETID,
    data: fromJS(data)
})
export const getFormsFromApproverNetId = (netId) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/form/getFormsFromApproverNetId/${netId}`)
            .then(res => {
                console.log('Pages, approverequests, getFormsFromApproverNetId, res.data', res.data);
                dispatch(getFormsFromApproverNetIdAction(res.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
// getFormTable()
export const directToRequestDetailsPage = (data) => ({
    type: SET_FT_SELECTEDDETAILS,
    data: fromJS(data)
})