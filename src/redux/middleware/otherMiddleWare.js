/* eslint-disable no-unused-vars */
import axios from 'axios';
import { batch } from 'react-redux';
import { ID, PASSWORD, ONBOARD } from 'src/appConstants';
import { removeStorageItem } from 'src/helpers';
import * as types from 'src/redux/common/constants/constants';
import * as loginTypes from 'src/screens/login/constants/constants';
import { setSentryConfig } from './sentry';

// setAuthToken
function setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const saveOnLogin = store => next => async action => {
    if (action.type === loginTypes.LOGIN_ACCOUNT_SUCCESS) {
        // const { dispatch, getState } = store;

        batch(() => {
            setToken(action.payload.access_token);
            setSentryConfig(action.payload);
        });
    }

    return next(action);
};

export const clearOnLogout = store => next => async action => {
    if (action.type === types.RESET_ACTION) {
        await removeStorageItem(ID);
        await removeStorageItem(PASSWORD);
        await removeStorageItem(ONBOARD);
    }

    return next(action);
};
