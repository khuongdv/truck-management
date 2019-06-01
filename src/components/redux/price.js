import React, {Component} from 'react';
import NumberFormat from 'react-number-format';

const errorStyle = {
    left: '10px',
    fontSize: '11px',
    color: 'red',
};

class PriceField extends Component {
    state = {
        value: this.props.input.value,
    };
    onChange = v => {
      if (v.floatValue) {
        this.props.input.onChange(v.floatValue);
        this.setState({
            value: v.floatValue,
        });
        if (this.props.onValueChange) {
          this.props.onValueChange(v.floatValue);
        }
      } else {
        this.props.input.onChange('');
        this.setState({
            value: '',
        });
        if (this.props.onValueChange) {
          this.props.onValueChange('');
        }
      }

    };
    // onBlur = () => {
    //     this.props.input.onBlur(this.state.value);
    // };

    componentWillReceiveProps(nextProps) {
        if (nextProps.input.value !== this.state.value) {
            this.setState({
                value: nextProps.input.value
            })
        }
    }

    render() {
        let {
            children,
            defaultValue,
            input,
            isAsync,
            className,

            meta: {touched, error, warning},
            ...props
        } = this.props;
        className = className || 'form-control';
        return (
            <div>
                <NumberFormat
                    {...input}
                    {...props}
                    onBlur={this.onBlur}
                    className={className}
                    value={this.state.value}
                    onChange={this.onBlur}
                    onValueChange={this.onChange}
                    decimalSeparator={'.'}
                    thousandSeparator={','}
                />
                {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning &&
                    <span style={errorStyle}>{warning}</span>))}
            </div>
        );
    }
}

export default PriceField;
