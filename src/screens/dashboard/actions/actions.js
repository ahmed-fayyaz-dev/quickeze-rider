import * as types from '../constants/constants';
import * as commonTypes from '../../../redux/common/constants/constants';

import axios from 'axios';
import {ServerUrl} from '../../../redux/helper/helper';
import {Alert} from 'react-native';

import {deviceInfo, versionCode, success} from '../../../constants';

const getConfig = (data, type, getState) => {
  const companyId = getState().companyIdReducer.data;
  const quarter = getState().quarterReducer.data;
  const fyear = getState().fYearReducer.data;

  return {
    method: 'post',
    url: `${ServerUrl}Home/GetPosDashBoardData`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      vtype: type,
      fyear: fyear,
      quarter: quarter,
      companyID: companyId,
      userID: data?.userID,
      deviceInfo: deviceInfo,
      versionCode: versionCode,
    },
  };
};

//ACTIONS

export function submitGetDashboardData(data) {
  return async (dispatch, getState) => {
    dispatch({type: types.GET_DASHBOARD_DATA_ALL_ATTEMPT});

    try {
      return await axios(getConfig(data, 'CM', getState)).then(function (
        response,
      ) {
        dispatch({
          type: types.GET_DASHBOARD_DATA_ALL_SUCCESS,
          payload: response.data,
        });
        // console.log("RES-CM--", response.data);
        return response.data;
      });
    } catch (error) {
      console.error('error///', error);
      Alert.alert(
        'Error! Get Dashboard action was unsucessfull. ',
        `${error}\n*Reseting default settings`,
      );
      //Reseting Default Settings if API req fail
      dispatch(
        {type: types.GET_DASHBOARD_DATA_ALL_FAIL, payload: error},
        {type: commonTypes.G_DATE, payload: new Date()},
      );

      throw new Error(error);
    }
  };
}
