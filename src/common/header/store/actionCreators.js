export const CHANGE_TO_LOGOUT = 'header/CHANGE_TO_LOGOUT';
export const READ_SU_SELECTED_SUBUNIT_AND_FORM = 'header/READ_SU_SELECTED_SUBUNIT_AND_FORM';

export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})

export const readSu_selectedSubunitANDForm = (unit, subunit, formType) => ({
    type: READ_SU_SELECTED_SUBUNIT_AND_FORM,
    unit,
    subunit,
    formType
})