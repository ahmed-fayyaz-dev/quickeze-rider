import * as types from "../constants/constants";

let initial = {
  loading: false,
  data: null,
  error: null,
};
export default function (state = initial, action) {
  switch (action.type) {
    case types.ADDRESS:
      return { ...state, loading: false, data: action.payload, error: null };
    default:
      return state;
  }
}
