import React from 'react'
import {Table, Card, CardHeader, CardBody} from 'reactstrap'
import './layout.scss'

class TruckMan extends React.Component {
  render() {
    const {truckList} = this.props
    return (
      <Card>
        <CardHeader>
          DANH SÁCH XE TẢI
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
                    <td>{truck.a}</td>
                    <td>{truck.b}</td>
                    <td>{truck.c}</td>
                    <td>{truck.d}</td>
                    <td>{truck.e}</td>
                    <td>{truck.f}</td>
                    <td>{truck.g}</td>
                    <td>{truck.h}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}


export default TruckMan
