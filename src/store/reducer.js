import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from '../common/login/store';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as formReducer } from '../common/form/store';
import { reducer as fiscalStaffApproveRequestsReducer } from '../pages/fiscalstaff/approverequests/store';
import { reducer as approverApproveRequestsReducer } from '../pages/approver/approverequests/store';
import { reducer as submitterMyRequestsReducer } from '../pages/submitter/myrequests/store';
import { reducer as SysmtemAdminUnitsBudgetsPeopleReducer } from '../pages/systemadmin/unitsbudgetspeople/store';

const reducer = combineReducers({
    login: loginReducer,
    header: headerReducer,
    form: formReducer,
    fiscalstaff_approverequests: fiscalStaffApproveRequestsReducer,
    approver_approverequests: approverApproveRequestsReducer,
    submitter_myrequests: submitterMyRequestsReducer,
    systemadmin_unitsbudgetspeople: SysmtemAdminUnitsBudgetsPeopleReducer
})

export default reducer;