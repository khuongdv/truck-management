import React from 'react';
import Select from 'react-select';

const errorStyle = {
    left: '10px',
    fontSize: '11px',
    color: 'red',
};

const SelectField = ({ children, defaultValue, input, isAsync, meta: { touched, error, warning }, ...props }) => {
    return (
        <div>
            <Select {...input} {...props} onBlur={() => input.onBlur(input.value)}/>
            {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span style={errorStyle}>{warning}</span>))}
        </div>
    );
};

export default SelectField;
