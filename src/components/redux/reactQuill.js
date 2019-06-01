import React from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

export default function renderQuill({ input }) {
  return (
    <ReactQuill
      {...input}
      onChange={(newValue, delta, source) => {
        if (source === 'user') {
          input.onChange(newValue);
        }
      }}
      onBlur={(range, source, quill) => {
        input.onBlur(quill.getHTML());
      }}
    />
  );
}
