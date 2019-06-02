import React from 'react';
import {ModalBody, ModalFooter, Button, Form, Row, Col, Card, CardBody, CardHeader, Label} from 'reactstrap';
import CModal from 'components/modal';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import CustomField from 'components/redux/field';
import Validation from 'components/redux/validation';
import {connect} from 'react-redux';
import {ApiClient} from 'AppContext.js';
import {customSuccessMsg} from 'helpers/message'
import Loading from 'components/loading'
import './layout.scss';
import {createNumberMask} from 'redux-form-input-masks'
import {AsyncSelect} from "../../AppContext";
import {customErrorMsg} from "../../helpers/message";
import dayjs from "dayjs";

const currencyMask = createNumberMask({
  prefix: '',
  suffix: '',
  decimalPlaces: 0,
  locale: 'vi-VN',
})

class AddEditTruck extends React.Component {
  submit = form => {
    const payload = form
    if (!this.props.modalObj) {
      this.creatNewTruck(payload)
    } else {
      payload.id = this.props.modalObj.id
      this.updateTruck(payload)
    }
  };
  updateTruck = (payload) => {
    ApiClient.put('/trucks/' + payload.id, {
      data: payload
    }).then((res) => {
      customSuccessMsg({message: 'Cập nhật xe tải thành công.'})
      this.props.onClose()
    }).catch(ex => {
      customErrorMsg({message: 'Lỗi xảy ra khi cập nhật xe tải'})
    })
  }
  creatNewTruck = (payload) => {
    ApiClient.post('/trucks', {
      data: payload
    }).then((res) => {
      customSuccessMsg({message: 'Thêm mới xe tải thành công.'})
      this.props.onClose()
    }).catch(Ex => {
      customErrorMsg({message: 'Lỗi xảy ra khi thêm mới xe tải'})
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }


  render() {
    let {onClose, handleSubmit, modalObj} = this.props;
    return (
      <CModal title={!!modalObj ? 'Cập nhật Truck' : 'Thêm mới Truck'}
              onClose={onClose}
              className={"add-edit-modal"}
      >
        {this.state.loading ? <Loading/> : null}
        <div>
          <Form onSubmit={handleSubmit(form => this.submit(form))} className="form-horizontal">
            <ModalBody>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Biển số<span
                        className='input-required'>*</span></Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={CustomField}
                        validate={[Validation.required, Validation.truckPlate]}
                        type="text"
                        name="plate"
                        disabled={!!modalObj}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Giá xe<span
                        className='input-required'>*</span></Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={CustomField}
                        validate={[Validation.gt0, Validation.required]}
                        type="tel"
                        name="price"
                        {...currencyMask}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Cargo Type<span
                        className='input-required'>*</span></Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={AsyncSelect}
                        getOptionLabel={({name}) => name}
                        validate={[Validation.required, Validation.selectMaxTen]}
                        getOptionValue={({id}) => id}
                        url="/cargo-types"
                        mappingFunc={res => res}
                        name="cargoType"
                        searchKey="name"
                        isMulti
                        placeholder="- Chọn -"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Tài xế<span
                        className='input-required'>*</span></Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={AsyncSelect}
                        getOptionLabel={({name}) => name}
                        validate={[Validation.required]}
                        getOptionValue={({id}) => id}
                        url="/drivers"
                        mappingFunc={res => res}
                        name="driver"
                        searchKey="name"
                        placeholder="- Chọn -"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Trọng tải<span
                        className='input-required'>*</span></Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={CustomField}
                        name="truckType"
                        type="select"
                        validate={[Validation.comboboxRequired]}
                      >
                        <option value="">-- Chọn --</option>
                        <option value="5">5 tấn</option>
                        <option value="10">10 tấn</option>
                        <option value="20">20 tấn</option>
                      </Field>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Production Year<span
                        className='input-required'>*</span></Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={CustomField}
                        name="productionYear"
                        type="select"
                        validate={[Validation.comboboxRequired]}
                      >
                        <option value="">-- Chọn --</option>
                        {
                          (() => {
                            const thisYear = dayjs().year()
                            const ret = []
                            for (let i = 0; i < 10; i++) {
                              const curr = thisYear - i
                              ret.push(
                                <option value={curr}>{curr}</option>
                              )
                            }
                            return ret
                          })()
                        }
                      </Field>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Kích thước (L-W-H)<span
                        className='input-required'>*</span></Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={CustomField}
                        name="dimensions"
                        type="text"
                        placeholder={'Ví dụ: 15-2-2 (đơn vị mét)'}
                        validate={[Validation.required, Validation.dimension]}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Trạng thái<span
                        className='input-required'>*</span></Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={CustomField}
                        name="status"
                        type="select"
                        validate={[Validation.comboboxRequired]}
                      >
                        <option value="">-- Chọn --</option>
                        <option value="1">Đang sử dụng</option>
                        <option value="2">Xe mới</option>
                        <option value="0">Dừng hoạt động</option>
                      </Field>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Địa chỉ đỗ xe</Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={CustomField}
                        validate={[Validation.maxLength500]}
                        type="textarea"
                        rows={5}
                        name="parkingAddress"
                      />
                      <div
                        className={this.props.parkingAddress.length > 500 ? "input-required text-right" : "text-right"}>
                        {this.props.parkingAddress.length}/500
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md="12">
                      <Label htmlFor="text-input">Mô tả</Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Field
                        component={CustomField}
                        validate={[Validation.maxLength200]}
                        rows={5}
                        type="textarea"
                        name="description"
                      />
                      <div className={this.props.description.length > 200 ? "input-required text-right" : "text-right"}>
                        {this.props.description.length}/200
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                <i className="fa fa-save"/>
                &nbsp;LƯU LẠI
              </Button>
            </ModalFooter>
          </Form>
        </div>
      </CModal>
    );
  }
}

let formSelector = formValueSelector('add-edit-truck-dialog');
const TheDIALOG = reduxForm({
  form: 'add-edit-truck-dialog',
})(AddEditTruck);

export default connect((state, props) => {
  let modalObj = props.modalObj || {}
  return {
    initialValues: {
      ...modalObj
    },
    parkingAddress: formSelector(state, 'parkingAddress') || '',
    description: formSelector(state, 'description') || '',
  }
})(TheDIALOG)

