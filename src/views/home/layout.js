import React from 'react'
import {Card, CardHeader, CardBody, Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap'
import dayjs from "dayjs";
import Activity from './activity'
import activities from './activities.js'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('componentDidMount', "HOMESCREEN")
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm={3}>
            <Card>
              <CardBody className="text-center">
                <div>
                  TỔNG SỐ XE IN-USE
                </div>
                <div className="font-weight-bold text-primary">90</div>
                <div style={{fontSize: 11, marginTop: 20}}>
                  Last Update: {dayjs().format('HH:mm:ss DD/MM/YYYY')}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm={3}>
            <Card>
              <CardBody className="text-center">
                <div>
                  SỐ CHUYẾN HÀNG THÁNG 6
                </div>
                <div className="font-weight-bold text-success">120</div>
                <div style={{fontSize: 11, marginTop: 20}}>
                  Last Update: {dayjs().format('HH:mm:ss DD/MM/YYYY')}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm={3}>
            <Card>
              <CardBody className="text-center">
                <div>
                  TIỀN HÀNG THÁNG 6
                </div>
                <div className="font-weight-bold text-primary">91.000.000 VNĐ</div>
                <div style={{fontSize: 11, marginTop: 20}}>
                  Last Update: {dayjs().format('HH:mm:ss DD/MM/YYYY')}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm={3}>
            <Card>
              <CardBody className="text-center">
                <div>
                  NỢ CHƯA THU THÁNG 6
                </div>
                <div className="font-weight-bold text-warning">13.000.000 VNĐ</div>
                <div style={{fontSize: 11, marginTop: 20}}>
                  Last Update: {dayjs().format('HH:mm:ss DD/MM/YYYY')}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-history"/> Hoạt động gần đây
              </CardHeader>
              <CardBody style={{maxHeight: '50vh', overflowX: 'scroll'}}>
                {activities.map((el) => <Activity key={el.id} {...el} />)}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default HomeScreen
