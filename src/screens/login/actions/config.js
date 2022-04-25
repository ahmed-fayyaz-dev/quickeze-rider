import { deviceInfo, versionCode } from 'src/helpers';
import { ServerUrl } from 'src/redux/helper/helper';

export const loginConfig = data => {
    return {
        method: 'post',
        url: `${ServerUrl}Login/Login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            userName: data?.email,
            password: data?.password,
            userID: 0,
            deviceInfo,
            versionCode,
        },
    };
};
