import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { Input } from 'reactstrap';
const errorStyle = {
    left: '10px',
    fontSize: '11px',
    color: 'red',
};
const STYLES = {
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
};
class ColorPicker extends Component {
    state = {
        displayColorPicker: false,
        color: this.props.input.value,
    };
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    };
    handleChange = color => {
        this.setState({ color: color.hex });
        this.props.input.onChange(color.hex);
    };
    handleClose = () => {
        this.setState({ displayColorPicker: false });
    };
    render() {
        let {
            input,
            className,
            meta: { touched, error, warning },
            ...props
        } = this.props;
        className = className || 'form-control';
        let { displayColorPicker, color } = this.state;
        return (
            <div>
                <Input {...input} {...props} className={className} onClick={this.handleClick} readOnly={true} style={{ backgroundColor: color }} />
                {displayColorPicker && (
                    <div style={STYLES.popover}>
                        <div style={STYLES.cover} onClick={this.handleClose} />
                        <SketchPicker color={color} onChange={this.handleChange} />
                    </div>
                )}
                {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span style={errorStyle}>{warning}</span>))}
            </div>
        );
    }
}

export default ColorPicker;
