import React from 'react'
import {Table, Card, CardHeader, CardBody, Row, Col} from 'reactstrap'
import CModal from './add-edit-truck'
import Pagination from '../../components/pagination';
import {reduxForm, Field, Form} from 'redux-form'
import queryString from 'query-string'
import {MyNavigator, Utils, CustomField} from "../../AppContext";
import './layout.scss'

class TruckMan extends React.Component {
  state = {
    showModal: false,
    modalObj: null,
  }

  componentDidMount() {
    this.loadData(this.props.location.search);
  }

  showModal = (truck) => {
    this.setState({
      showModal: true,
      modalObj: truck,
    })
  }

  onPageChange = p => {
    let {location} = this.props;
    let params = queryString.parse(location.search);
    params.pageIndex = p;
    let url = queryString.stringify(params);
    MyNavigator.navigateTo(`/truck-management?${url}`);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.loadData(nextProps.location.search);
    }
  }

  loadData = search => {
    let params = queryString.parse(search);
    this.props.getTruckByPage(params.pageIndex, params.pageSize, params.plate, params.sort, params.sortOrder)
  };
  toggleSortField = (field) => {
    let params = queryString.parse(this.props.location.search);
    let direction = params.sortOrder || 'asc'
    if (field === params.sort) {
      // Change direction
      direction = direction === 'asc' ? 'desc' : 'asc'
    }
    params.sort = field
    params.sortOrder = direction
    let url = queryString.stringify(params);
    MyNavigator.navigateTo(`/truck-management?${url}`);
  }
  render() {
    const {truckList, total, pageSize} = this.props
    const {showModal} = this.state
    let params = queryString.parse(this.props.location.search);
    let pageIndex = params.pageIndex || 1
    console.log(pageIndex, pageSize, total)
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-list"/>DANH SÁCH XE TẢI
          <div className="card-header-actions">
            <a href="javascript:void(0) " onClick={() => this.showModal()} className="card-header-action btn btn-add ">
              <i className="fa fa-plus"/>
              &nbsp; THÊM MỚI
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <Form
              style={{marginBottom: 10}}
              onSubmit={this.props.handleSubmit((data) => {
                let params = queryString.parse(this.props.location.search);
                params.plate = data.plate ? data.plate.trim() : undefined;
                params.pageIndex = 1;
                params.sort = 'price';
                params.sortOrder = 'desc';
                let url = queryString.stringify(params);
                MyNavigator.navigateTo(`/truck-management?${url}`);
              })}
              className={'form-search-resident-form'}
            >
              <Row>
                <Col sm={3}>
                  <Field
                    component={CustomField}
                    type="text"
                    name="plate"
                    placeholder={'Biển số'}
                  />
                </Col>
                <Col sm={6}>
                  <button
                    type="submit"
                    className={'btn btn-primary'}>
                    <i className={'fa fa-search'}/> TÌM KIẾM
                  </button>
                </Col>
              </Row>
            </Form>
          </div>
          <Table responsive striped hover bordered>
            <thead>
            <tr>
              <th>STT</th>
              <th
                onClick={() => {
                  this.toggleSortField('plate')
                }}
                className="cursor-pointer">Truck Plate&nbsp;<i className="fa fa-sort"/></th>
              <th>Cargo Type</th>
              <th>Driver</th>
              <th
                onClick={() => {
                  this.toggleSortField('truckType')
                }}
                className="cursor-pointer">Truck type&nbsp;<i className="fa fa-sort"/></th>
              <th
                onClick={() => {
                  this.toggleSortField('price')
                }}
                className="cursor-pointer">Price &nbsp;<i className="fa fa-sort"/>
              </th>
              <th>Dimension (L-W-H)</th>
              <th>Parking Address</th>
              <th
                onClick={() => {
                  this.toggleSortField('productionYear')
                }}
                className="cursor-pointer">Production in Year&nbsp;<i className="fa fa-sort"/></th>
              <th
                onClick={() => {
                  this.toggleSortField('status')
                }}
                className="cursor-pointer">Status&nbsp;<i className="fa fa-sort"/></th>
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
          <div>
            <Pagination pageSize={pageSize} total={total} page={pageIndex} onPageChange={this.onPageChange}/>
          </div>
          {showModal && <CModal
            onClose={() => {
              this.setState({
                showModal: false,
                modalObj: null,
              })
              this.loadData(this.props.location.search)
            }} modalObj={this.state.modalObj}
          />}
        </CardBody>
      </Card>
    )
  }
}


export default reduxForm({form: 'truck-man'})(TruckMan)
