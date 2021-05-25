import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'pages/approver/approverequests/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_FORMSFROMAPPROVERNETID = 'pages/approver/approverequests/GET_FORMSFROMAPPROVERNETID';
// getFormTable()
export const SET_FT_SELECTEDDETAILS = 'pages/approver/approverequests/SET_FT_SELECTEDDETAILS';
// From ApproverDetailPage
export const SELECT_BUDGET = 'pages/approver/approverequests/SELECT_BUDGET';
export const BACK_TO_TABLE = 'pages/approver/approverequests/BACK_TO_TABLE';
export const APPROVE_SELECTEDBUDGET = 'pages/approver/approverequests/APPROVE_SELECTEDBUDGET';
export const DECLINE_SELECTEDBUDGET = 'pages/approver/approverequests/DECLINE_SELECTEDBUDGET';

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
// From ApproverDetailPage
export const selectBudget = (idx) => ({
    type: SELECT_BUDGET,
    idx
})
export const backToTable = () => ({
    type: BACK_TO_TABLE,
})
export const onFinishCommentApproveAction = (comment, idx, netId, timestamp) => ({
    type: APPROVE_SELECTEDBUDGET,
    comment, 
    idx,
    netId,
    timestamp
})
export const onFinishCommentApprove = (values, idx, netId, _id) => {
    const { comment } = values;
    const timestamp = new Date(Date.now()).toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'comment': comment, 'approver_comment_time': timestamp})
        }
        fetch(`http://localhost:8080/api/form/approveAnBudget/${_id}/${idx}/${netId}`, options)
            .then(res => {
                console.log(res)
                dispatch(onFinishCommentApproveAction(comment, idx, netId, timestamp))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const onFinishCommentDeclineAction = (comment, idx, netId, timestamp) => ({
    type: DECLINE_SELECTEDBUDGET,
    comment, 
    idx,
    netId,
    timestamp
})
export const onFinishCommentDecline = (values, idx, netId, _id) => {
    const { comment } = values;
    const timestamp = new Date(Date.now()).toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'comment': comment, 'approver_comment_time': timestamp})
        }
        fetch(`http://localhost:8080/api/form/declineAnBudget/${_id}/${idx}/${netId}`, options)
            .then(res => {
                console.log(res)
                dispatch(onFinishCommentDeclineAction(comment, idx, netId, timestamp))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}