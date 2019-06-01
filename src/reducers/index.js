import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from './user-reducer'
import truckReducer from './truck-reducer'

const makeRootReducer = asyncReducers => {
  return combineReducers({
    userReducer,
    truckReducer,
    form: formReducer,
    ...asyncReducers
  })
}

export default makeRootReducer
