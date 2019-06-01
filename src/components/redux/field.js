import React from 'react';
import { Input } from 'reactstrap';
const errorStyle = {
    left: '10px',
    fontSize: '11px',
    color: 'red',
};
const CustomField = ({ children, defaultValue, className, input, type, meta: { touched, error, warning }, ...props }) => {
    switch (type) {
        case 'select':
            return (
                <div>
                    <Input type="select" {...input} className={className} {...props}>
                        {children}
                    </Input>
                    {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span style={errorStyle}>{warning}</span>))}
                </div>
            );
        case 'textarea':
            return (
                <div>
                    <Input {...input}  type={type} className={className} {...props} />
                    {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span style={errorStyle}>{warning}</span>))}
                </div>
            );
        default:
            return (
                <div>
                    <Input {...input} type={type} className={className} {...props} />
                    {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span style={errorStyle}>{warning}</span>))}
                </div>
            );
    }
};

export default CustomField;
