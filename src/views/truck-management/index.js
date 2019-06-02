import Layout from './layout'
import {connect} from 'react-redux'
import {GET_TRUCK_DONE, GET_TRUCK_FAILED, GET_TRUCK_START} from "../../reducers/truck-reducer";
import {ApiClient} from "../../AppContext";

function getTruckByPage() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: GET_TRUCK_START,
      })
      ApiClient.get('/trucks').then(res => {
        console.log(res);
        dispatch({
          type: GET_TRUCK_DONE,
          payload: {
            truckList: res || []
          }
        })
        resolve()
      }).catch(exx => {
        dispatch({
          type: GET_TRUCK_FAILED
        })
        reject()
      })
    })
  }
}


const mapStateToProps = (state) => ({
  truckList: state.truckReducer.truckList || [],
  loading: state.truckReducer.loading || false,
})
const TruckMan = connect(mapStateToProps, {getTruckByPage})(Layout)

export default TruckMan
