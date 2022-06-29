import * as types from 'src/screens/login/constants/constants';
import { dummyUser } from 'src/screens/login/dummyData';

const initial = {
    loading: false,
    data: {},
    // data: dummyUser,
    error: null,
};
export default function (state = initial, action) {
    switch (action.type) {
        case types.LOGIN_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        default:
            return state;
    }
}
