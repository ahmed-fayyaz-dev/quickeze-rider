import { Alert } from 'react-native';
import axios from 'axios';
import * as types from 'src/screens/login/constants/constants';
import { loginConfig } from './config';

export function actionLogin(data) {
    return async dispatch => {
        return axios(loginConfig(data))
            .then(async response => {
                dispatch({
                    type: types.LOGIN_ACCOUNT_SUCCESS,
                    payload: response.data,
                });
                // console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error('error///', error); // Console Log
                Alert.alert('Error! Logging in was unsucessfull', `${error}`);
                throw new Error(error);
            });
    };
}
