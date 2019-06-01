import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import PropTypes from 'prop-types';
import {MyNavigator, Auth} from 'AppContext.js';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from 'assets/img/logo.svg';
import sygnet from 'assets/img/sygnet.svg';
import {customErrorMsg} from "../../helpers/message";
import {logout} from "../../helpers/ApiClient";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // eslint-disable-next-line
        const user = this.props.user || {userRole: {}}

        return (
            <React.Fragment>
                {/* <ToastContainer toastClassName="toast-container"/> */}
                <AppSidebarToggler className="d-lg-none" display="md" mobile/>
                <span
                    style={{cursor: 'pointer'}}
                    title={'Trở về Trang Chủ'}
                    onClick={(e) => {
                        e.preventDefault()
                        MyNavigator.navigateTo('/dashboard')
                    }}
                >
                    <AppNavbarBrand
                        full={{src: logo, width: 89, height: 25, alt: 'Truck LOGO'}}
                        minimized={{src: sygnet, width: 30, height: 30, alt: 'Truck LOGO'}}
                    />
                </span>
                <AppSidebarToggler className="d-md-down-none" display="lg"/>

                <Nav className="ml-auto" navbar style={{paddingRight: 20}}>
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav style={{textAlign: 'left'}}>
                            <span style={{fontWeight: 'bold', display: 'block'}}>
                                {
                                    user.userName
                                }
                            </span>
                            <span
                                style={{
                                    padding: '2px 4px 2px 4px',
                                    backgroundColor: 'green',
                                    borderRadius: 3,
                                    color: 'white',
                                    fontSize: 11,
                                }}>
                                {
                                    user.userRole ? user.userRole.name : '--'
                                }
                            </span>
                        </DropdownToggle>
                        <DropdownMenu right style={{right: 'auto'}}>
                            <DropdownItem header tag="div" className="text-center">
                                <strong>TÀI KHOẢN</strong>
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => {
                                    MyNavigator.navigateTo('/me')
                                }}
                            >
                                <i className="fa fa-user"/> Hồ sơ
                            </DropdownItem>
                            <DropdownItem>
                                <i className="fa fa-wrench"/> Cài đặt
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => {
                                    logout().then(res => {
                                        Auth.clear()
                                        MyNavigator.navigateTo('/login')
                                    }).catch(ex => {
                                        customErrorMsg({message: 'Có lỗi khi đăng xuất!'})
                                    })
                                }}
                            >
                                <i className="fa fa-lock"/> Đăng xuất
                            </DropdownItem>
                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
