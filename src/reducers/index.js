import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from './user-reducer'

const makeRootReducer = asyncReducers => {
  return combineReducers({
    userReducer,
    form: formReducer,
    ...asyncReducers
  })
}

export default makeRootReducer
