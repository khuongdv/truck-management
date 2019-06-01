import Auth from 'helpers/auth'
import history from './helpers/m-history'
import AP from 'helpers/ApiClient'
import Utils from 'helpers/utils'
import CustomField from 'components/redux/field'
import AsyncSelect from 'components/redux/asyncSelect'
import DatePicker from 'components/redux/datepicker'
import routes from './routes'


const MyNavigator = {
  navigateTo: (path) => history.push(path)
}
const ApiClient = new AP()
export {
  Auth, MyNavigator, ApiClient, Utils, history, CustomField, AsyncSelect, DatePicker, routes
}
