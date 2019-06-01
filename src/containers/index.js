import D from './DefaultLayout';
import {GET_MY_INFO_START, GET_MY_INFO_DONE} from "../reducers/user-reducer";
import {connect} from "react-redux";

function getMyInfo() {
  return (dispatch) => {
    return new Promise(resolve => {
      dispatch({
        type: GET_MY_INFO_START,
      })
      setTimeout(() => {
        dispatch({
          type: GET_MY_INFO_DONE,
          payload: {
            userId: 12,
            userName: 'Khuong Dao',
            email: 'minh.khuong1306@gmail.com',
            company: {
              name: 'LINE VN',
              address: 'Hanoi, Vietnam',
            },
            userRole: {
              id: 1,
              name: 'Administrator'
            }
          }
        })
      }, 2000)
      resolve({})
    })
  }
}

const mapStateToProps = state => ({
  errorMessage: state.userReducer.errorMessage,
  loading: state.userReducer.loading || false,
  user: state.userReducer.user || {},
});
const mapDispatchToProps = {
  getMyInfo,
}

const DefaultLayout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(D)
export {DefaultLayout};
