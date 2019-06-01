import Layout from './layout'
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {LOGIN_DONE, LOGIN_START} from "../../reducers/user-reducer";

/**
 * Ham login request API
 * @returns {function(*=): Promise<any>}
 */
function doLogin() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: LOGIN_START
      })
      // Thực tế là call API ở trong file ApiClient.js
      setTimeout(() => {
        dispatch({
          type: LOGIN_DONE,
          payload: {
            userId: 12,
            userName: 'Khuong Dao',
            userRole: {
              id: 1,
              name: 'Administrator'
            }
          }
        })
        resolve({token: "1234567"})
      }, 2000)
    })
  }
}

const mapStateToProps = state => ({
  errorMessage: state.userReducer.errorMessage,
  loading: state.userReducer.loading,
});
const mapDispatchToProps = {
  doLogin,
}
const LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({form: 'login-form'})(Layout))
export {
  LoginScreen
}
