import React, { Component } from "react";
import PropTypes from "prop-types";
import {APP_NAME} from 'constants'

const propTypes = {
    children: PropTypes.node
};
const defaultProps = {};

class DefaultFooter extends Component {
    render() {
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <span>
                    <a href="/">Trucky</a> &copy; {new Date().getFullYear()}{" "}
                    TheTruckApp
                </span>
                <span className="ml-auto">
                    By <a href="/">Khuong Dao</a>
                </span>
            </React.Fragment>
        );
    }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
