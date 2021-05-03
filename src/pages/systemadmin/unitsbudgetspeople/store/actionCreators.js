import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGOUT = 'pages/unitsbudgetspeople/CHANGE_TO_LOGOUT';
export const GET_ALL_UNIT_SUBUNIT = 'pages/unitsbudgetspeople/GET_ALL_UNIT_SUBUNIT';
export const GET_ALL_PEOPLE = 'pages/unitsbudgetspeople/GET_ALL_PEOPLE';
export const CHANGE_UST_SELECTED_SUBUNIT = 'pages/unitsbudgetspeople/CHANGE_UST_SELECTED_SUBUNIT';
export const CHANGE_UST_SELECTED_UNIT = 'pages/unitsbudgetspeople/CHANGE_UST_SELECTED_UNIT';
export const SHOW_UST_EDIT_MODAL = 'pages/unitsbudgetspeople/SHOW_UST_EDIT_MODAL';

// logout()
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
const getAllPeopleAction = (data) => ({
    type: GET_ALL_PEOPLE,
    data: fromJS(data)
})
export const getAllPeople = () => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/systemadmin/getAllPeople`)
            .then(res => {
                console.log('Pages, unitsbudgetspeople, getAllPeople, res.data', res.data);
                dispatch(getAllPeopleAction(res.data));
            })
            .catch(error => {
                console.log(error)
            })
    }
}
// getUnitSubunitTable()
export const changeUSTSelectedSubunit = (data) => ({
    type: CHANGE_UST_SELECTED_SUBUNIT,
    data
})
export const changeUSTSelectedUnit = (data) => ({
    type: CHANGE_UST_SELECTED_UNIT,
    data
})
export const changePTfromSelectedUnit = (unitname) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/systemadmin/getPeople/${unitname}`)
            .then(res => {
                console.log('Pages, unitsbudgetspeople, getPeople, res.data', res.data);
                dispatch(getAllPeopleAction(res.data));
            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const showUSTEditModal = (data) => ({
    type: SHOW_UST_EDIT_MODAL,
    data
})
