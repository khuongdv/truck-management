import React, { Component } from 'react';
import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
const DEFAULT_OPTIONS = {
    dateFormat: 'Y-m-d',
    locale: Vietnamese,
    altFormat: 'd/m/Y',
    altInput: true,
    allowInput: true,
};
const errorStyle = {
    left: '10px',
    fontSize: '11px',
    color: 'red',
};
const jsRegex = /([0]?[1-9]|[1][0-2])[/]([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0-9]{4})$/;
const jsRegexTime = /([0]?[1-9]|[1][0-2])[/]([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0-9]{4})[\s]([0-9]{2})[:]([0-9]{2})[:]([0-9]{2})$/;
class DatePicker extends Component {
    onChange = date => {
        let { input, customFormatStr } = this.props;
        let d = date[0];
        let dateFormated = d ? dayjs(d).format(customFormatStr ? customFormatStr : 'YYYY-MM-DD') : '';
        input.onChange(dateFormated);
    };
    clear = () => {
        let { input } = this.props;
        input.onChange('');
    };
    onClose = (e, dateStr, instance) => {
        let { options, includeTime } = this.props;
        options = { ...DEFAULT_OPTIONS, ...options };
        if (!options.altInput) {
            return;
        }
        const __regex = includeTime ? jsRegexTime : jsRegex;
        let altValue = instance.altInput ? instance.altInput.value : null;
        if (altValue) {
            if (__regex.test(altValue)) {
                if (!includeTime) {
                    let __date = altValue
                        .split('/')
                        .reverse()
                        .join('-');
                    if (dayjs(__date).isValid()) {
                        this.props.input.onChange(dayjs(__date).format('YYYY-MM-DD'));
                        return;
                    }
                } else {
                    let __date = altValue
                        .split(' ')[0]
                        .split('/')
                        .reverse()
                        .join('-');
                    if (dayjs(__date).isValid()) {
                        this.props.input.onChange(dayjs(__date + ' ' + altValue.split(' ')[1]).format('YYYY-MM-DDTHH:mm:ss'));
                        return;
                    }
                }
            }
            this.props.input.onChange('');
        }
    };
    render() {
        let {
            clearBtnCss,

            input,
            dispatch,
            className,
            wrapperStyle,
            meta: { touched, error, warning },
            options,
            customFormatStr,
            includeTime,
            ...props
        } = this.props;
        className = className || 'form-control';
        clearBtnCss = clearBtnCss || { position: 'absolute', top: 0, right: 0 };
        options = {
            ...DEFAULT_OPTIONS,
            ...options,
        };
        if (includeTime) {
            options = {
                ...options,
                enableTime: true,
                dateFormat: 'Y-m-d H:i:ss',
                altFormat: 'd/m/Y H:i:ss',
            };
        }
        return (
            <div style={wrapperStyle ? wrapperStyle : { position: 'relative' }}>
                <Flatpickr
                    options={options}
                    className={className}
                    {...input}
                    {...props}
                    autoComplete="off"
                    onClose={this.onClose}
                    onChange={date => this.onChange(date)}
                />
                {!this.props.disabled && (
                    <button
                        title={'Xóa giá trị'}
                        className="btn"
                        type="button"
                        data-clear
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            padding: 0,
                            width: 35,
                            height: 32,
                            color: '#f86c6b',
                            background: 'transparent',
                        }}
                        onClick={this.clear}
                    >
                        <i className="fa fa-remove" />
                    </button>
                )}
                {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span style={errorStyle}>{warning}</span>))}
            </div>
        );
    }
}

export default connect()(DatePicker);
