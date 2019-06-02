export const GET_TRUCK_START = 'GET_TRUCK_START';
export const GET_TRUCK_DONE = 'GET_TRUCK_DONE';
export const GET_TRUCK_FAILED = 'GET_TRUCK_FAILED';

export default function userReducer(state = {loading: false}, {type, payload, errorMessage}) {
  switch (type) {
    case GET_TRUCK_START:
      return {
        ...state,
        loading: true,
      };
    case GET_TRUCK_DONE:
      return {
        ...state,
        loading: false,
        ...payload,
        errorMessage,
      };
    case GET_TRUCK_FAILED:
      return {
        ...state,
        loading: false,
        truckList: [],
      };
    default:
      return state;
  }
}
