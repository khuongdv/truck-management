import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class From extends Component {
    componentDidMount() {
        this.ref.addEventListener("submit",(e)=>{

            debugger
        })

    }

    render() {
        let { children, ...props } = this.props;
        return (
            <form {...props} ref={ref => (this.ref = ref)}>
                {this.props.children}
            </form>
        );
    }
}
