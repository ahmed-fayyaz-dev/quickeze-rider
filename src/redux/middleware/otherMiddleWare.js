import axios from 'axios';
import { setSentryConfig } from './sentry';

// setAuthToken
function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const saveOnLogin = (store) => (next) => async (action) => {
  if (action.type === 'LOGIN_ACCOUNT_SUCCESS') {
    const { dispatch, getState } = store;

    setToken(action.payload.access_token);
    setSentryConfig(action.payload);
  }
  return next(action);
};
