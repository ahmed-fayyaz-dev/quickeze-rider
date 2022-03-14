import axios from 'axios';
import { Alert } from 'react-native';
import * as types from '../constants/constants';
import { ServerUrl } from '../../../redux/helper/helper';
import { deviceInfo, versionCode } from '../../../constants';

export function submitLoginAccount(data) {
  return async (dispatch) => {
    dispatch({ type: types.LOGIN_ACCOUNT_ATTEMPT });

    const config = {
      method: 'post',
      url: `${ServerUrl}Login/Login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userName: data.email,
        password: data.password,
        userID: 0,
        deviceInfo,
        versionCode,
      },
    };

    return axios(config)
      .then(async (response) => {
        dispatch({
          type: types.LOGIN_ACCOUNT_SUCCESS,
          payload: response.data,
        });
        // console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('error///', error); // Console Log
        Alert.alert('Error! Logging in was unsucessfull', `${error}`);
        dispatch({ type: types.LOGIN_ACCOUNT_FAIL, payload: error });
        throw new Error(error);
      });
  };
}
