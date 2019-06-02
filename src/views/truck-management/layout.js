import React from 'react'
import {Table, Card, CardHeader, CardBody} from 'reactstrap'
import CModal from './add-edit-truck'
import './layout.scss'
import {Utils} from "../../AppContext";

class TruckMan extends React.Component {
  state = {
    showModal: false,
    modalObj: null,
  }

  componentDidMount() {
    this.props.getTruckByPage()
  }

  showModal = (truck) => {
    this.setState({
      showModal: true,
      modalObj: truck,
    })
  }

  render() {
    const {truckList} = this.props
    const {showModal} = this.state
    return (
      <Card>
        <CardHeader>
          DANH SÁCH XE TẢI
          <div className="card-header-actions">
            <a href="javascript:void(0) " onClick={() => this.showModal()} className="card-header-action btn btn-add ">
              <i className="fa fa-plus"/>
              &nbsp; THÊM MỚI
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <Table responsive striped hover bordered>
            <thead>
            <tr>
              <th>STT</th>
              <th>Truck Plate</th>
              <th>Cargo Type</th>
              <th>Driver</th>
              <th>Truck type</th>
              <th>Price</th>
              <th>Dimension (L-W-H)</th>
              <th>Parking Address</th>
              <th>Production in Year</th>
              <th>Status</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
              !truckList.length ? (
                <tr>
                  <td colSpan={12}>NO DATA</td>
                </tr>
              ) : null
            }
            {
              truckList.map((truck, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{truck.plate}</td>
                    <td>{truck.cargoType ? truck.cargoType.map(ct => ct.name).join(', ') : '--'}</td>
                    <td>{truck.driver ? truck.driver.name : '--'}</td>
                    <td>{truck.truckType} Ton</td>
                    <td>{Utils.formatNumber(truck.price)}</td>
                    <td>{truck.dimensions}</td>
                    <td>{truck.parkingAddress}</td>
                    <td>{truck.productionYear}</td>
                    <td>
                      {
                        [
                          <span className="badge badge-danger">Stopped</span>,
                          <span className="badge badge-success">In Use</span>,
                          <span className="badge badge-primary">New</span>,
                        ][truck.status]
                      }
                    </td>
                    <td>{truck.description}</td>
                    <td>
                      <button
                        type={"button"}
                        onClick={() => {
                          this.showModal(truck)
                        }}
                        className="btn btn-link">
                        <i className="fa fa-pencil"></i>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </Table>
          {showModal && <CModal
            onClose={() => {
              this.setState({
                showModal: false,
                modalObj: null,
              })
              this.props.getTruckByPage()
            }} modalObj={this.state.modalObj}
          />}
        </CardBody>
      </Card>
    )
  }
}


export default TruckMan
