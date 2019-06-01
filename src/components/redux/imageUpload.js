import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ApiClient from '../../helpers/ApiClient';
import logo from '../..//assets/img/no-image.png';

let client = new ApiClient();
export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.input.value,
        };
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(e) {
        let { input } = this.props;
        const files = e.target.files;
        if (files) {
            var data = new FormData();
            data.append('file', files[0]);
            client
                .post(`/api/upload`, {
                    data: data,
                })
                .then(e => {
                    input.onChange(e.url);
                    this.setState({
                        url: e.url,
                    });
                });
        }
    }
    removeImage = () => {
        this.setState({
            url: '',
        });
        this.props.input.onChange('');
    };
    render() {
        let { width, title } = this.props;
        const imageUrl = this.state.url ? `/${this.state.url}` : logo;
        return (
            <div className={this.props.className} style={{ width: width || 100, position: 'relative' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: -15,
                        right: -10,
                    }}
                >
                    {this.state.url && <i onClick={this.removeImage} className="fa fa-remove" style={{ color: 'red', cursor: 'pointer' }} />}
                </div>
                <label>{title}</label>
                <img
                    width="100%"
                    style={{ cursor: 'pointer', border: '1px dashed #ccc' }}
                    onClick={e => {
                        this.file.click();
                    }}
                    src={imageUrl}
                />

                <input
                    ref={input => {
                        this.file = input;
                    }}
                    style={{ display: 'none' }}
                    type="file"
                    onChange={e => this.uploadFile(e)}
                />
            </div>
        );
    }
}
