import React from 'react'

const FilePicker = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
    <input type='file' {...inputProps} {...props} />
);

export default FilePicker
