import axios from 'axios';
import { fromJS } from 'immutable';

// ****************  Types  ****************
// logout()
export const CHANGE_TO_LOGOUT = 'common/form/CHANGE_TO_LOGOUT';
// componentDidMount()
export const GET_ALL_BUDGET = 'common/form/GET_ALL_BUDGET';


// **************** Actions ****************
// logout()
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
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
// getTravelRequestForm()
