export const LOGIN_START = 'LOGIN_START';
export const LOGIN_DONE = 'LOGIN_DONE';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const GET_MY_INFO_START = 'GET_MY_INFO_START';
export const GET_MY_INFO_DONE = 'GET_MY_INFO_DONE';

export default function userReducer(state = { loading: false }, { type, payload, errorMessage, userRole }) {
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_DONE:
      return {
        ...state,
        loading: false,
        user: payload,
        userRole,
        errorMessage,
      };
    case GET_MY_INFO_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        user: {},
        errorMessage,
      };
    case GET_MY_INFO_DONE:
      return {
        ...state,
        loading: false,
        user: payload,
      }
    default:
      return state;
  }
}
