import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'pages/submitter/myrequests/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_FORMSFROMSUBMITTERNETID = 'pages/submitter/myrequests/GET_FORMSFROMSUBMITTERNETID';
// getFormTable()
export const SET_FT_SELECTEDDETAILS = 'pages/submitter/myrequests/SET_FT_SELECTEDDETAILS';
// From SubmitterDetailPage
export const BACK_TO_TABLE = 'pages/submitter/myrequests/BACK_TO_TABLE';

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
                console.log('Pages, myrequests, getFormsFromSubmitterNetId, res.data', res.data);
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
// From SubmitterDetailPage
export const backToTable = () => ({
    type: BACK_TO_TABLE,
})