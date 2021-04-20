import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGIN = 'login/CHANGE_TO_LOGIN';
export const CHANGE_TO_LOGOUT = 'login/CHANGE_TO_LOGOUT';

export const changeLogin = (profile) => ({
    type: CHANGE_TO_LOGIN,
    profile: fromJS(profile)
})
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})