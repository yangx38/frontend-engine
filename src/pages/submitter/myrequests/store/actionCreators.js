import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'pages/approver/approverequests/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_FORMSFROMSUBMITTERNETID = 'pages/approver/approverequests/GET_FORMSFROMSUBMITTERNETID';
// getFormTable()
export const SET_FT_SELECTEDDETAILS = 'pages/approver/approverequests/SET_FT_SELECTEDDETAILS';


// **************** Actions ****************
// logout()
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
// componentDidMount()
const getFormsFromSubmitterNetIdAction = (data) => ({
    type: GET_FORMSFROMSUBMITTERNETID,
    data: fromJS(data)
})
export const getFormsFromSubmitterNetId = (netId) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/form/getFormsFromSubmitterNetId/${netId}`)
            .then(res => {
                console.log('Pages, approverequests, getFormsFromSubmitterNetId, res.data', res.data);
                dispatch(getFormsFromSubmitterNetIdAction(res.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const directToMyRequestDetailsPage = (data) => ({
    type: SET_FT_SELECTEDDETAILS,
    data: fromJS(data)
})