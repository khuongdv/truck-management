import React, {Component} from 'react';
import {Button, Card, CardBody, CardGroup, Col, Container, Row} from 'reactstrap';
import {MyNavigator, Auth} from 'AppContext.js'
import bgLogin from 'assets/img/login-background.jpg';
import bgLoginPlaceholder from 'assets/img/login-background-blur.jpg';
import Loading from 'components/loading';
import './login.scss';
import {Field, Form} from 'redux-form'
import CustomField from 'components/redux/field'
import Validation from 'components/redux/validation'
import {ToastContainer} from 'react-toastify';
import {customErrorMsg} from 'helpers/message'
import {customSuccessMsg} from "../../helpers/message";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    document.title = 'Đăng nhập | Hệ thống quản lý xe tải VinaTruck'
  }

  componentWillUnmount() {
    document.title = 'Hệ thống quản lý xe tải VinaTruck'
  }

  componentDidMount() {
    if (Auth.isLogin()) {
      MyNavigator.navigateTo('/dashboard');
    }
  }

  doLogin = (data) => {
    this.props.doLogin(data)
      .then(response => {
        customSuccessMsg({message: 'Đăng nhập thành công'})
        Auth.settoken(response.token || "12345678");
        MyNavigator.navigateTo('/');
      })
      .catch(ex => {
        customErrorMsg({message: 'Sai thông tin đăng nhập. Vui lòng xem lại.'})
      });
  };

  render() {
    const {loading} = this.props
    return (
      <div className="app flex-row align-items-center">
        <ToastContainer toastClassName="toast-container" position={'top-center'}/>
        {loading && <Loading/>}
        <img src={bgLogin} alt=""
             width={1} height={1}
             onLoad={() => {
               let x = document.getElementById('background-imgne')
               if (x) {
                 x.src = bgLogin
                 x.style.filter = 'none'
               }
             }}
        />
        <img
          id={'background-imgne'}
          src={bgLoginPlaceholder}
          style={{
            filter: 'blur(3px)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: 1,
            opacity: 0.4,
            userSelect: 'none',
            objectFit: 'cover',
          }}
        />
        <Container className="loginBackground">
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.props.handleSubmit((data) => {
                      this.doLogin(data)
                    })}>
                      <h1>ĐĂNG NHẬP</h1>
                      <p className="text-muted">
                        Đăng nhập vào hệ thống <b>QUẢN LÝ XE TẢI</b>
                      </p>
                      <Row>
                        <Col md="12">
                          <Field
                            component={CustomField}
                            validate={[Validation.username, Validation.required]}
                            type="text"
                            name="username"
                            placeholder={'Username'}
                          />
                        </Col>
                      </Row>
                      <Row className="margin-top-10">
                        <Col md="12">
                          <Field
                            component={CustomField}
                            validate={[Validation.required]}
                            type="password"
                            name="password"
                            placeholder={'Mật khẩu'}
                          />
                        </Col>
                      </Row>
                      <Row className="margin-top-10">
                        <Col xs="6">
                          <button type="submit" className="btn btn-primary">
                            ĐĂNG NHẬP &nbsp;
                            <i className="fa fa-arrow-right"/>
                          </button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button
                            color="link"
                            className="px-0"
                            type="button"
                            onClick={() => {
                              MyNavigator.navigateTo('/forget-password');
                            }}
                          >
                            Quên mật khẩu?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginScreen
