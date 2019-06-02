import React, { Component } from 'react';
import { Modal, ModalHeader } from 'reactstrap';

export default class MyModal extends Component {
    state = {
        isOpen: true,
    };
    static propTypes = {};
    toggle = () => {
        this.setState({
            isOpen: false,
        });
        window.setTimeout(() => {
            let { onClose } = this.props;
            if (onClose) {
                onClose();
            }
        }, 200);
    };
    render() {
        let { isOpen } = this.state;
        let { children, title, className } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={this.toggle} className={className}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                {children}
            </Modal>
        );
    }
}
