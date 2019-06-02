import Layout from './layout'
import {connect} from 'react-redux'
import {GET_TRUCK_DONE, GET_TRUCK_FAILED, GET_TRUCK_START} from "../../reducers/truck-reducer";
import {ApiClient} from "../../AppContext";

function getTruckByPage(pageIndex, pageSize, plate, sort, sortOrder) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: GET_TRUCK_START,
      })
      const params = {
        _limit: pageSize || 10,
        _page: pageIndex || 1,
        plate: plate ? plate : undefined,
        _sort: sort ? sort : undefined,
        _order: sortOrder ? sortOrder : 'desc',
      }
      ApiClient.get('/trucks', {params}).then(res => {
        dispatch({
          type: GET_TRUCK_DONE,
          payload: {
            truckList: res.data || [],
            pageSize: res.pageSize || 10,
            pageIndex: res.pageIndex || 1,
            total: res.total || 0,
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
  pageSize: state.truckReducer.pageSize || 10,
  pageIndex: state.truckReducer.pageIndex || 1,
  total: state.truckReducer.total || 0,
  loading: state.truckReducer.loading || false,
})
const TruckMan = connect(mapStateToProps, {getTruckByPage})(Layout)

export default TruckMan
