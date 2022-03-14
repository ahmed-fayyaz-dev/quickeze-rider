import * as types from "../constants/constants";
import { Appearance } from "react-native";

let initial = {
  loading: false,
  data: Appearance.getColorScheme(),
  error: null,
};
export default function (state = initial, action) {
  switch (action.type) {
    case types.APP_APPEARANCE:
      return { ...state, loading: false, data: action.payload, error: null };
    default:
      return state;
  }
}
