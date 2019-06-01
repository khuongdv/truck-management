import Layout from './layout'
import {connect} from "react-redux"

const mapStateToProps = state => ({
  errorMessage: state.userReducer.errorMessage,
  loading: state.userReducer.loading,
  user: state.userReducer.user || {userRole: {}, company: {}},
});
const mapDispatchToProps = {}

const MyProfile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout)
export default MyProfile
