import { LOGIN, LOGIN_ERROR, LOGIN_EXITO, ALERT, RELOGIN, LOGOUT } from "../types";

const initialState = {
  user: {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
  },
  usuarios: [],
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_EXITO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case RELOGIN:
      return {
        ...state,
        loading: false,
        user:{ ...state.user, user:action.payload}
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
        localStorage.setItem("token", null);
        return{
            initialState
        }
    default:
      return state;
  }
}
