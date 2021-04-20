import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from '../common/login/store';
import { reducer as SysmtemAdminUnitsBudgetsPeopleReducer } from '../pages/systemadmin/unitsbudgetspeople/store';

const reducer = combineReducers({
    login: loginReducer,
    systemadmin_unitsbudgetspeople: SysmtemAdminUnitsBudgetsPeopleReducer
})

export default reducer;