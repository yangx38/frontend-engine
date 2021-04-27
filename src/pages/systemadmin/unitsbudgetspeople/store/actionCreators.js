import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_ALL_UNIT_SUBUNIT = 'pages/unitsbudgetspeople/GET_ALL_UNIT_SUBUNIT';
export const CHANGE_TO_LOGOUT = 'pages/unitsbudgetspeople/CHANGE_TO_LOGOUT';
export const SHOW_ADD_MODAL = 'pages/unitsbudgetspeople/SHOW_ADD_MODAL';
export const SHOW_EDIT_MODAL = 'pages/unitsbudgetspeople/SHOW_EDIT_MODAL';
export const CHANGE_SELECTED_SUBUNIT = 'pages/unitsbudgetspeople/CHANGE_SELECTED_SUBUNIT';
export const CHANGE_SELECTED_UNIT = 'pages/unitsbudgetspeople/CHANGE_SELECTED_UNIT';
export const GET_ALL_SUBUNIT = 'pages/unitsbudgetspeople/GET_ALL_SUBUNIT';
export const CHANGE_MODIFY_UNIT_SUBUNIT = 'pages/unitsbudgetspeople/CHANGE_MODIFY_UNIT_SUBUNIT';
export const CLEAR_SELECTED = 'pages/unitsbudgetspeople/CLEAR_SELECTED';
export const HANDLE_CHANGE_PAGE = 'pages/unitsbudgetspeople/HANDLE_CHANGE_PAGE';

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
export const clearSelected = () => ({
    type: CLEAR_SELECTED,
})
const getAllSubunitsAction = (data) => ({
    type: GET_ALL_SUBUNIT,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})
export const getAllSubunits = (selectedUnit) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/systemadmin/getAllSubunits/${selectedUnit}`)
            .then(res => {
                console.log('Pages, unitsbudgetspeople, getAllSubunits, res.data', res.data);
                if (res.data.length > 0) {
                    dispatch(getAllSubunitsAction(res.data[0].children))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const changeSelectedSubunit = (key) => ({
    type: CHANGE_SELECTED_SUBUNIT,
    key
})
export const changeSelectedUnit = (key) => ({
    type: CHANGE_SELECTED_UNIT,
    key
})
export const changeModifyUnitSubunit = (subunitname) => ({
    type: CHANGE_MODIFY_UNIT_SUBUNIT,
    subunitname
})
export const handleChangePage = (page) => ({
    type: HANDLE_CHANGE_PAGE,
    page
})
export const appendSubunit = (modifyUnitSubunitsJS, subunitname, selectedUnit) => {
    return (dispatch) => {
        modifyUnitSubunitsJS.push({key: subunitname, name: subunitname})
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                children: modifyUnitSubunitsJS
            })
        }
        fetch(`http://localhost:8080/api/systemadmin/updateUnitWithSubunits/${selectedUnit}`, options)
            .then(res => {
                dispatch(getAllSubunitsAction(modifyUnitSubunitsJS))
                dispatch(changeModifyUnitSubunit(''))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
