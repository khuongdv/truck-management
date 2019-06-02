import Layout from './layout'
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {LOGIN_DONE, LOGIN_FAILED, LOGIN_START} from "../../reducers/user-reducer";
import {login} from "../../helpers/ApiClient";

/**
 * Ham login request API
 * @returns {function(*=): Promise<any>}
 */
function doLogin({username, password}) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_START
    })
    return new Promise((resolve, reject) => {
      login(username, password).then(res => {
        if(res && res.body.status === 1) {
          dispatch({
            type: LOGIN_DONE,
            payload: res.body.user
          })
          resolve(res.body)
        } else {
          dispatch({
            type: LOGIN_FAILED
          })
          reject()
        }
      })
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
