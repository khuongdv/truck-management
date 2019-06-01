import Layout from './layout'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  truckList: state.truckReducer.truckList || [],
  loading: state.truckReducer.loading || false,
})
const TruckMan = connect(mapStateToProps, null)(Layout)

export default TruckMan
