import React, { Component } from 'react';

export default class componentName extends Component {
    static propTypes = {};

    render() {
        return (
            <React.Fragment>
                <div className="preloader-mask">
                    <div className="preloader">
                        <div className="spin base_clr_brd">
                            <div className="clip left">
                                <div className="circle" style={{ color: '#38ba72' }} />
                            </div>
                            <div className="gap">
                                <div className="circle" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="preloader-mask-container"  />
            </React.Fragment>
        );
    }
}
