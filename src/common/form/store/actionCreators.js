export const CHANGE_TO_LOGOUT = 'common/form/CHANGE_TO_LOGOUT';
// getTravelRequestForm()
export const UPDATE_FIRSTNAME = 'common/form/UPDATE_FIRSTNAME';
export const UPDATE_LASTNAME = 'common/form/UPDATE_LASTNAME';
export const UPDATE_DEPARTURE = 'common/form/UPDATE_DEPARTURE';
export const UPDATE_DESTINATION = 'common/form/UPDATE_DESTINATION';
export const UPDATE_DEPARTING_AND_RETURNING_TIME = 'common/form/UPDATE_DEPARTING_AND_RETURNING_TIME';
export const UPDATE_REASON = 'common/form/UPDATE_REASON';

export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
// getTravelRequestForm()
export const updateFirstName = (value) => ({
    type: UPDATE_FIRSTNAME,
    value
})
export const updateLastName = (value) => ({
    type: UPDATE_LASTNAME,
    value
})
export const updateDeparture = (value) => ({
    type: UPDATE_DEPARTURE,
    value
})
export const updateDestination = (value) => ({
    type: UPDATE_DESTINATION,
    value
})
export const updateDepartingAndReturningTime = (value) => ({
    type: UPDATE_DEPARTING_AND_RETURNING_TIME,
    value
})
export const updateReason = (value) => ({
    type: UPDATE_REASON,
    value
})