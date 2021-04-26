import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_ALL_UNIT_SUBUNIT = 'pages/unitsbudgetspeople/GET_ALL_UNIT_SUBUNIT';
export const CHANGE_TO_LOGOUT = 'pages/unitsbudgetspeople/CHANGE_TO_LOGOUT';
export const SHOW_ADD_MODAL = 'pages/unitsbudgetspeople/SHOW_ADD_MODAL';
export const SHOW_EDIT_MODAL = 'pages/unitsbudgetspeople/SHOW_EDIT_MODAL';
export const CHANGE_SELECTED_SUBUNIT = 'pages/unitsbudgetspeople/CHANGE_SELECTED_SUBUNIT';
export const CHANGE_SELECTED_UNIT = 'pages/unitsbudgetspeople/CHANGE_SELECTED_UNIT';

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
// getUnitSubunitTable()
export const showAddModal = (visible) => ({
    type: SHOW_ADD_MODAL,
    visible
})
export const showEditModal = (visible) => ({
    type: SHOW_EDIT_MODAL,
    visible
})
export const changeSelectedSubunit = (key) => ({
    type: CHANGE_SELECTED_SUBUNIT,
    key
})
export const changeSelectedUnit = (key) => ({
    type: CHANGE_SELECTED_UNIT,
    key
})