import React, {Component} from 'react'
import {Card, CardBody, Col, Row, Label, CardHeader} from 'reactstrap'
import {customSuccessMsg, customErrorMsg} from 'helpers/message'
import CustomField from 'components/redux/field'
import {MyNavigator, Auth, ApiClient} from 'AppContext.js'
import {connect} from 'react-redux'
import Validation from 'components/redux/validation'
import {Field, reduxForm, Form} from 'redux-form'
import DatePicker from 'components/redux/datepicker'
import {Facebook} from "react-content-loader"
import './my-profile.scss'

const MyLoader = () => {
  return (
    <Row>
      <Col xs="12" lg="12">
        <Card>
          <CardHeader>
            THÔNG TIN CÁ NHÂN
          </CardHeader>
          <CardBody>
            <Row>
              <Col sm="6">
                <Facebook/>
              </Col>
              <Col sm="6">
                <Facebook/>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col md={12}>
        <Card>
          <CardHeader>
            ĐỔI MẬT KHẨU
          </CardHeader>
          <CardBody>
            <Row>
              <Col sm="6">
                <Facebook/>
              </Col>
              <Col sm="6">
                <Facebook/>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      username: '',
      oldPassHasValue: false,
    }
  }

  componentDidMount() {
    document.title = 'My Profile | Hệ thống Quản lý Online'
  }

  componentWillUnmount() {
    document.title = 'Hệ thống quản lý xe tải VinaTruck'
  }

  render() {
    const {loading, user} = this.props
    return (
      <div className="animated fadeIn m1-form">
        {loading && (
          <div style={{width: '100%', height: 70, margin: 'auto'}}>
            <MyLoader/>
          </div>
        )}
        {!this.state.loading && (
          <Form
            onSubmit={this.props.handleSubmit(data => {
              // CALL API HERE TO SAVE DATA TO BACKEND
            })}
          >
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    THÔNG TIN CÔNG TY
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm={12}>
                        <Row>
                          <Col sm="4">
                            <Row>
                              <Col md="4">
                                <Label htmlFor="email">Tên cty</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Label htmlFor="email" className="font-weight-bold">
                                  {
                                    user.company.name
                                  }
                                </Label>
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="4">
                            <Row>
                              <Col md="4">
                                <Label htmlFor="email">Địa chỉ</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <i className="fa fa-map-marker"/>&nbsp;&nbsp;&nbsp;
                                <Label htmlFor="email" className="font-weight-bold">
                                  {
                                    user.company.address
                                  }
                                </Label>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    THÔNG TIN CÁ NHÂN
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm={12}>
                        <Row>
                          <Col sm="4">
                            <Row>
                              <Col md="12">
                                <Label htmlFor="email">Email</Label>
                              </Col>
                              <Col xs="12" md="12">
                                <Label htmlFor="email" className="font-weight-bold">
                                  {
                                    user.email
                                  }
                                </Label>
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="4">
                            <Row>
                              <Col md="12">
                                <Label htmlFor="email">Username</Label>
                              </Col>
                              <Col xs="12" md="12">
                                <Label htmlFor="email" className="font-weight-bold">
                                  {
                                    user.userName
                                  }
                                </Label>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row className="margin-top-10">
                          <Col sm="4">
                            <Row>
                              <Col md="12">
                                <Label htmlFor="lastName">Họ đệm<span className='input-required'>*</span></Label>
                              </Col>
                              <Col xs="12" md="12">
                                <Field
                                  component={CustomField}
                                  name="lastName"
                                  validate={[Validation.required]}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="4">
                            <Row>
                              <Col md="12">
                                <Label htmlFor="email">Tên<span className='input-required'>*</span></Label>
                              </Col>
                              <Col xs="12" md="12">
                                <Field
                                  component={CustomField}
                                  name="firstName"
                                  validate={[Validation.required]}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="4">
                            <Row>
                              <Col md="12">
                                <Label htmlFor="email">Giới tính</Label>
                              </Col>
                              <Col xs="12" md="12">
                                <Field
                                  component={CustomField}
                                  type="select"
                                  name="gender"
                                >
                                  <option value="1">
                                    Nam
                                  </option>
                                  <option value="0">
                                    Nữ
                                  </option>
                                </Field>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row className="margin-top-10">
                          <Col sm="4">
                            <Row>
                              <Col md="12">
                                <Label htmlFor="email">Ngày sinh</Label>
                              </Col>
                              <Col xs="12" md="12">
                                <Field
                                  component={DatePicker}
                                  type="date"
                                  name="dob"
                                  validate={[Validation.birthday]}
                                  placeholder={'DD/MM/YYYY'}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="4">
                            <Row>
                              <Col md="12">
                                <Label htmlFor="email">Số điện thoại<span className='input-required'>*</span></Label>
                              </Col>
                              <Col xs="12" md="12">
                                <Field
                                  component={CustomField}
                                  name="phoneNumber"
                                  type="number"
                                  validate={[Validation.required, Validation.phoneNumber]}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="4">
                            <Row>
                              <Col md="12">
                                <Label htmlFor="email">Địa chỉ</Label>
                              </Col>
                              <Col xs="12" md="12">
                                <Field
                                  component={CustomField}
                                  name="address"
                                  type="text"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md={12}>
                <Card>
                  <CardHeader>
                    ĐỔI MẬT KHẨU
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm="6">
                        <Row>
                          <Col sm={12}>
                            <Col md="12">
                              <Label htmlFor="email">Mật khẩu cũ</Label>
                            </Col>
                            <Col xs="12" md="12">
                              <Field
                                component={CustomField}
                                name="password"
                                type="password"
                                onChange={(e) => {
                                  this.setState({
                                    oldPassHasValue: !!e.target.value,
                                  })
                                }}
                              />
                            </Col>
                          </Col>
                        </Row>
                        <Row className="margin-top-10">
                          <Col sm={12}>
                            <Col md="12">
                              <Label htmlFor="email">Mật khẩu mới<span className='input-required'>*</span></Label>
                            </Col>
                            <Col xs="12" md="12">
                              <Field
                                component={CustomField}
                                name="passwordNew"
                                type="password"
                                validate={this.state.oldPassHasValue ? [Validation.password, Validation.required] : [Validation.password]}
                              />
                            </Col>
                          </Col>
                        </Row>
                        <Row className="margin-top-10">
                          <Col sm={12}>
                            <Col md="12">
                              <Label htmlFor="email">Nhập lại khẩu mới<span className='input-required'>*</span></Label>
                            </Col>
                            <Col xs="12" md="12">
                              <Field
                                component={CustomField}
                                name="passwordNewAgain"
                                type="password"
                                validate={this.state.oldPassHasValue ? [Validation.password, Validation.required] : [Validation.password]}
                              />
                            </Col>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="margin-top-10">
                      <Col sm={12} className="text-center margin-top-10">
                        <button
                          type="submit" className={'btn btn-primary'}
                        >
                          <i className={'fa fa-save'}/> &nbsp; LƯU LẠI
                        </button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    );
  }
}

const UM = reduxForm({
  form: 'my-profile',
})(MyProfile);
export default connect()(UM);
