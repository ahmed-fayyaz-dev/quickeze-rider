import { combineReducers } from 'redux';
import commonReducers from '../common/reducers';
import loginReducers from '../../screens/login/reducers';
import dashboardReducers from '../../screens/dashboard/reducers';

const rootReducer = (state, action) => {
  if (action.type === 'RESET_ACTION') {
    return appReducer(undefined, action); // Reseting Redux Store ( LogOut )
  }

  return appReducer(state, action);
};

const appReducer = combineReducers({
  ...commonReducers,
  ...loginReducers,
  ...dashboardReducers,
});

export default rootReducer;
