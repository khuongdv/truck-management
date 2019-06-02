import React, { Component } from 'react';
import Select, { Async } from 'react-select';
import { connect } from 'react-redux';
import debounce from 'es6-promise-debounce';
import ApiClient from '../../helpers/ApiClient';

const client = new ApiClient();
const errorStyle = {
    left: '10px',
    fontSize: '11px',
    color: 'red',
};

class AsyncSelectFiled extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
        let { objectId, getObjUrl, input } = this.props;

        if (objectId && getObjUrl) {
            let url = getObjUrl(objectId);
            client.get(url).then(e => {
                this.refs.thisRef.select.state.value = e;
                input.onBlur(e);
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        let { input } = nextProps;
        if (!input.value) {
            this.refs.thisRef.select.state.value = '';
        }
    }

    loadData(q) {
        let { url, mappingFunc, searchKey, topItem, noQuery, input, preSelect } = this.props;
        let __url = `${url}`;
        if (searchKey && q) {
            __url = url.indexOf('?') == -1 ? `${url}?${searchKey}=${q || ''}` : `${url}&${searchKey}=${q || ''}`;
        }
        return client.get(__url).then(response => {
            if (mappingFunc) {
                response = mappingFunc(response);
            }
            if (response.length > 0) {
                if (preSelect && !input.value) {
                    this.refs.thisRef.select.state.value = response[0];
                    input.onBlur(response[0]);
                }
            }
            if (topItem) {
                response = [topItem, ...response];
            }

            if (noQuery) {
                this.setState({
                    options: response,
                });
            } else {
                return response;
            }
        });
    }
    render() {
        let {
            url,
            children,
            defaultValue,
            input,
            isAsync,
            meta: { touched, error, warning },
            noQuery,
            ...props
        } = this.props;
        let { options } = this.state;
        return (
            <div>
                {noQuery && (
                    <Select
                        key={url}
                        {...input}
                        {...props}
                        onBlur={() => input.onBlur(input.value)}
                        options={options}
                        defaultOptions
                        classNamePrefix="core-select"
                        ref="thisRef"
                    />
                )}
                {!noQuery && (
                    <Async
                        key={url}
                        {...input}
                        {...props}
                        onBlur={() => input.onBlur(input.value)}
                        loadOptions={debounce(this.loadData, 500)}
                        defaultOptions
                        classNamePrefix="core-select"
                        ref="thisRef"
                    />
                )}
                {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span style={errorStyle}>{warning}</span>))}
            </div>
        );
    }
}

export default connect()(AsyncSelectFiled);
